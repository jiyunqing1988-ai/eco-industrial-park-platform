import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  Check,
  ClipboardList,
  Download,
  FileInput,
  Gauge,
  GitCompare,
  LayoutDashboard,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import {
  CATEGORY_ORDER,
  DEFAULT_ATTRIBUTES,
  DEFAULT_INPUTS,
  FIELD_GROUPS,
  REQUIREMENTS,
  evaluateAssessment,
  exportPayload,
  makeSnapshot,
} from "./platform.js";
import "./styles.css";

const formatNumber = (value, digits = 2) => {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) return "0.00";
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function App() {
  const [activeTab, setActiveTab] = useState("input");
  const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES);
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [planName, setPlanName] = useState("示例园区 2026");
  const [savedPlans, setSavedPlans] = useState([]);
  const [selectedPlanIds, setSelectedPlanIds] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const plansReady = useRef(null);
  const [toast, setToast] = useState("");
  const importRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    plansReady.current = fetch("/api/plans", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error("读取方案库失败");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setSavedPlans(Array.isArray(data.plans) ? data.plans : []);
      })
      .catch((error) => showToast(error.message))
      .finally(() => {
        if (!cancelled) setPlansLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const assessment = useMemo(() => evaluateAssessment(inputs, attributes), [inputs, attributes]);
  const comparedPlans = useMemo(
    () => selectedPlanIds.map((id) => savedPlans.find((plan) => plan.id === id)).filter(Boolean),
    [savedPlans, selectedPlanIds],
  );

  const updateInput = (key, value) => setInputs((prev) => ({ ...prev, [key]: value }));
  const updateAttr = (key, value) => setAttributes((prev) => ({ ...prev, [key]: value }));

  const showToast = (message) => setToast(message);

  const saveCurrentPlan = async () => {
    await plansReady.current;
    const name = planName.trim() || `园区方案 ${savedPlans.length + 1}`;
    const snapshot = makeSnapshot({
      id: uid(),
      name,
      attributes,
      inputs,
      assessment,
    });
    try {
      const response = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ plan: snapshot }),
      });
      if (!response.ok) throw new Error("保存失败，请稍后再试");
      const data = await response.json();
      setSavedPlans(Array.isArray(data.plans) ? data.plans : [data.plan, ...savedPlans]);
      setSelectedPlanIds((prev) => [data.plan.id, ...prev].slice(0, 4));
      showToast("方案已保存到服务器");
    } catch (error) {
      showToast(error.message);
    }
  };

  const loadPlan = (plan) => {
    setPlanName(plan.name);
    setAttributes({ ...DEFAULT_ATTRIBUTES, ...plan.attributes });
    setInputs({ ...DEFAULT_INPUTS, ...plan.inputs });
    setActiveTab("input");
    showToast("方案已载入");
  };

  const deletePlan = async (id) => {
    try {
      const response = await fetch(`/api/plans/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("删除失败，请稍后再试");
      const data = await response.json();
      setSavedPlans(Array.isArray(data.plans) ? data.plans : savedPlans.filter((plan) => plan.id !== id));
      setSelectedPlanIds((prev) => prev.filter((planId) => planId !== id));
      showToast("方案已删除");
    } catch (error) {
      showToast(error.message);
    }
  };

  const toggleCompare = (id) => {
    setSelectedPlanIds((prev) => {
      if (prev.includes(id)) return prev.filter((planId) => planId !== id);
      return [id, ...prev].slice(0, 4);
    });
  };

  const downloadJson = (payload, filename) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const now = new Date();
    const timestamp = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()]
      .map((value) => String(value).padStart(2, "0")).join("");
    a.download = `${timestamp}\u2014${filename}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCurrent = () => {
    downloadJson(
      exportPayload({
        name: planName.trim() || "未命名方案",
        attributes,
        inputs,
        assessment,
      }),
      `${planName.trim() || "生态工业园区评价方案"}.json`,
    );
  };

  const exportAll = () => {
    downloadJson({ exportedAt: new Date().toISOString(), plans: savedPlans }, "生态工业园区方案库.json");
  };

  const importPlans = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming = Array.isArray(parsed.plans) ? parsed.plans : [parsed];
      const normalized = incoming
        .filter((item) => item && item.inputs)
        .map((item) =>
          makeSnapshot({
            id: uid(),
            name: item.name || "导入方案",
            attributes: { ...DEFAULT_ATTRIBUTES, ...item.attributes },
            inputs: { ...DEFAULT_INPUTS, ...item.inputs },
            assessment: evaluateAssessment({ ...DEFAULT_INPUTS, ...item.inputs }, { ...DEFAULT_ATTRIBUTES, ...item.attributes }),
          }),
        );
      await plansReady.current;
      const uploaded = [];
      for (const plan of normalized) {
        const response = await fetch("/api/plans", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ plan }),
        });
        if (response.ok) uploaded.push(plan);
      }
      const latest = await fetch("/api/plans").then((response) => response.json());
      setSavedPlans(Array.isArray(latest.plans) ? latest.plans : [...uploaded, ...savedPlans]);
      showToast(`已导入 ${uploaded.length} 个方案`);
    } catch {
      showToast("导入失败，请检查 JSON 文件");
    }
  };

  const resetCurrent = () => {
    setPlanName("示例园区 2026");
    setAttributes(DEFAULT_ATTRIBUTES);
    setInputs(DEFAULT_INPUTS);
    showToast("已恢复示例数据");
  };

  return (
    <div className="app-shell">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <SummaryBar assessment={assessment} savedCount={savedPlans.length} plansLoading={plansLoading} />

      <main className="workspace">
        {activeTab === "input" && (
          <InputView
            planName={planName}
            setPlanName={setPlanName}
            attributes={attributes}
            updateAttr={updateAttr}
            inputs={inputs}
            updateInput={updateInput}
            saveCurrentPlan={saveCurrentPlan}
            exportCurrent={exportCurrent}
            resetCurrent={resetCurrent}
          />
        )}
        {activeTab === "dashboard" && <DashboardView assessment={assessment} />}
        {activeTab === "diagnosis" && <DiagnosisView assessment={assessment} />}
        {activeTab === "plans" && (
          <PlansView
            savedPlans={savedPlans}
            selectedPlanIds={selectedPlanIds}
            comparedPlans={comparedPlans}
            loadPlan={loadPlan}
            deletePlan={deletePlan}
            toggleCompare={toggleCompare}
            exportAll={exportAll}
            importRef={importRef}
            importPlans={importPlans}
          />
        )}
      </main>

      <input ref={importRef} className="hidden-file" type="file" accept="application/json,.json" onChange={importPlans} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "input", label: "录入", icon: ClipboardList },
    { id: "dashboard", label: "看板", icon: LayoutDashboard },
    { id: "diagnosis", label: "诊断", icon: Gauge },
    { id: "plans", label: "保存对比", icon: GitCompare },
  ];

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <BarChart3 size={22} />
        </div>
        <div>
          <h1>生态工业园区评价与诊断平台</h1>
          <p>Eco-Industrial Park Assessment</p>
        </div>
      </div>
      <nav className="tabs" aria-label="主导航">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} className={activeTab === tab.id ? "tab active" : "tab"} onClick={() => setActiveTab(tab.id)}>
              <Icon size={17} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

function SummaryBar({ assessment, savedCount, plansLoading }) {
  const rate = assessment.total ? Math.round((assessment.passCount / assessment.total) * 100) : 0;

  return (
    <section className="summary-band">
      <Metric label="总体达标" value={`${assessment.passCount}/${assessment.total}`} />
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${rate}%` }} />
        </div>
        <span>{rate}%</span>
      </div>
      <Metric label="必选未达标" value={assessment.mandatoryFail} tone={assessment.mandatoryFail ? "danger" : "good"} />
      <Metric label="基本要求" value={`${assessment.requirementPass}/13`} />
      <Metric label="已保存方案" value={plansLoading ? "读取中" : savedCount} />
    </section>
  );
}

function Metric({ label, value, tone = "neutral" }) {
  return (
    <div className={`metric ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InputView({
  planName,
  setPlanName,
  attributes,
  updateAttr,
  inputs,
  updateInput,
  saveCurrentPlan,
  exportCurrent,
  resetCurrent,
}) {
  return (
    <div className="input-grid">
      <aside className="side-panel">
        <section className="panel">
          <div className="panel-title">
            <Settings size={17} />
            <h2>方案属性</h2>
          </div>
          <label className="field-label">
            方案名称
            <input value={planName} onChange={(event) => setPlanName(event.target.value)} />
          </label>
          <Segment
            label="地理区位"
            value={attributes.region}
            options={[
              ["other", "其他地区"],
              ["west_northeast", "西部/东北"],
            ]}
            onChange={(value) => updateAttr("region", value)}
          />
          <Segment
            label="气候带"
            value={attributes.climate}
            options={[
              ["humid", "湿润"],
              ["semi_humid", "半湿润"],
              ["dry", "干旱/半干旱"],
            ]}
            onChange={(value) => updateAttr("climate", value)}
          />
          <Segment
            label="水资源属性"
            value={attributes.waterStatus}
            options={[
              ["other", "其他"],
              ["water_scarce", "缺水市"],
              ["yellow_river", "黄河流域"],
              ["jjj", "京津冀"],
            ]}
            onChange={(value) => updateAttr("waterStatus", value)}
          />
          <CheckRow label="高耗能行业" checked={attributes.isHighEnergy} onChange={(value) => updateAttr("isHighEnergy", value)} />
          <CheckRow label="高耗水行业" checked={attributes.isHighWater} onChange={(value) => updateAttr("isHighWater", value)} />
          <div className="button-row">
            <button className="primary-button" onClick={saveCurrentPlan}>
              <Save size={16} />
              保存
            </button>
            <button className="ghost-button" onClick={exportCurrent} title="导出当前方案 JSON">
              <Download size={16} />
            </button>
            <button className="ghost-button" onClick={resetCurrent} title="恢复示例数据">
              <RotateCcw size={16} />
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">
            <Search size={17} />
            <h2>基本要求</h2>
          </div>
          <div className="requirement-list">
            {REQUIREMENTS.map((item) => (
              <CheckRow
                key={item.key}
                label={`${item.no}. ${item.label}`}
                checked={Boolean(inputs[item.key])}
                onChange={(value) => updateInput(item.key, value)}
                compact
              />
            ))}
          </div>
        </section>
      </aside>

      <section className="data-panel">
        {FIELD_GROUPS.map((group) => (
          <section className="form-section" key={group.title}>
            <div className="section-heading">
              <h2>{group.title}</h2>
              <span>{group.fields.length} 项</span>
            </div>
            <div className="field-grid">
              {group.fields.map((field) =>
                field.type === "boolean" ? (
                  <CheckRow key={field.key} label={field.label} checked={Boolean(inputs[field.key])} onChange={(value) => updateInput(field.key, value)} />
                ) : (
                  <NumberField key={field.key} label={field.label} value={inputs[field.key]} onChange={(value) => updateInput(field.key, value)} />
                ),
              )}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

function Segment({ label, value, options, onChange }) {
  return (
    <div className="segment-block">
      <span>{label}</span>
      <div className="segment">
        {options.map(([id, text]) => (
          <button key={id} className={value === id ? "selected" : ""} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="field-label">
      {label}
      <input
        type="number"
        value={value ?? 0}
        onChange={(event) => onChange(Number.parseFloat(event.target.value) || 0)}
        inputMode="decimal"
      />
    </label>
  );
}

function CheckRow({ label, checked, onChange, compact = false }) {
  return (
    <label className={compact ? "check-row compact" : "check-row"}>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function DashboardView({ assessment }) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: assessment.results.filter((item) => item.category === category && item.attr !== "细分项"),
  }));

  return (
    <div className="dashboard-grid">
      <section className="overview-panel">
        {grouped.map((group) => {
          const pass = group.items.filter((item) => item.status === "pass").length;
          const total = group.items.length;
          return <CategoryCard key={group.category} category={group.category} pass={pass} total={total} />;
        })}
      </section>

      <section className="table-panel">
        <div className="section-heading">
          <h2>指标结果</h2>
          <span>{assessment.total} 项</span>
        </div>
        <div className="result-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>指标</th>
                <th>属性</th>
                <th>实际值</th>
                <th>目标</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {assessment.results
                .filter((item) => item.attr !== "细分项")
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.attr}</td>
                    <td>{formatNumber(item.actualNum)} {item.unit !== "布尔" ? item.unit : ""}</td>
                    <td>{item.targetDisplay}</td>
                    <td>
                      <StatusPill status={item.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ category, pass, total }) {
  const rate = total ? Math.round((pass / total) * 100) : 0;
  return (
    <article className="category-card">
      <span>{category}</span>
      <strong>{pass}/{total}</strong>
      <div className="mini-track">
        <div style={{ width: `${rate}%` }} />
      </div>
    </article>
  );
}

function StatusPill({ status }) {
  return (
    <span className={status === "pass" ? "status pass" : "status fail"}>
      {status === "pass" ? <Check size={14} /> : <Plus size={14} />}
      {status === "pass" ? "达标" : "未达标"}
    </span>
  );
}

function DiagnosisView({ assessment }) {
  const failed = assessment.results.filter((item) => item.status === "fail" && item.attr !== "细分项");
  const recommendedFeatures = assessment.results
    .filter((item) => item.attr === "特色")
    .sort((a, b) => a.gapRatio - b.gapRatio)
    .slice(0, 4);

  return (
    <div className="diagnosis-grid">
      <section className="table-panel">
        <div className="section-heading">
          <h2>未达标诊断</h2>
          <span>{failed.length} 项</span>
        </div>
        <div className="diagnosis-list">
          {failed.map((item) => (
            <DiagnosisCard key={item.id} item={item} />
          ))}
          {!failed.length && <EmptyState title="全部达标" text="当前方案没有未达标指标。" />}
        </div>
      </section>
      <section className="side-panel wide">
        <section className="panel">
          <div className="panel-title">
            <Gauge size={17} />
            <h2>特色优选</h2>
          </div>
          <div className="feature-list">
            {recommendedFeatures.map((item, index) => (
              <div className="feature-item" key={item.id}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{formatNumber(item.actualNum)} {item.unit !== "布尔" ? item.unit : ""} / {item.targetDisplay}</p>
                </div>
                <StatusPill status={item.status} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

function DiagnosisCard({ item }) {
  return (
    <article className="diagnosis-card">
      <div className="diagnosis-head">
        <div>
          <span>{item.id} · {item.category}</span>
          <h3>{item.name}</h3>
        </div>
        <StatusPill status={item.status} />
      </div>
      <div className="diagnosis-metrics">
        <Metric label="实际值" value={`${formatNumber(item.actualNum)} ${item.unit !== "布尔" ? item.unit : ""}`} />
        <Metric label="目标" value={item.targetDisplay} />
        <Metric label="差距" value={item.gapText} />
      </div>
      <div className="task-columns">
        <div>
          <h4>攻坚任务</h4>
          {item.tasks.map((task) => <p key={task}>{task}</p>)}
        </div>
        <div>
          <h4>规划工程</h4>
          {item.projects.map((project) => <p key={project}>{project}</p>)}
        </div>
      </div>
    </article>
  );
}

function PlansView({
  savedPlans,
  selectedPlanIds,
  comparedPlans,
  loadPlan,
  deletePlan,
  toggleCompare,
  exportAll,
  importRef,
}) {
  return (
    <div className="plans-grid">
      <section className="table-panel">
        <div className="section-heading">
          <h2>方案库</h2>
          <div className="toolbar">
            <button className="ghost-button" onClick={() => importRef.current?.click()} title="导入方案库">
              <Upload size={16} />
            </button>
            <button className="ghost-button" onClick={exportAll} title="导出全部方案">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="plan-list">
          {savedPlans.map((plan) => (
            <article className="plan-row" key={plan.id}>
              <label className="compare-check">
                <input type="checkbox" checked={selectedPlanIds.includes(plan.id)} onChange={() => toggleCompare(plan.id)} />
              </label>
              <div className="plan-main">
                <h3>{plan.name}</h3>
                <p>{new Date(plan.updatedAt).toLocaleString("zh-CN")}</p>
              </div>
              <Metric label="达标" value={`${plan.summary.passCount}/${plan.summary.total}`} />
              <Metric label="必选未达标" value={plan.summary.mandatoryFail} tone={plan.summary.mandatoryFail ? "danger" : "good"} />
              <div className="row-actions">
                <button className="ghost-button" onClick={() => loadPlan(plan)} title="载入">
                  <FileInput size={16} />
                </button>
                <button className="ghost-button danger" onClick={() => deletePlan(plan.id)} title="删除">
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
          {!savedPlans.length && <EmptyState title="暂无保存方案" text="在录入页保存当前方案后，可在这里进行对比。" />}
        </div>
      </section>

      <section className="table-panel">
        <div className="section-heading">
          <h2>方案对比</h2>
          <span>{comparedPlans.length}/4</span>
        </div>
        {comparedPlans.length ? <CompareTable plans={comparedPlans} /> : <EmptyState title="请选择方案" text="勾选左侧方案后显示横向对比。" />}
      </section>
    </div>
  );
}

function CompareTable({ plans }) {
  const keyIndicators = ["1-2", "3", "8", "9-2", "12-1", "13", "17", "21", "28", "31"];

  return (
    <div className="compare-table">
      <table>
        <thead>
          <tr>
            <th>对比项</th>
            {plans.map((plan) => <th key={plan.id}>{plan.name}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>总体达标</td>
            {plans.map((plan) => <td key={plan.id}>{plan.summary.passCount}/{plan.summary.total}</td>)}
          </tr>
          <tr>
            <td>必选未达标</td>
            {plans.map((plan) => <td key={plan.id}>{plan.summary.mandatoryFail}</td>)}
          </tr>
          <tr>
            <td>基本要求</td>
            {plans.map((plan) => <td key={plan.id}>{plan.summary.requirementPass}/13</td>)}
          </tr>
          {keyIndicators.map((id) => {
            const label = plans[0]?.results.find((item) => item.id === id)?.name || id;
            return (
              <tr key={id}>
                <td>{id} · {label}</td>
                {plans.map((plan) => {
                  const item = plan.results.find((result) => result.id === id);
                  return (
                    <td key={plan.id}>
                      <span className={item?.status === "pass" ? "compare-value pass" : "compare-value fail"}>
                        {formatNumber(item?.actualNum || 0)} {item?.unit !== "布尔" ? item?.unit : ""}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

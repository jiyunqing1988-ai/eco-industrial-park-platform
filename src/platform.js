export const STORAGE_KEY = "eco-industrial-park-plans-v1";

export const CATEGORY_ORDER = ["减污降碳", "发展质效", "创新驱动", "生态引领"];

export const DEFAULT_ATTRIBUTES = {
  region: "other",
  climate: "humid",
  waterStatus: "other",
  isHighEnergy: false,
  isHighWater: false,
};

export const DEFAULT_INPUTS = {
  gva_t: 50000,
  gva_t_3: 38000,
  ind_output_t: 200000,
  revenue_t: 120000,
  employees_t: 1200,
  land_area_km2: 4.5,
  co2_t: 18000,
  co2_t_1: 17800,
  co2_t_2: 17500,
  co2_t_3: 17200,
  energy_t: 10000,
  energy_t_3: 9200,
  fresh_water_t: 200000,
  fresh_water_t_3: 185000,
  non_fossil_ratio_t: 28,
  non_fossil_ratio_t_3: 22,
  wastewater_t: 180000,
  cod_t: 50,
  cod_t_3: 44,
  nh3_t: 5,
  nh3_t_3: 4.4,
  so2_t: 30,
  so2_t_3: 27,
  nox_t: 40,
  nox_t_3: 36,
  solid_waste_gen_t: 4000,
  solid_waste_util_t: 3600,
  solid_waste_stock_t: 200,
  reclaimed_water_t: 50000,
  recycled_water_t: 160000,
  total_ind_water_t: 200000,
  rd_ratio_t: 2.6,
  rd_ratio_t_3: 2.3,
  hi_tech_out: 65000,
  strategic_out: 80000,
  green_out: 60000,
  digital_out: 40000,
  new_ind_total_m2: 50000,
  new_ind_green_m2: 18000,
  new_pub_total_m2: 20000,
  new_pub_green_m2: 13000,
  green_area_km2: 1.5,
  park_total_km2: 10,
  eco_chain_projs: 8,
  no_env_event: true,
  carbon_peak_plan: true,
  smart_platform: true,
  green_power_kwh_t: 3500,
  total_power_kwh_t: 10000,
  ccus_count: 0,
  res_recycled_collected_t: 1000,
  res_recycled_utilized_t: 950,
  waste_heat_total_t: 1000,
  waste_heat_recovered_t: 600,
  clean_audit_voluntary: 12,
  clean_audit_permits: 100,
  clean_audit_compulsory: 20,
  digital_tool_ent_count: 110,
  scale_ent_count: 120,
  cnc_rate_avg: 76.5,
  giant_count: 8,
  patents_t: 60,
  smart_factory_count: 1,
  public_park_green_m2: 120000,
  population: 8000,
  satisfaction_rate: 92,
  req_1: true,
  req_2: true,
  req_3: true,
  req_4: true,
  req_5: true,
  req_6: true,
  req_7: true,
  req_8: true,
  req_9: true,
  req_10: true,
  req_11: true,
  req_12: true,
  req_13: true,
};

export const REQUIREMENTS = [
  { key: "req_1", no: 1, label: "严格遵循生态环境法律标准" },
  { key: "req_2", no: 2, label: "污染物排放稳定符合许可证要求" },
  { key: "req_3", no: 3, label: "重点企业依法完成清洁生产审核" },
  { key: "req_4", no: 4, label: "纳入名单企业合规披露环境信息" },
  { key: "req_5", no: 5, label: "新改扩重点企业达绩效 A 级/引领性" },
  { key: "req_6", no: 6, label: "明确 2030 碳达峰方案及核算机制" },
  { key: "req_7", no: 7, label: "环境空气、水、土、声等状况达标" },
  { key: "req_8", no: 8, label: "落实分区管控及有效规环评" },
  { key: "req_9", no: 9, label: "完善风险防控体系及定期演练" },
  { key: "req_10", no: 10, label: "近三年内无重大突发环境事件" },
  { key: "req_11", no: 11, label: "有序推进环境健康体检管理" },
  { key: "req_12", no: 12, label: "固废含危废妥善处置利用贮存" },
  { key: "req_13", no: 13, label: "废水在线监测及化工三级防控" },
];

export const FIELD_GROUPS = [
  {
    title: "经济产出与规模",
    fields: [
      { key: "gva_t", label: "工业增加值 t [万元]" },
      { key: "gva_t_3", label: "工业增加值 t-3 [万元]" },
      { key: "ind_output_t", label: "园区工业总产值 [万元]" },
      { key: "revenue_t", label: "企业营业收入 [万元]" },
      { key: "employees_t", label: "年末从业人数 [人]" },
      { key: "land_area_km2", label: "工业用地面积 [km2]" },
    ],
  },
  {
    title: "碳排放与能源水耗",
    fields: [
      { key: "co2_t", label: "CO2 排放 t [吨]" },
      { key: "co2_t_1", label: "CO2 排放 t-1 [吨]" },
      { key: "co2_t_2", label: "CO2 排放 t-2 [吨]" },
      { key: "co2_t_3", label: "CO2 排放 t-3 [吨]" },
      { key: "energy_t", label: "综合能耗 t [tce]" },
      { key: "energy_t_3", label: "综合能耗 t-3 [tce]" },
      { key: "fresh_water_t", label: "新鲜水取水量 t [吨]" },
      { key: "fresh_water_t_3", label: "新鲜水取水量 t-3 [吨]" },
      { key: "non_fossil_ratio_t", label: "非化石能源比例 t [%]" },
      { key: "non_fossil_ratio_t_3", label: "非化石能源比例 t-3 [%]" },
      { key: "green_power_kwh_t", label: "绿色电力消费 [kWh]" },
      { key: "total_power_kwh_t", label: "电力消费总量 [kWh]" },
      { key: "ccus_count", label: "稳定运行 CCUS [个]" },
    ],
  },
  {
    title: "污染物与资源循环",
    fields: [
      { key: "wastewater_t", label: "工业废水排放量 [吨]" },
      { key: "cod_t", label: "COD t [吨]" },
      { key: "cod_t_3", label: "COD t-3 [吨]" },
      { key: "nh3_t", label: "氨氮 t [吨]" },
      { key: "nh3_t_3", label: "氨氮 t-3 [吨]" },
      { key: "so2_t", label: "SO2 t [吨]" },
      { key: "so2_t_3", label: "SO2 t-3 [吨]" },
      { key: "nox_t", label: "NOx t [吨]" },
      { key: "nox_t_3", label: "NOx t-3 [吨]" },
      { key: "solid_waste_gen_t", label: "固废产生量 [吨]" },
      { key: "solid_waste_util_t", label: "固废利用量 [吨]" },
      { key: "solid_waste_stock_t", label: "往年贮存利用量 [吨]" },
      { key: "reclaimed_water_t", label: "再生水回用量 [吨]" },
      { key: "recycled_water_t", label: "工业重复用水量 [吨]" },
      { key: "total_ind_water_t", label: "工业总用水量 [吨]" },
      { key: "res_recycled_collected_t", label: "再生资源收集量 [吨]" },
      { key: "res_recycled_utilized_t", label: "再生资源利用量 [吨]" },
      { key: "waste_heat_total_t", label: "余热资源总量 [吨]" },
      { key: "waste_heat_recovered_t", label: "余热实际回收量 [吨]" },
    ],
  },
  {
    title: "创新产业与生态引领",
    fields: [
      { key: "rd_ratio_t", label: "R&D 经费占营收比例 t [%]" },
      { key: "rd_ratio_t_3", label: "R&D 经费占营收比例 t-3 [%]" },
      { key: "hi_tech_out", label: "高新产业产值 [万元]" },
      { key: "strategic_out", label: "战新产业产值 [万元]" },
      { key: "green_out", label: "节能环保产值 [万元]" },
      { key: "digital_out", label: "数字经济产值 [万元]" },
      { key: "clean_audit_voluntary", label: "自愿清洁生产企业 [个]" },
      { key: "clean_audit_permits", label: "纳入排污许可企业 [家]" },
      { key: "clean_audit_compulsory", label: "强制清洁生产企业 [个]" },
      { key: "digital_tool_ent_count", label: "应用数控工具企业 [家]" },
      { key: "scale_ent_count", label: "规上企业总数 [家]" },
      { key: "cnc_rate_avg", label: "关键工序数控化率 [%]" },
      { key: "giant_count", label: "小巨人企业数量 [家]" },
      { key: "patents_t", label: "专利授权 t [件]" },
      { key: "smart_factory_count", label: "卓越级智能工厂 [家]" },
      { key: "new_ind_total_m2", label: "新建工业总面积 [m2]" },
      { key: "new_ind_green_m2", label: "新建工业绿建 [m2]" },
      { key: "new_pub_total_m2", label: "新建公共总面积 [m2]" },
      { key: "new_pub_green_m2", label: "新建公共绿建 [m2]" },
      { key: "green_area_km2", label: "绿地总面积 [km2]" },
      { key: "park_total_km2", label: "园区总面积 [km2]" },
      { key: "public_park_green_m2", label: "公园绿地面积 [m2]" },
      { key: "population", label: "园区常住人口 [人]" },
      { key: "eco_chain_projs", label: "生态链构建项目 [个]" },
      { key: "satisfaction_rate", label: "公众满意度 [%]" },
      { key: "smart_platform", label: "智慧平台稳定运行", type: "boolean" },
      { key: "no_env_event", label: "无重大突发环境事件", type: "boolean" },
      { key: "carbon_peak_plan", label: "碳达峰方案编制完成", type: "boolean" },
    ],
  },
];

const INDICATORS = [
  { id: "1-1", category: "减污降碳", name: "二氧化碳排放量下降率", attr: "必选(1)", unit: "%", targetBase: "连续三年 >= 0", group: "carbon_group" },
  { id: "1-2", category: "减污降碳", name: "单位增加值 CO2 排放量", attr: "必选(1)", unit: "t/万元", targetBase: "动态调整", group: "carbon_group" },
  { id: "2", category: "减污降碳", name: "二氧化碳排放弹性系数", attr: "必选", unit: "/", targetBase: "动态调整" },
  { id: "3", category: "减污降碳", name: "非化石能源消费比例", attr: "特色", unit: "%", targetBase: ">= 30 或持续提高" },
  { id: "4", category: "减污降碳", name: "电力消费中绿色电力比例", attr: "特色", unit: "%", targetBase: ">= 30" },
  { id: "5", category: "减污降碳", name: "CCUS 设施", attr: "特色", unit: "个", targetBase: ">= 1" },
  { id: "6", category: "减污降碳", name: "主要污染物排放弹性系数", attr: "必选", unit: "/", targetBase: "动态调整" },
  { id: "7-1", category: "减污降碳", name: "单位增加值废水排放量", attr: "必选(1)", unit: "t/万元", targetBase: "动态调整", group: "waste_group" },
  { id: "7-2", category: "减污降碳", name: "单位增加值固废产生量", attr: "必选(1)", unit: "t/万元", targetBase: "<= 0.1", group: "waste_group" },
  { id: "8", category: "减污降碳", name: "一般工废综合利用率", attr: "必选", unit: "%", targetBase: ">= 80" },
  { id: "9-1", category: "减污降碳", name: "再生水回用率", attr: "必选(1)", unit: "%", targetBase: "动态调整", group: "water_group" },
  { id: "9-2", category: "减污降碳", name: "工业用水重复利用率", attr: "必选(1)", unit: "%", targetBase: ">= 80", group: "water_group" },
  { id: "10", category: "减污降碳", name: "再生资源循环利用率", attr: "特色", unit: "%", targetBase: ">= 90" },
  { id: "11", category: "减污降碳", name: "余热资源回收利用率", attr: "特色", unit: "%", targetBase: ">= 60" },
  { id: "12-1", category: "发展质效", name: "工业增加值年均增长率", attr: "必选(1)", unit: "%", targetBase: ">= 15", group: "econ_group" },
  { id: "12-2", category: "发展质效", name: "人均工业增加值", attr: "必选(1)", unit: "万元/人", targetBase: "动态调整", group: "econ_group" },
  { id: "13", category: "发展质效", name: "能源产出率", attr: "必选", unit: "万/t 标煤", targetBase: "动态调整" },
  { id: "14", category: "发展质效", name: "综合能耗弹性系数", attr: "必选", unit: "/", targetBase: "动态调整" },
  { id: "15", category: "发展质效", name: "水资源产出率", attr: "必选", unit: "万元/m3", targetBase: ">= 0.2" },
  { id: "16", category: "发展质效", name: "新鲜水耗弹性系数", attr: "必选", unit: "/", targetBase: "动态调整" },
  { id: "17", category: "发展质效", name: "土地产出率", attr: "必选", unit: "亿元/km2", targetBase: "动态调整" },
  { id: "18", category: "发展质效", name: "生态工业链构建项目数", attr: "必选", unit: "个", targetBase: ">= 8" },
  { id: "19", category: "发展质效", name: "自愿清洁生产审核占比", attr: "特色", unit: "%", targetBase: ">= 10" },
  { id: "20-1", category: "创新驱动", name: "高新技术企业产值占比", attr: "必选(1)", unit: "%", targetBase: "动态调整", group: "industry_group" },
  { id: "20-2", category: "创新驱动", name: "战新产业产值占比", attr: "必选(1)", unit: "%", targetBase: "动态调整", group: "industry_group" },
  { id: "20-3", category: "创新驱动", name: "节能环保产业产值占比", attr: "必选(1)", unit: "%", targetBase: "动态调整", group: "industry_group" },
  { id: "20-4", category: "创新驱动", name: "数字经济核心产业占比", attr: "必选(1)", unit: "%", targetBase: "动态调整", group: "industry_group" },
  { id: "21", category: "创新驱动", name: "企业 R&D 经费支出占比", attr: "必选", unit: "%", targetBase: ">= 2.5 且增长" },
  { id: "22", category: "创新驱动", name: "数字化研发工具普及率", attr: "特色", unit: "%", targetBase: "> 90" },
  { id: "23", category: "创新驱动", name: "关键工序数控化率", attr: "特色", unit: "%", targetBase: "> 75" },
  { id: "24", category: "创新驱动", name: "专精特新小巨人数", attr: "特色", unit: "家", targetBase: ">= 10" },
  { id: "25", category: "创新驱动", name: "单位增加值发明专利授权", attr: "特色", unit: "个/亿元", targetBase: ">= 1.1" },
  { id: "26", category: "创新驱动", name: "园区智慧管理平台", attr: "必选", unit: "布尔", targetBase: "完善" },
  { id: "27", category: "创新驱动", name: "卓越级智能工厂数量", attr: "特色", unit: "家", targetBase: ">= 1" },
  { id: "28", category: "生态引领", name: "绿地率", attr: "必选", unit: "%", targetBase: "动态调整" },
  { id: "29-1", category: "生态引领", name: "新建工业建筑中绿建比例", attr: "必选(1)", unit: "%", targetBase: ">= 30", group: "building_group" },
  { id: "29-2", category: "生态引领", name: "新建公共建筑中绿建比例", attr: "必选(1)", unit: "%", targetBase: ">= 60", group: "building_group" },
  { id: "30", category: "生态引领", name: "人均公园绿地面积", attr: "特色", unit: "m2/人", targetBase: "动态调整" },
  { id: "31", category: "生态引领", name: "公众满意度", attr: "必选", unit: "%", targetBase: ">= 90" },
];

const ADVICE = {
  "1-2": ["严控高耗能项目准入", "推动传统工艺电气化改造", "建设园区综合能源管理中心"],
  "3": ["组织企业参与绿电绿证交易", "提升新能源本地消纳比例", "制定非化石能源替代计划"],
  "6": ["实施污染物排放倍量削减", "深化重点排口监测预警", "推行环境绩效等级评价"],
  "8": ["引入固废回收利用骨干企业", "建设固废资源共享匹配平台", "提升大宗固废综合利用价值"],
  "9-2": ["推广冷却水闭路循环", "开展水水平衡测试", "建设智慧水务节约管理中枢"],
  "12-1": ["加大战略新兴产业招引", "推动在建项目尽快达产", "盘活低效存量资产"],
  "13": ["开展综合能效提升行动", "替换高效电机和变压器", "建立能源预算管理机制"],
  "17": ["推进低效土地二次开发", "推动工业上楼与空间优化", "实施亩均效益评价"],
  "21": ["引导企业加大 R&D 投入", "落实研发费用政策工具", "建设校企联合研发中心"],
  "28": ["执行工业地绿化红线", "推动厂区立体绿化", "优化园区生态景观廊道"],
  "31": ["建立民意闭环响应机制", "定期举办环境开放日", "提升信息公开透明度"],
};

const PROJECTS = {
  "1-2": ["重点用能企业节能改造", "工业绿色微电网建设", "能源梯级利用优化工程"],
  "3": ["集中式储能电站", "源网荷储一体化微电网", "绿色电力交易平台"],
  "6": ["大气精准治理一厂一策", "工业废水深度净化站", "环境物联感知网络"],
  "8": ["工废高值化利用基地", "一般工废集中转运中心", "循环建材示范线"],
  "9-2": ["梯级用水改造示范", "智慧水务调度中心", "循环冷却系统改造"],
  "12-1": ["优势产业集群培育工程", "数字招商与产业地图", "低效项目出清盘活行动"],
  "13": ["综合能效提升工程", "高效设备替代计划", "能源预算管理平台"],
  "17": ["低效土地再开发", "垂直产业园试点", "土地集约利用评价系统"],
  "21": ["企业重点实验室梯队", "科技成果中试基地", "研发人才服务平台"],
  "28": ["生态景观长廊", "海绵化公共绿地", "企业透绿示范工程"],
  "31": ["治理投诉处理平台", "社区企业友好共建中心", "满意度动态评价系统"],
};

function safeDiv(a, b) {
  return a / (b || 1);
}

function makeResult(meta, actual, targetVal, operator = ">=", targetDisplay = meta.targetBase, customPass = null) {
  const cleanActual = Number.isFinite(actual) ? actual : 0;
  const pass = customPass !== null ? customPass : operator === "<=" ? cleanActual <= targetVal : operator === ">" ? cleanActual > targetVal : cleanActual >= targetVal;
  const gap = operator === "<=" ? Math.max(0, cleanActual - targetVal) : Math.max(0, targetVal - cleanActual);
  const gapRatio = targetVal ? Math.abs(gap / targetVal) : pass ? 0 : 1;
  return {
    ...meta,
    actualNum: cleanActual,
    targetVal,
    targetDisplay,
    operator,
    status: pass ? "pass" : "fail",
    gapText: pass ? "已达到目标要求" : `${operator === "<=" ? "高于" : "低于"}目标 ${gap.toFixed(2)} ${meta.unit === "布尔" ? "" : meta.unit}`,
    gapRatio,
    tasks: ADVICE[meta.id] || ["核查原始数据质量", "明确责任单位和整改时限", "建立专项整改台账"],
    projects: PROJECTS[meta.id] || ["基础设施综合升级", "管理体系数字化提升", "环境设施保障提升"],
  };
}

export function evaluateAssessment(rawInputs, rawAttributes) {
  const inputs = { ...DEFAULT_INPUTS, ...rawInputs };
  const attributes = { ...DEFAULT_ATTRIBUTES, ...rawAttributes };
  const gvaGrowth = safeDiv(inputs.gva_t - inputs.gva_t_3, inputs.gva_t_3);
  const safeGvaGrowth = gvaGrowth === 0 ? 0.0001 : gvaGrowth;
  const isGvaPositive = gvaGrowth > 0;
  const elasticityTarget = (positiveOperator = "<=", negativeOperator = ">=") => ({
    target: 0.3,
    operator: isGvaPositive ? positiveOperator : negativeOperator,
  });

  const pollutantElasticity = (current, baseline) => safeDiv(safeDiv(current - baseline, baseline), safeGvaGrowth);
  const eCod = pollutantElasticity(inputs.cod_t, inputs.cod_t_3);
  const eNh3 = pollutantElasticity(inputs.nh3_t, inputs.nh3_t_3);
  const eSo2 = pollutantElasticity(inputs.so2_t, inputs.so2_t_3);
  const eNox = pollutantElasticity(inputs.nox_t, inputs.nox_t_3);

  const results = INDICATORS.map((meta) => {
    switch (meta.id) {
      case "1-1": {
        const declineRate = safeDiv(inputs.co2_t_1 - inputs.co2_t, inputs.co2_t_1) * 100;
        const pass = inputs.co2_t_3 >= inputs.co2_t_2 && inputs.co2_t_2 >= inputs.co2_t_1 && inputs.co2_t_1 >= inputs.co2_t;
        return makeResult(meta, declineRate, 0, ">=", "连续三年下降", pass);
      }
      case "1-2":
        return makeResult(meta, safeDiv(inputs.co2_t, inputs.gva_t), attributes.isHighEnergy ? 0.8 : 0.5, "<=", attributes.isHighEnergy ? "清洁生产 I 级或国际先进" : "<= 0.5");
      case "2": {
        const co2Elasticity = safeDiv(safeDiv(inputs.co2_t - inputs.co2_t_3, inputs.co2_t_3), safeGvaGrowth);
        return makeResult(meta, co2Elasticity, 0.53, isGvaPositive ? "<=" : ">=", isGvaPositive ? "<= 0.53" : ">= 0.53");
      }
      case "3":
        return makeResult(meta, inputs.non_fossil_ratio_t, 30, ">=", ">= 30 或持续提高", inputs.non_fossil_ratio_t >= 30 || inputs.non_fossil_ratio_t >= inputs.non_fossil_ratio_t_3);
      case "4":
        return makeResult(meta, safeDiv(inputs.green_power_kwh_t, inputs.total_power_kwh_t) * 100, 30, ">=", ">= 30");
      case "5":
        return makeResult(meta, inputs.ccus_count, 1, ">=", ">= 1");
      case "6": {
        const config = elasticityTarget();
        return makeResult(meta, (eCod + eNh3 + eSo2 + eNox) / 4, config.target, config.operator, `${config.operator} ${config.target}`);
      }
      case "7-1":
        return makeResult(meta, safeDiv(inputs.wastewater_t, inputs.gva_t), attributes.isHighWater ? 8 : 5, "<=", attributes.isHighWater ? "清洁生产 I 级或国际先进" : "<= 5");
      case "7-2":
        return makeResult(meta, safeDiv(inputs.solid_waste_gen_t, inputs.gva_t), 0.1, "<=", "<= 0.1");
      case "8":
        return makeResult(meta, safeDiv(inputs.solid_waste_util_t, inputs.solid_waste_gen_t + inputs.solid_waste_stock_t) * 100, 80, ">=", ">= 80");
      case "9-1": {
        const targets = {
          water_scarce: [25, ">=", ">= 25"],
          yellow_river: [30, ">=", ">= 30"],
          jjj: [35, ">", "> 35"],
          other: [5, ">", "> 5"],
        };
        const [target, operator, display] = targets[attributes.waterStatus] || targets.other;
        return makeResult(meta, safeDiv(inputs.reclaimed_water_t, inputs.wastewater_t) * 100, target, operator, display);
      }
      case "9-2":
        return makeResult(meta, safeDiv(inputs.recycled_water_t, inputs.total_ind_water_t) * 100, 80, ">=", ">= 80");
      case "10":
        return makeResult(meta, safeDiv(inputs.res_recycled_utilized_t, inputs.res_recycled_collected_t) * 100, 90, ">=", ">= 90");
      case "11":
        return makeResult(meta, safeDiv(inputs.waste_heat_recovered_t, inputs.waste_heat_total_t) * 100, 60, ">=", ">= 60");
      case "12-1":
        return makeResult(meta, (Math.pow(safeDiv(inputs.gva_t, inputs.gva_t_3), 1 / 3) - 1) * 100, 15, ">=", ">= 15");
      case "12-2": {
        const target = attributes.region === "west_northeast" ? 20 : 25;
        return makeResult(meta, safeDiv(inputs.gva_t, inputs.employees_t), target, ">=", `>= ${target}`);
      }
      case "13":
        return makeResult(meta, safeDiv(inputs.gva_t, inputs.energy_t), attributes.isHighEnergy ? 4.5 : 6.5, ">=", attributes.isHighEnergy ? "清洁生产 I 级或国际先进" : ">= 6.5");
      case "14": {
        const energyElasticity = safeDiv(safeDiv(inputs.energy_t - inputs.energy_t_3, inputs.energy_t_3), safeGvaGrowth);
        return makeResult(meta, energyElasticity, 0.6, isGvaPositive ? "<=" : ">=", isGvaPositive ? "<= 0.6" : ">= 0.6");
      }
      case "15":
        return makeResult(meta, safeDiv(inputs.gva_t, inputs.fresh_water_t), 0.2, ">=", ">= 0.2");
      case "16": {
        const waterElasticity = safeDiv(safeDiv(inputs.fresh_water_t - inputs.fresh_water_t_3, inputs.fresh_water_t_3), safeGvaGrowth);
        return makeResult(meta, waterElasticity, 0.55, isGvaPositive ? "<=" : ">=", isGvaPositive ? "<= 0.55" : ">= 0.55");
      }
      case "17": {
        const target = attributes.region === "west_northeast" ? 9 : 12;
        return makeResult(meta, safeDiv(inputs.gva_t / 10000, inputs.land_area_km2), target, ">=", `>= ${target}`);
      }
      case "18":
        return makeResult(meta, inputs.eco_chain_projs, 8, ">=", ">= 8");
      case "19": {
        const denominator = Math.max(1, inputs.clean_audit_permits - inputs.clean_audit_compulsory);
        return makeResult(meta, safeDiv(inputs.clean_audit_voluntary, denominator) * 100, 10, ">=", ">= 10");
      }
      case "20-1": {
        const target = attributes.region === "west_northeast" ? 25 : 30;
        return makeResult(meta, safeDiv(inputs.hi_tech_out, inputs.ind_output_t) * 100, target, ">=", `>= ${target}`);
      }
      case "20-2": {
        const target = attributes.region === "west_northeast" ? 30 : 40;
        return makeResult(meta, safeDiv(inputs.strategic_out, inputs.ind_output_t) * 100, target, ">=", `>= ${target}`);
      }
      case "20-3": {
        const target = attributes.region === "west_northeast" ? 25 : 30;
        return makeResult(meta, safeDiv(inputs.green_out, inputs.ind_output_t) * 100, target, ">=", `>= ${target}`);
      }
      case "20-4": {
        const target = attributes.region === "west_northeast" ? 15 : 20;
        return makeResult(meta, safeDiv(inputs.digital_out, inputs.ind_output_t) * 100, target, ">=", `>= ${target}`);
      }
      case "21":
        return makeResult(meta, inputs.rd_ratio_t, 2.5, ">=", ">= 2.5 且增长", inputs.rd_ratio_t >= 2.5 && inputs.rd_ratio_t > inputs.rd_ratio_t_3);
      case "22":
        return makeResult(meta, safeDiv(inputs.digital_tool_ent_count, inputs.scale_ent_count) * 100, 90, ">", "> 90");
      case "23":
        return makeResult(meta, inputs.cnc_rate_avg, 75, ">", "> 75");
      case "24":
        return makeResult(meta, inputs.giant_count, 10, ">=", ">= 10");
      case "25":
        return makeResult(meta, safeDiv(inputs.patents_t, inputs.gva_t / 10000), 1.1, ">=", ">= 1.1");
      case "26":
        return makeResult(meta, inputs.smart_platform ? 1 : 0, 1, ">=", "完善");
      case "27":
        return makeResult(meta, inputs.smart_factory_count, 1, ">=", ">= 1");
      case "28": {
        const targetMap = { humid: 15, semi_humid: 12, dry: 10 };
        const target = targetMap[attributes.climate] || 15;
        return makeResult(meta, safeDiv(inputs.green_area_km2, inputs.park_total_km2) * 100, target, ">=", `>= ${target}`);
      }
      case "29-1":
        return makeResult(meta, safeDiv(inputs.new_ind_green_m2, inputs.new_ind_total_m2) * 100, 30, ">=", ">= 30");
      case "29-2":
        return makeResult(meta, safeDiv(inputs.new_pub_green_m2, inputs.new_pub_total_m2) * 100, 60, ">=", ">= 60");
      case "30": {
        const targetMap = { humid: 15, semi_humid: 12, dry: 10 };
        const target = targetMap[attributes.climate] || 15;
        return makeResult(meta, safeDiv(inputs.public_park_green_m2, inputs.population), target, ">=", `>= ${target}`);
      }
      case "31":
        return makeResult(meta, inputs.satisfaction_rate, 90, ">=", ">= 90");
      default:
        return makeResult(meta, 0, 0);
    }
  });

  const total = results.length;
  const passCount = results.filter((item) => item.status === "pass").length;
  const failCount = total - passCount;
  const mandatoryFail = results.filter((item) => item.attr.includes("必选") && item.status === "fail").length;
  const requirementPass = REQUIREMENTS.filter((item) => Boolean(inputs[item.key])).length;

  return {
    total,
    passCount,
    failCount,
    mandatoryFail,
    requirementPass,
    results,
  };
}

export function makeSnapshot({ id, name, attributes, inputs, assessment }) {
  return {
    id,
    name,
    attributes,
    inputs,
    updatedAt: new Date().toISOString(),
    summary: {
      total: assessment.total,
      passCount: assessment.passCount,
      failCount: assessment.failCount,
      mandatoryFail: assessment.mandatoryFail,
      requirementPass: assessment.requirementPass,
    },
    results: assessment.results,
  };
}

export function exportPayload({ name, attributes, inputs, assessment }) {
  return {
    name,
    exportedAt: new Date().toISOString(),
    attributes,
    inputs,
    summary: {
      total: assessment.total,
      passCount: assessment.passCount,
      failCount: assessment.failCount,
      mandatoryFail: assessment.mandatoryFail,
      requirementPass: assessment.requirementPass,
    },
    results: assessment.results,
  };
}

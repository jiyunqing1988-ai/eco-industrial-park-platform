import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_ATTRIBUTES,
  DEFAULT_INPUTS,
  evaluateAssessment,
  exportPayload,
  makeSnapshot,
} from "../src/platform.js";

const evaluate = (inputs = {}, attributes = {}) =>
  evaluateAssessment({ ...DEFAULT_INPUTS, ...inputs }, { ...DEFAULT_ATTRIBUTES, ...attributes });
const indicator = (assessment, id) => assessment.results.find((result) => result.id === id);

test("assessment totals match the 39 distinct indicator records", () => {
  const assessment = evaluate();
  assert.equal(assessment.total, 39);
  assert.equal(new Set(assessment.results.map((result) => result.id)).size, 39);
  assert.equal(assessment.passCount + assessment.failCount, assessment.total);
  assert.equal(assessment.passCount, assessment.results.filter((result) => result.status === "pass").length);
  assert.ok(assessment.results.every((result) => Number.isFinite(result.actualNum)));
});

test("CO2 decline requires all three annual intervals to be non-increasing", () => {
  const declining = { co2_t_3: 400, co2_t_2: 300, co2_t_1: 200, co2_t: 100 };
  assert.equal(indicator(evaluate(declining), "1-1").status, "pass");
  assert.equal(indicator(evaluate({ ...declining, co2_t_2: 150 }), "1-1").status, "fail");
});

test("reclaimed water strict threshold rejects equality", () => {
  const inputs = { wastewater_t: 100, reclaimed_water_t: 5 };
  assert.equal(indicator(evaluate(inputs, { waterStatus: "other" }), "9-1").status, "fail");
  assert.equal(indicator(evaluate({ ...inputs, reclaimed_water_t: 5.01 }), "9-1").status, "pass");
});

test("water-scarce threshold accepts equality at 25 percent", () => {
  const result = indicator(evaluate({ wastewater_t: 100, reclaimed_water_t: 25 }, { waterStatus: "water_scarce" }), "9-1");
  assert.equal(result.actualNum, 25);
  assert.equal(result.status, "pass");
});

test("regional attribute changes the per-worker output threshold", () => {
  const inputs = { gva_t: 22000, employees_t: 1000 };
  assert.equal(indicator(evaluate(inputs, { region: "other" }), "12-2").status, "fail");
  assert.equal(indicator(evaluate(inputs, { region: "west_northeast" }), "12-2").status, "pass");
});

test("R&D share needs both the minimum level and growth", () => {
  assert.equal(indicator(evaluate({ rd_ratio_t: 2.5, rd_ratio_t_3: 2.5 }), "21").status, "fail");
  assert.equal(indicator(evaluate({ rd_ratio_t: 2.4, rd_ratio_t_3: 2.0 }), "21").status, "fail");
  assert.equal(indicator(evaluate({ rd_ratio_t: 2.5, rd_ratio_t_3: 2.4 }), "21").status, "pass");
});

test("basic requirements are counted separately from numeric indicators", () => {
  const baseline = evaluate();
  const changed = evaluate({ req_1: false, req_13: false });
  assert.equal(baseline.requirementPass, 13);
  assert.equal(changed.requirementPass, 11);
  assert.equal(changed.passCount, baseline.passCount);
});

test("JSON exchange preserves inputs and allows assessment to be reproduced", () => {
  const inputs = { ...DEFAULT_INPUTS, satisfaction_rate: 89, req_2: false };
  const attributes = { ...DEFAULT_ATTRIBUTES, waterStatus: "jjj" };
  const assessment = evaluateAssessment(inputs, attributes);
  const exported = JSON.parse(JSON.stringify(exportPayload({ name: "Round-trip example", inputs, attributes, assessment })));
  const recomputed = evaluateAssessment(exported.inputs, exported.attributes);
  assert.deepEqual(recomputed.results, assessment.results);
  assert.equal(recomputed.requirementPass, 12);
  const saved = makeSnapshot({ id: "test-snapshot", ...exported, assessment: recomputed });
  assert.equal(saved.id, "test-snapshot");
  assert.equal(saved.summary.passCount, assessment.passCount);
  assert.ok(Number.isFinite(Date.parse(saved.updatedAt)));
});

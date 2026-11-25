const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const source = fs.readFileSync(
  path.join(__dirname, "../lib/duplicate-simulation.ts"),
  "utf8",
);
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const moduleObject = { exports: {} };
new Function("module", "exports", code)(moduleObject, moduleObject.exports);
const { initialSimulation, simulationReducer } = moduleObject.exports;
test("unprotected repeated delivery applies twice; protection applies the same request once", () => {
  let state = simulationReducer(initialSimulation, { type: "send" });
  state = simulationReducer(state, { type: "send" });
  assert.deepEqual(state, { protection: false, received: 2, applied: 2 });
  state = simulationReducer(state, { type: "protection", enabled: true });
  assert.deepEqual(state, { protection: true, received: 0, applied: 0 });
  for (let i = 0; i < 5; i++)
    state = simulationReducer(state, { type: "send" });
  assert.deepEqual(state, { protection: true, received: 5, applied: 1 });
  assert.deepEqual(simulationReducer(state, { type: "reset" }), {
    protection: true,
    received: 0,
    applied: 0,
  });
  assert.deepEqual(initialSimulation, {
    protection: false,
    received: 0,
    applied: 0,
  });
});

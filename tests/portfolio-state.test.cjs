const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
function load(name) {
  const source = readFileSync(path.join(__dirname, "../lib", name), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", code)(module, module.exports);
  return module.exports;
}
const { initialVisit, visitReducer, surpriseUnlocked, treatIds } =
  load("visit-state.ts");
const { deliveryConfirmed } = load("contact-response.ts");

test("selected project survives optional workshop navigation without changing hunt progress", () => {
  const collected = visitReducer(initialVisit, {
    type: "collect",
    id: "projects",
  });
  const selected = visitReducer(collected, {
    type: "select-project",
    index: 1,
  });
  assert.equal(selected.projectIndex, 1);
  assert.deepEqual(selected.collected, ["projects"]);
  assert.strictEqual(
    visitReducer(selected, { type: "select-project", index: 1 }),
    selected,
  );
  assert.strictEqual(
    visitReducer(selected, { type: "select-project", index: -1 }),
    selected,
  );
  assert.strictEqual(
    visitReducer(selected, { type: "select-project", index: 3 }),
    selected,
  );
});

test("four unique chapter treats unlock the reward, repeated visits do not increment", () => {
  let state = initialVisit;
  for (const id of ["projects", "about", "projects", "now", "about"])
    state = visitReducer(state, { type: "collect", id });
  assert.equal(state.collected.length, 3);
  assert.equal(surpriseUnlocked(state), false);
  state = visitReducer(state, { type: "collect", id: "journey" });
  assert.equal(surpriseUnlocked(state), true);
  assert.deepEqual(new Set(state.collected), new Set(treatIds));
  assert.equal(
    state.revealed,
    false,
    "completion does not reveal or open the reward automatically",
  );
  assert.strictEqual(
    visitReducer(state, { type: "collect", id: "journey" }),
    state,
  );
  assert.deepEqual(
    initialVisit.collected,
    [],
    "updates preserve the initial state",
  );
});

test("hidden guide retains progress and reward; incomplete visits cannot reveal", () => {
  assert.strictEqual(
    visitReducer(initialVisit, { type: "reveal" }),
    initialVisit,
  );
  let state = treatIds.reduce(
    (state, id) => visitReducer(state, { type: "collect", id }),
    initialVisit,
  );
  state = visitReducer(state, { type: "toggle-guide" });
  assert.equal(state.guideHidden, true);
  assert.equal(surpriseUnlocked(state), true);
  state = visitReducer(state, { type: "reveal" });
  assert.equal(state.revealed, true);
  state = visitReducer(state, { type: "toggle-guide" });
  assert.equal(state.revealed, true);
  assert.equal(state.collected.length, 4);
});

test("unexpected treat identifiers cannot unlock a reward", () => {
  const state = visitReducer(initialVisit, {
    type: "collect",
    id: "unexpected",
  });
  assert.strictEqual(state, initialVisit);
  assert.equal(
    surpriseUnlocked({
      ...initialVisit,
      collected: ["about", "about", "about", "about"],
    }),
    false,
  );
});

test("contact only confirms actual provider acceptance, not the API's optimistic wrapper", () => {
  for (const response of [
    null,
    {},
    { success: false },
    { success: true },
    { success: true, data: { error: { message: "Missing key" }, data: null } },
    { success: true, data: { data: { id: "" } } },
  ])
    assert.equal(deliveryConfirmed(response), false);
  assert.equal(
    deliveryConfirmed({
      success: true,
      data: { data: { id: "provider-message-id" }, error: null },
    }),
    true,
  );
});

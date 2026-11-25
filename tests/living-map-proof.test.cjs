const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function loadClock() {
  const source = readFileSync(path.join(__dirname, '../app/design/living-map-proof/clock.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', code)(module, module.exports);
  return module.exports;
}
const { lightingAt, localMinutes, formatTime } = loadClock();

test('clock blends continuously at dawn, dusk and midnight', () => {
  for (const boundary of [0, 300, 480, 960, 1200, 1440]) {
    const before = lightingAt(boundary - 0.001);
    const after = lightingAt(boundary + 0.001);
    assert.ok(Math.abs(before.night - after.night) < 0.001, `night discontinuity at ${boundary}`);
    assert.ok(Math.abs(before.lamps - after.lamps) < 0.001, `lamps discontinuity at ${boundary}`);
  }
  assert.equal(lightingAt(0).night, 0.62);
  assert.equal(lightingAt(720).night, 0);
  assert.equal(lightingAt(1440).night, lightingAt(0).night);
  assert.equal(lightingAt(-60).night, lightingAt(1380).night);
});

test('preview uses selected minutes and live time is derived from current local clock', () => {
  const date = new Date(2026, 9, 27, 18, 30, 30);
  assert.equal(localMinutes(date), 1110.5);
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(1439), '23:59');
  assert.equal(formatTime(1440), '00:00');
  assert.ok(lightingAt(localMinutes(date)).night > lightingAt(960).night);
  assert.throws(() => lightingAt(NaN), /finite/);
});

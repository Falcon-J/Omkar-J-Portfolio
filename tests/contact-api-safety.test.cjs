const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function handler({ key = 'test-key', result = { data: { id: 'email-test-id' }, error: null }, throws = false } = {}) {
  const calls = [];
  const instances = [];
  class Resend {
    constructor(apiKey) {
      instances.push(apiKey);
      this.emails = { send: async (message) => { calls.push(message); if (throws) throw new Error('private provider diagnostic'); return result; } };
    }
  }
  const source = readFileSync(path.join(__dirname, '../app/api/contact/route.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'process', compiled)((name) => { assert.equal(name, 'resend'); return { Resend }; }, module, module.exports, { env: { RESEND_API_KEY: key } });
  return { post: module.exports.POST, calls, instances };
}
const valid = { name: 'Omkar', email: 'visitor@example.com', subject: 'Hello', message: 'A thoughtful note.' };
function request(payload) { return new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); }

test('contact rejects malformed and invalid submissions before sending', async () => {
  for (const payload of [null, [], {}, { ...valid, name: 123 }, { ...valid, name: ' ' }, { ...valid, email: 'bad\r\naddress@example.com' }, { ...valid, email: 'not-an-email' }, { ...valid, name: 'x'.repeat(101) }, { ...valid, email: 'x'.repeat(255) }, { ...valid, subject: 'Hello\r\nInjected' }, { ...valid, subject: 'x'.repeat(201) }, { ...valid, message: 'x'.repeat(5001) }]) {
    const { post, calls } = handler();
    const response = await post(request(payload));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).success, false);
    assert.equal(calls.length, 0);
  }
  const { post, calls } = handler();
  const response = await post(new Request('http://localhost/api/contact', { method: 'POST', body: '{' }));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('contact uses plain text and preserves the confirmed-delivery response contract', async () => {
  const { post, calls } = handler();
  const response = await post(request({ ...valid, name: '  Visitor  ', message: '<img src=x onerror=alert(1)>\nA literal note.' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, data: { data: { id: 'email-test-id' }, error: null } });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].replyTo, valid.email);
  assert.equal(calls[0].html, undefined);
  assert.match(calls[0].text, /<img src=x onerror=alert\(1\)>/);
  assert.match(calls[0].text, /Name: Visitor/);
});

test('contact handles missing configuration and provider failure truthfully', async () => {
  const unavailable = handler({ key: '' });
  const response = await unavailable.post(request(valid));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
  assert.equal(unavailable.instances.length, 0);
  for (const setup of [{ result: { data: null, error: { message: 'private provider diagnostic' } } }, { throws: true }]) {
    const { post } = handler(setup);
    const failure = await post(request(valid));
    assert.equal(failure.status, 502);
    const body = await failure.json();
    assert.equal(body.success, false);
    assert.doesNotMatch(JSON.stringify(body), /private provider diagnostic/);
  }
});


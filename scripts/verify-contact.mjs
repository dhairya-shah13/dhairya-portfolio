// Verify the contact form's truthful post-submit behavior: it must NOT claim a
// message was delivered; it must offer a prefilled mailto link instead.
// Usage: node scripts/verify-contact.mjs <base-url>
import { spawn } from 'node:child_process';
import { readdirSync } from 'node:fs';

const baseUrl = process.argv[2] || 'http://localhost:4199';
const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];
const chromePath = chromeCandidates.find((p) => {
  try {
    readdirSync(p.slice(0, p.lastIndexOf('\\')));
    return true;
  } catch {
    return false;
  }
});

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--force-prefers-reduced-motion=no-preference',
  '--remote-debugging-port=9229',
  '--user-data-dir=' + process.env.TEMP + '\\cdp-contact-' + Date.now(),
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 40; i++) {
  try {
    const targets = await (await fetch('http://127.0.0.1:9229/json')).json();
    const page = targets.find((t) => t.type === 'page');
    if (page) {
      ws = new WebSocket(page.webSocketDebuggerUrl);
      break;
    }
  } catch {
    /* retry */
  }
  await sleep(250);
}

await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
const exceptions = [];
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  } else if (m.method === 'Runtime.exceptionThrown') {
    const d = m.params.exceptionDetails;
    exceptions.push((d?.exception?.description || d?.text || '').split('\n')[0]);
  } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    exceptions.push((m.params.args || []).map((a) => a.value || a.description || '').join(' ').slice(0, 300));
  }
};
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evalJs = async (expr) => {
  const resp = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (resp.exceptionDetails) {
    console.log('EVAL EXCEPTION:', JSON.stringify(resp.exceptionDetails).slice(0, 500));
    return { evalError: resp.exceptionDetails.text };
  }
  return resp.result?.value;
};

await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url: baseUrl + '/#contact' });
await sleep(3000);

// Fill fields via CDP Input.insertText (real key events -> React state updates)
const typeInto = async (selector, text) => {
  await evalJs(`document.querySelector('${selector}').focus()`);
  await sleep(100);
  await send('Input.insertText', { text });
  await sleep(100);
};
await typeInto('#name', 'Test Visitor');
await typeInto('#email', 'visitor@example.com');
await typeInto('#message', 'Hello, this is a test message.');

const result = await evalJs(`(async () => {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');
  if (!name || !email || !message) return { error: 'form fields not found' };
  document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  await new Promise(r => setTimeout(r, 500));
  const panel = document.querySelector('[class*=successMessage]');
  const emailLink = panel ? panel.querySelector('a[href^="mailto:"]') : null;
  return {
    panelVisible: !!panel,
    panelText: panel ? panel.textContent.replace(/\\s+/g, ' ').trim().slice(0, 250) : null,
    claimsSent: panel ? /sent successfully/i.test(panel.textContent) : false,
    mailtoHref: emailLink ? emailLink.getAttribute('href').slice(0, 120) : null,
    mailtoText: emailLink ? emailLink.textContent.trim() : null,
  };
})()`);

console.log('RAW RESULT:', JSON.stringify(result));
console.log(JSON.stringify(result, null, 2));
console.log('JS exceptions:', exceptions.length ? exceptions : 'none');

const pass =
  result.panelVisible &&
  !result.claimsSent &&
  result.mailtoHref &&
  result.mailtoHref.includes('mailto:shah.dhairya.p13@gmail.com') &&
  result.mailtoHref.includes('Test%20Visitor') &&
  exceptions.length === 0;

console.log(pass ? '\nPASS: contact form is truthful + prefilled mailto works' : '\nFAIL: contact form behavior incorrect');
ws.close();
chrome.kill();
process.exit(pass ? 0 : 1);

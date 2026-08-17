// Real-browser render verification (headless Chrome + CDP).
// Verifies motion animations actually run (content becomes visible), no JS
// exceptions occur, and each route hydrates cleanly.
// Usage: node scripts/verify-render.mjs <url1> <url2> ...
import { spawn } from 'node:child_process';
import { readdirSync } from 'node:fs';

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Usage: node scripts/verify-render.mjs <url> [url...]');
  process.exit(1);
}

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

// Headless Chrome defaults to prefers-reduced-motion: reduce, which hides the
// common desktop case. Default to no-preference; set PREFERS_REDUCED_MOTION=1
// to test the reduced-motion path explicitly.
const reducedMotionFlag =
  process.env.PREFERS_REDUCED_MOTION === '1'
    ? '--force-prefers-reduced-motion=reduce'
    : '--force-prefers-reduced-motion=no-preference';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  reducedMotionFlag,
  '--remote-debugging-port=9223',
  '--user-data-dir=' + process.env.TEMP + '\\cdp-profile-' + Date.now(),
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTargetWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9223/json');
      const targets = await res.json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error('Could not connect to Chrome DevTools');
}

let msgId = 0;
const pending = new Map();
const exceptions = [];

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      const send = (method, params = {}) =>
        new Promise((res, rej) => {
          const id = ++msgId;
          pending.set(id, { res, rej });
          ws.send(JSON.stringify({ id, method, params }));
        });
      resolve({ ws, send });
    };
    ws.onerror = (e) => reject(e);
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        const detail = d?.exception?.description || d?.text || 'exception';
        exceptions.push(detail.split('\n')[0]);
      } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        const text = (msg.params.args || [])
          .map((a) => a.value || a.description || JSON.stringify(a))
          .join(' ');
        exceptions.push(text.slice(0, 3000));
      }
    };
  });
}

try {
  const wsUrl = await getTargetWsUrl();
  const { ws, send } = await connect(wsUrl);

  await send('Runtime.enable');
  await send('Page.enable');

  for (const url of urls) {
    await send('Page.navigate', { url });
    await sleep(3500); // real time: let preloader + entrance animations finish

    const evalJs = async (expression) => {
      const { result } = await send('Runtime.evaluate', { expression, returnByValue: true });
      return result.value;
    };

    const reducedMotion = await evalJs(
      'matchMedia("(prefers-reduced-motion: reduce)").matches'
    );
    console.log(`  reduced-motion: ${reducedMotion}`);
    const title = await evalJs('document.title');
    const h1 = await evalJs('document.querySelector("h1")?.textContent?.trim() || null');
    const h1Opacity = await evalJs(
      'getComputedStyle(document.querySelector("h1")).opacity'
    );
    const preloaderGone = await evalJs('document.querySelector("[class*=preloader]") === null');
    const bodyText = await evalJs('document.body.innerText.length');

    console.log(`${url}`);
    console.log(`  title:       ${title}`);
    console.log(`  h1:          ${h1}`);
    console.log(`  h1 opacity:  ${h1Opacity} (1 = visible after animation)`);
    console.log(`  preloader:   ${preloaderGone ? 'gone' : 'STILL PRESENT'}`);
    console.log(`  body text:   ${bodyText} chars`);
  }

  const currentExceptions = exceptions.filter((e) => !String(e).includes('ResizeObserver'));
  console.log(
    currentExceptions.length
      ? `\nJS exceptions: ${currentExceptions.length}\n${currentExceptions.join('\n')}`
      : '\nJS exceptions: none'
  );

  ws.close();
  chrome.kill();
  process.exit(currentExceptions.length ? 1 : 0);
} catch (err) {
  console.error('Verification failed:', err.message);
  chrome.kill();
  process.exit(2);
}

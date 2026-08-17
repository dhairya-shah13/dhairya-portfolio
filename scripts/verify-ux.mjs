// UX verification (headless Chrome + CDP): SPA navigation, client-side 404,
// mobile menu behavior, and horizontal-overflow checks at desktop + mobile.
// Usage: node scripts/verify-ux.mjs <base-url>
import { spawn } from 'node:child_process';
import { readdirSync } from 'node:fs';

const baseUrl = process.argv[2] || 'http://localhost:4173';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--force-prefers-reduced-motion=no-preference',
  '--remote-debugging-port=9225',
  '--user-data-dir=' + process.env.TEMP + '\\cdp-ux-' + Date.now(),
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const targets = await (await fetch('http://127.0.0.1:9225/json')).json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error('CDP not reachable');
}

let id = 0;
const pending = new Map();
const ws = new WebSocket(await getWsUrl());

await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};

const send = (method, params = {}) =>
  new Promise((res) => {
    const msgId = ++id;
    pending.set(msgId, res);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

const evalJs = async (expression) => {
  const { result } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return result.value;
};

await send('Runtime.enable');
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'OK ' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

// 1. Desktop overflow check
await send('Page.navigate', { url: baseUrl + '/' });
await sleep(3500);
const desktopOverflow = await evalJs('document.documentElement.scrollWidth - window.innerWidth');
check('desktop horizontal overflow', desktopOverflow <= 0, `scrollWidth-innerWidth=${desktopOverflow}px`);

// 2. SPA navigation: click About link, content should swap without full reload
const navResult = await evalJs(`(async () => {
  const link = [...document.querySelectorAll('nav a')].find(a => a.textContent.trim() === 'About');
  if (!link) return 'no About link found';
  link.click();
  await new Promise(r => setTimeout(r, 1500));
  return document.querySelector('h1')?.textContent.trim();
})()`);
check('SPA nav to /about', navResult === 'Dhairya Shah', `h1="${navResult}"`);

// 3. Client-side 404 route
await evalJs(`window.history.pushState({}, '', '/does-not-exist'); window.dispatchEvent(new PopStateEvent('popstate'));`);
await sleep(1000);
const notFound = await evalJs(`document.querySelector('h1')?.textContent.trim() || document.body.innerText.slice(0,60)`);
check('client-side 404 page', /not found/i.test(notFound), `h1="${notFound}"`);

// 4. Mobile: overflow + menu open/close
await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: baseUrl + '/' });
await sleep(3000);
const mobileOverflow = await evalJs('document.documentElement.scrollWidth - window.innerWidth');
check('mobile horizontal overflow', mobileOverflow <= 0, `scrollWidth-innerWidth=${mobileOverflow}px`);

const menuTest = await evalJs(`(async () => {
  const btn = document.getElementById('hamburger-menu-btn');
  if (!btn) return 'no hamburger';
  const before = btn.getAttribute('aria-expanded');
  btn.click();
  await new Promise(r => setTimeout(r, 400));
  const open = btn.getAttribute('aria-expanded');
  const overlay = document.getElementById('mobile-menu');
  const overlayVisible = overlay ? getComputedStyle(overlay).pointerEvents : 'n/a';
  // Dispatch on an element inside #root so the event bubbles through React's
  // delegated listener (dispatching on document would never reach it).
  const target = document.getElementById('close-menu-btn') || document.getElementById('mobile-menu');
  target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await new Promise(r => setTimeout(r, 400));
  const after = btn.getAttribute('aria-expanded');
  return { before, open, overlayVisible, after };
})()`);
check(
  'mobile menu opens on click',
  menuTest.before === 'false' && menuTest.open === 'true' && menuTest.overlayVisible === 'auto',
  JSON.stringify(menuTest)
);
check('mobile menu closes on Escape', menuTest.after === 'false', `aria-expanded=${menuTest.after}`);

// 5. Cross-page hash navigation: from /about, click Skills -> homepage + scroll
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: baseUrl + '/about' });
await sleep(2500);
const hashNav = await evalJs(`(async () => {
  const skillsLink = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Skills');
  if (!skillsLink) return { error: 'no Skills link' };
  skillsLink.click();
  await new Promise(r => setTimeout(r, 2000));
  const skillsEl = document.getElementById('skills');
  return {
    path: location.pathname,
    hash: location.hash,
    h1: document.querySelector('h1')?.textContent.trim(),
    skillsTop: skillsEl ? Math.round(skillsEl.getBoundingClientRect().top) : null,
    scrollY: Math.round(window.scrollY),
  };
})()`);
const hashPass =
  hashNav.path === '/' &&
  hashNav.hash === '#skills' &&
  hashNav.skillsTop !== null &&
  Math.abs(hashNav.skillsTop) < 120;
check('cross-page hash nav (about -> #skills)', hashPass, JSON.stringify(hashNav));

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
ws.close();
chrome.kill();
process.exit(failed.length ? 1 : 0);

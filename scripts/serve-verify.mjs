// Local production-equivalent static server for pre-deploy verification.
// Serves dist/ with the exact security headers from vercel.json (CSP, HSTS,
// nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, CORS) and
// Vercel-like 404 behavior (public/404.html copied to dist/404.html).
// Usage: node scripts/serve-verify.mjs [port]   (default 4199)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = Number(process.argv[2] || 4199);
const root = join(process.cwd(), 'dist');

const CSP =
  "default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let path = decodeURIComponent(url.pathname);

  // Reject path traversal
  if (path.includes('..')) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const applyHeaders = (asset) => {
    res.setHeader('Content-Security-Policy', CSP);
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Access-Control-Allow-Origin', 'https://www.aboutdhairya.me');
    if (asset.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (/(robots\.txt|sitemap\.xml)/.test(asset)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    } else if (/(og-image\.png|images\/.*|resume\/.*)/.test(asset)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  };

  const basePath = join(root, normalize(path).replace(/^[/\\]+/, ''));
  // Vercel behavior: /about -> about.html, /projects/x -> projects/x.html
  const candidates = [basePath, basePath + '.html', join(basePath, 'index.html')];
  let filePath = null;
  for (const c of candidates) {
    try {
      const s = await stat(c);
      if (s.isDirectory()) continue;
      filePath = c;
      break;
    } catch {
      /* try next */
    }
  }

  try {
    const content = await readFile(filePath);
    applyHeaders(path);
    const ext = extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.writeHead(200);
    res.end(content);
  } catch {
    // Unknown route -> dist/404.html with real 404 status (Vercel behavior)
    try {
      const content = await readFile(join(root, '404.html'));
      applyHeaders(path);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(404);
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
});

server.listen(port, () => {
  console.log(`Serving dist/ with vercel.json headers on http://localhost:${port}`);
});

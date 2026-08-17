// Post-build transform: vite-react-ssg injects two INLINE scripts into each
// prerendered HTML file:
//   1. window.__staticRouterHydrationData = JSON.parse("...")  (react-router)
//   2. window.__VITE_REACT_SSG_HASH__ = '...'                  (vite-react-ssg)
// A strict Content-Security-Policy (script-src 'self') blocks inline scripts,
// which silently kills hydration. This script moves each inline script's
// content into a content-hashed external file under /assets/ (allowed by
// 'self') and replaces the inline <script> with a <script src="..."> tag.
// Content hashing dedupes identical scripts across pages (the hash script is
// the same on every page) and keeps the files cache-immutable.
//
// Runs automatically after `vite-react-ssg build` (see package.json "build").
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const dist = join(process.cwd(), 'dist');
const assetsDir = join(dist, 'assets');
mkdirSync(assetsDir, { recursive: true });

// Match a script tag with NO attributes (i.e. a plain inline script).
const inlineScriptRe = /<script>([\s\S]*?)<\/script>/g;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const htmlFiles = walk(dist);
let totalScripts = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const seen = new Set();

  const transformed = html.replace(inlineScriptRe, (match, content) => {
    // Ignore JSON-LD blocks (they carry type="application/ld+json" and do not
    // match the attribute-less regex) and any other script the browser should
    // not execute.
    if (!content.trim()) return match;

    totalScripts += 1;
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
    const filename = `ssg-hydration-${hash}.js`;
    const outPath = join(assetsDir, filename);

    if (!seen.has(filename) && !existsSync(outPath)) {
      writeFileSync(outPath, content, 'utf8');
    }
    seen.add(filename);
    return `<script src="/assets/${filename}"></script>`;
  });

  if (transformed !== html) {
    writeFileSync(file, transformed, 'utf8');
    console.log(`externalized inline scripts -> ${relative(process.cwd(), file)}`);
  }
}

console.log(`\nExternalized ${totalScripts} inline script(s) into /assets/ (content-hashed).`);

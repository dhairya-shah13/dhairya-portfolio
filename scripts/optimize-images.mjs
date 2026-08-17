// Per-image optimization for src/assets.
// Run: npm run optimize:images
//
// - Resizes each image to a sensible max width (display size x2 DPR) and
//   re-encodes as a quality-appropriate JPEG, IN PLACE (same filenames), so the
//   existing "replace these files directly" workflow keeps working.
// - Skips the small profile photo (already optimized).
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const assetsDir = 'src/assets';

// Per-file budgets: maxWidth is display width x2 DPR, quality chosen per content.
const plans = {
  // Project screenshots: shown at ~640px card width and ~800px detail width.
  project1: { maxWidth: 1400, quality: 72 },
  project2: { maxWidth: 1400, quality: 72 },
  project3: { maxWidth: 1400, quality: 72 },
  project4: { maxWidth: 1400, quality: 72 },
  project5: { maxWidth: 1400, quality: 72 },
  project6: { maxWidth: 1400, quality: 72 },
  // Focus-area graphics: shown in a ~600px panel.
  focus1: { maxWidth: 1200, quality: 70 },
  focus2: { maxWidth: 1200, quality: 70 },
  focus3: { maxWidth: 1200, quality: 70 },
  focus4: { maxWidth: 1200, quality: 70 },
};

const files = (await readdir(assetsDir)).filter((f) => /\.(jpe?g)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const base = file.replace(extname(file), '');
  const plan = plans[base];
  if (!plan) {
    console.log(`SKIP  ${file} (no optimization plan — small/other asset)`);
    continue;
  }

  const path = join(assetsDir, file);
  const { size: before } = await stat(path);
  const image = sharp(path);

  const { width, height } = await image.metadata();
  const scale = Math.min(1, plan.maxWidth / width);
  const outWidth = Math.round(width * scale);
  const outHeight = Math.round(height * scale);

  // sharp cannot read and write the same path — write to a temp file, then replace.
  const tmpPath = `${path}.tmp`;
  await image
    .resize(outWidth, outHeight, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: plan.quality, progressive: true, mozjpeg: true })
    .toFile(tmpPath);
  await import('node:fs/promises').then(({ rename }) => rename(tmpPath, path));

  const { size: after } = await stat(path);
  totalBefore += before;
  totalAfter += after;
  console.log(
    `OK    ${file}: ${width}x${height} -> ${outWidth}x${outHeight}, ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);

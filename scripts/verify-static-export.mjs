import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('out');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return nested.flat();
}
const htmlFiles = (await walk(output)).filter(file => file.endsWith('.html'));
if (htmlFiles.length < 20) throw new Error('The static export is missing the existing page catalogue.');
const failures = new Set();
let checked = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(output, file).replaceAll(path.sep, '/');
  const sourceUrl = new URL(relative.replace(/index\.html$/, ''), 'https://preview.komponia.invalid/');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(#|data:|mailto:|tel:|javascript:)/i.test(value)) continue;
    const target = new URL(value, sourceUrl);
    if (target.origin !== sourceUrl.origin) continue;
    const pathname = decodeURIComponent(target.pathname);
    const location = path.join(output, pathname);
    const candidates = path.extname(pathname) ? [location] : [path.join(location, 'index.html'), `${location}.html`];
    const exists = await Promise.any(candidates.map(candidate => access(candidate).then(() => true))).catch(() => false);
    checked++;
    if (!exists) failures.add(`${relative}: ${value}`);
  }
}
await access(path.join(output, '404.html'));
await access(path.join(output, 'contact', 'index.html'));
await access(path.join(output, 'components', 'index.html'));
if (failures.size) throw new Error(`Broken internal links/assets:\n${[...failures].join('\n')}`);
console.log(`Static export verified: ${htmlFiles.length} HTML pages, ${checked} internal links/assets, and a real 404 page.`);

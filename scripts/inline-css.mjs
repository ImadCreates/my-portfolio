/*
  P7: post-build CSS inlining. The bundle stylesheet is ~5KB gzipped;
  fetching it costs a render-blocking round trip before the static hero
  shell can paint. Inlining it into dist/index.html removes that trip.
  Runs as part of `npm run build`.
*/
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const cssFile = readdirSync('dist/assets').find((f) => f.endsWith('.css'));
const css = readFileSync(`dist/assets/${cssFile}`, 'utf8');

const linkRe = new RegExp(`\\s*<link rel="stylesheet"[^>]*href="/assets/${cssFile}"[^>]*>`);
if (!linkRe.test(html)) {
  console.error(`stylesheet link for ${cssFile} not found in dist/index.html`);
  process.exit(1);
}

writeFileSync('dist/index.html', html.replace(linkRe, `<style>${css}</style>`));
console.log(`inlined ${cssFile} (${(css.length / 1024).toFixed(1)} kB raw) into dist/index.html`);

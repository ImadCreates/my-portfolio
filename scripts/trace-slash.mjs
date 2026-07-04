/*
  Frame-timing check for the slash mechanic under CPU throttle.
  Collects rAF deltas while a synthetic swipe draws, shears, and fades.
  Usage: node scripts/trace-slash.mjs [url] [throttle]
*/
import puppeteer from 'puppeteer-core';

const url = process.argv[2] ?? 'http://localhost:4173/';
const throttle = Number(process.argv[3] ?? 4);
const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.evaluateOnNewDocument(() => {
  sessionStorage.setItem('rank-one:intro-played', '1');
});
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));

await page.emulateCPUThrottling(throttle);

/* Collect ~2s of frame deltas starting with the swipe. */
await page.evaluate(() => {
  window.__frames = [];
  let last;
  const loop = (t) => {
    if (last !== undefined) window.__frames.push(t - last);
    last = t;
    if (window.__frames.length < 120) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});

await page.mouse.move(1180, 240);
await page.mouse.move(700, 580, { steps: 6 });
await page.mouse.move(400, 300);
await page.mouse.move(980, 620, { steps: 6 });

await new Promise((r) => setTimeout(r, 2300));
const frames = await page.evaluate(() => window.__frames);
await page.emulateCPUThrottling(1);
await browser.close();

const sorted = [...frames].sort((a, b) => a - b);
const avg = frames.reduce((s, v) => s + v, 0) / frames.length;
const p95 = sorted[Math.floor(sorted.length * 0.95)];
const dropped = frames.filter((f) => f > 25).length;
console.log(
  JSON.stringify(
    {
      cpuThrottle: `${throttle}x`,
      frames: frames.length,
      avgMs: +avg.toFixed(2),
      p95Ms: +p95.toFixed(2),
      maxMs: +Math.max(...frames).toFixed(2),
      framesOver25ms: dropped,
    },
    null,
    2,
  ),
);

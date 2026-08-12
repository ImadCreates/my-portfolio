/*
  P7: frame-cost measurement for the grain layer under CPU throttle.
  Collects rAF deltas twice on an idle page — grain running, then grain
  removed — so the delta attributable to the texture is visible.
  Usage: node scripts/trace-grain.mjs [url] [throttle]
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

const sample = () =>
  page.evaluate(
    () =>
      new Promise((res) => {
        const frames = [];
        let last;
        const loop = (t) => {
          if (last !== undefined) frames.push(t - last);
          last = t;
          if (frames.length < 180) requestAnimationFrame(loop);
          else res(frames);
        };
        requestAnimationFrame(loop);
      }),
  );

const stats = (frames) => {
  const sorted = [...frames].sort((a, b) => a - b);
  return {
    avgMs: +(frames.reduce((s, v) => s + v, 0) / frames.length).toFixed(2),
    p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
    maxMs: +Math.max(...frames).toFixed(2),
    over25ms: frames.filter((f) => f > 25).length,
  };
};

const withGrain = stats(await sample());
await page.evaluate(() => document.querySelector('canvas.z-\\[45\\]')?.remove());
const withoutGrain = stats(await sample());

await page.emulateCPUThrottling(1);
await browser.close();
console.log(JSON.stringify({ cpuThrottle: `${throttle}x`, withGrain, withoutGrain }, null, 2));

/*
  B5 frame-timing check: a x10 combo with double slices under CPU
  throttle. Scrolls to the challenge section, where one swipe crosses
  both the giant heading and ghost numeral 04, and lands ten rapid cuts.
  Usage: node scripts/trace-combo.mjs [url] [throttle]
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

await page.evaluate(() => document.getElementById('challenge').scrollIntoView());
await new Promise((r) => setTimeout(r, 1000));

await page.emulateCPUThrottling(throttle);

await page.evaluate(() => {
  window.__frames = [];
  let last;
  const loop = (t) => {
    if (last !== undefined) window.__frames.push(t - last);
    last = t;
    if (window.__frames.length < 300) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});

/* Ten rapid cuts crossing heading and numeral. */
for (let i = 0; i < 10; i++) {
  const y = 320 + (i % 4) * 60;
  await page.mouse.move(120, y);
  await page.mouse.move(1400, y + 140, { steps: 6 });
  await new Promise((r) => setTimeout(r, 170));
}

await new Promise((r) => setTimeout(r, 2600));
const result = await page.evaluate(() => ({
  frames: window.__frames,
  combo: [...document.querySelectorAll('.fixed.z-40 p')].map((p) => p.textContent),
  masterStroke: sessionStorage.getItem('rank-one:streak-10'),
}));
await page.emulateCPUThrottling(1);
await browser.close();

const frames = result.frames;
const sorted = [...frames].sort((a, b) => a - b);
const avg = frames.reduce((s, v) => s + v, 0) / frames.length;
console.log(
  JSON.stringify(
    {
      cpuThrottle: `${throttle}x`,
      frames: frames.length,
      avgMs: +avg.toFixed(2),
      p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
      maxMs: +Math.max(...frames).toFixed(2),
      framesOver25ms: frames.filter((f) => f > 25).length,
      masterStrokeReached: result.masterStroke === '1',
    },
    null,
    2,
  ),
);

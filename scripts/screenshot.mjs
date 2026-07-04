/*
  Regenerates docs/hero.png from a running server, captured mid-cut:
  a synthetic swipe triggers the slash mechanic, the shot lands while
  the seal line is still bright.
  Usage: node scripts/screenshot.mjs [url]
*/
import puppeteer from 'puppeteer-core';

const url = process.argv[2] ?? 'http://localhost:4173/';
const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

/* Skip the intro so the shot is the settled hero. */
await page.evaluateOnNewDocument(() => {
  sessionStorage.setItem('rank-one:intro-played', '1');
});

await page.goto(url, { waitUntil: 'networkidle0' });

/* Wait for the scroll reveals to finish. */
await page.waitForFunction(
  () =>
    [...document.querySelectorAll('section [data-reveal]')]
      .slice(0, 4)
      .every((el) => getComputedStyle(el).opacity === '1'),
  { timeout: 10_000 },
);

/* Swipe across the hero to draw a cut, then shoot while it holds. */
await page.mouse.move(1180, 240);
await page.mouse.move(760, 560, { steps: 6 });
await new Promise((r) => setTimeout(r, 380));

await page.screenshot({ path: 'docs/hero.png' });
await browser.close();
console.log('written docs/hero.png');

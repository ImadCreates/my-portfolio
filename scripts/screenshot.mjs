/*
  Regenerates docs/hero.png from a running server.
  Usage: node scripts/screenshot.mjs [url]
*/
import puppeteer from 'puppeteer-core';

const url = process.argv[2] ?? 'http://localhost:4173/';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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

await page.screenshot({ path: 'docs/hero.png' });
await browser.close();
console.log('written docs/hero.png');

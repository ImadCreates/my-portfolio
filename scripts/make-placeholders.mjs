/*
  Generates flat MEDIA PENDING placeholders in public/media/ using the
  token colors, at the exact dimensions the real assets must have.
  Replacing a real asset means dropping a file with the same name into
  public/media/. Usage: node scripts/make-placeholders.mjs
*/
import { readFileSync, mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const css = readFileSync('src/index.css', 'utf8');
const token = (name) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
const ink = token('ink');
const ash = token('ash');
const hairline = token('hairline');
const steel = token('steel');

const FILES = [
  { name: 'routy-dashboard.webp', w: 1600, h: 1000 },
  { name: 'routy-mobile.webp', w: 900, h: 1900 },
  { name: 'routy-close.webp', w: 1600, h: 1000 },
  { name: 'de10-fpga.webp', w: 1600, h: 1000 },
];

mkdirSync('public/media', { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

for (const { name, w, h } of FILES) {
  await page.setViewport({ width: w, height: h });
  await page.setContent(`
    <body style="margin:0;background:${ash};display:grid;place-items:center;
                 width:${w}px;height:${h}px;box-sizing:border-box;
                 border:1px solid ${hairline};outline:8px solid ${ink};outline-offset:-9px">
      <div style="font-family:ui-monospace,monospace;letter-spacing:0.14em;
                  color:${steel};text-align:center;font-size:${Math.round(w / 40)}px">
        MEDIA PENDING<br/>
        <span style="font-size:${Math.round(w / 64)}px">${name} · ${w}×${h}</span>
      </div>
    </body>`);
  await page.screenshot({ path: `public/media/${name}`, type: 'webp', quality: 80 });
  console.log(`written public/media/${name} (${w}x${h})`);
}

await browser.close();

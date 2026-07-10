/*
  P6: generates the 1200x630 OG card (public/og.png) from the hero
  composition — eyebrow, name, one cut line — and the 32px PNG favicon
  (public/favicon-32.png) from the blade-tip glyph. Fonts are embedded
  as data URIs so this runs standalone. Usage: node scripts/make-og.mjs
*/
import { readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const css = readFileSync('src/index.css', 'utf8');
const token = (name) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
const ink = token('ink');
const hairline = token('hairline');
const steel = token('steel');
const bone = token('bone');
const seal = token('seal');

const font = (path) =>
  `data:font/woff2;base64,${readFileSync(path).toString('base64')}`;
const clash = font('public/fonts/clash-display-600.woff2');
const mono = font('public/fonts/jetbrains-mono-latin-400.woff2');

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

/* The OG card. */
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(`
  <style>
    @font-face { font-family: Clash; src: url(${clash}) format("woff2"); font-weight: 600; }
    @font-face { font-family: Mono; src: url(${mono}) format("woff2"); }
    * { margin: 0; }
  </style>
  <body style="width:1200px;height:630px;background:${ink};position:relative;overflow:hidden">
    <svg style="position:absolute;inset:0" width="1200" height="630">
      <line x1="1200" y1="0" x2="0" y2="630" stroke="${hairline}" stroke-width="1"/>
      <line x1="914" y1="150" x2="800" y2="210" stroke="${seal}" stroke-width="2"/>
    </svg>
    <div style="position:absolute;left:80px;top:150px">
      <p style="font-family:Mono;font-size:22px;letter-spacing:0.14em;color:${steel}">
        PLAYER PROFILE / SEASON 2026 / TORONTO
      </p>
      <h1 style="font-family:Clash;font-weight:600;font-size:150px;line-height:0.92;
                 letter-spacing:-0.02em;color:${bone};margin-top:36px">
        IMADUDDIN<br/>AHMED
      </h1>
    </div>
  </body>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
console.log('written public/og.png (1200x630)');

/* The favicon PNG fallback: blade tip, seal on transparent. */
await page.setViewport({ width: 32, height: 32 });
await page.setContent(`
  <style>*{margin:0}</style>
  <body style="width:32px;height:32px;background:transparent">
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M4 6h24L16 27z" fill="${seal}"/>
    </svg>
  </body>`);
await page.screenshot({ path: 'public/favicon-32.png', omitBackground: true });
console.log('written public/favicon-32.png (32x32)');

await browser.close();

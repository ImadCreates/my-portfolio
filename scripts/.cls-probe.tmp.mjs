import puppeteer from 'puppeteer-core';
const CHROME = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 412, height: 823, isMobile: true });
await page.evaluateOnNewDocument(() => {
  sessionStorage.setItem('rank-one:intro-played', '1');
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__shifts.push({
        value: +e.value.toFixed(4),
        t: Math.round(e.startTime),
        sources: (e.sources || []).map(s => {
          const n = s.node;
          return n ? (n.tagName || n.nodeName) + '.' + String(n.className && n.className.baseVal || n.className || '').slice(0, 50) : 'null';
        }),
      });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});
const client = await page.createCDPSession();
await client.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2000));
console.log(JSON.stringify(await page.evaluate(() => window.__shifts), null, 1));
await browser.close();

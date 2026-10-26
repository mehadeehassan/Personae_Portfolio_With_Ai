/**
 * Viewport-accurate QA screenshot + overflow probe.
 * Usage: node scripts/qa-shot.mjs <url> <out.png> [width] [height] [full]
 */
import puppeteer from "puppeteer-core";

const [url, out, wArg, hArg, fullArg] = process.argv.slice(2);
const width = Number(wArg || 390);
const height = Number(hArg || 844);

const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: [
    "--hide-scrollbars",
    "--disable-gpu",
    ...(process.env.QA_REDUCED === "0"
      ? []
      : ["--force-prefers-reduced-motion"]),
  ],
});

const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
if (process.env.QA_THEME) {
  await page.evaluateOnNewDocument((theme) => {
    localStorage.setItem("mh-theme", theme);
  }, process.env.QA_THEME);
}
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, Number(process.env.QA_DELAY || 2500)));

const metrics = await page.evaluate(() => ({
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));

const wide = await page.evaluate(() => {
  const cw = document.documentElement.clientWidth;
  const bad = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > cw + 1) {
      bad.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 90),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  });
  return bad.slice(0, 12);
});

await page.screenshot({ path: out, fullPage: fullArg === "full" });
await browser.close();

console.log(`saved ${out} | viewport ${width}x${height}`);
console.log(`clientWidth=${metrics.clientWidth} scrollWidth=${metrics.scrollWidth}`);
if (metrics.scrollWidth > metrics.clientWidth) {
  console.log("OVERFLOW DETECTED — offenders:");
  for (const b of wide) console.log(`  <${b.tag}> .${b.cls} left=${b.left} right=${b.right}`);
} else {
  console.log("no horizontal overflow");
}

// Writes every brand file from src/components/brand/monogram.json:
//   public/brand/*.svg|png   logo files for print, slides and email signatures
//   src/app/icon.svg          favicon (adapts to light and dark browser chrome)
//   src/app/favicon.ico       16/32/48 px fallback favicon
//   src/app/apple-icon.png    iOS home-screen icon
//   src/app/opengraph-image.png, twitter-image.png   link previews
//
// Usage: npm run generate:brand   (needs Chrome, Brave, Edge or Chromium; see scripts/lib/browser.mjs)

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { COLORS, faviconSvg, mark, monogramSvg, sealSvg, squareBox, strokes } from "./lib/brand-svg.mjs";
import { screenshot } from "./lib/browser.mjs";

const root = new URL("../", import.meta.url);
const out = (p) => fileURLToPath(new URL(p, root));
mkdirSync(out("public/brand"), { recursive: true });

// 1. Vector files
const vector = {
  "public/brand/bb-monogram.svg": monogramSvg(COLORS.ink),
  "public/brand/bb-monogram-brass.svg": monogramSvg(COLORS.brass),
  "public/brand/bb-monogram-white.svg": monogramSvg("#FFFFFF"),
  "public/brand/bb-seal.svg": sealSvg(),
  "public/brand/bb-seal-dark.svg": sealSvg({ dark: true }),
  "src/app/icon.svg": faviconSvg(),
};
for (const [file, svg] of Object.entries(vector)) writeFileSync(out(file), svg);

// 2. Raster files, rendered by a headless browser
const tmp = mkdtempSync(join(tmpdir(), "bb-brand-"));
const FONTS =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Brygada+1918:wght@400..700&family=Martian+Mono:wdth,wght@75..112.5,300..600&family=Schibsted+Grotesk:wght@400..800&display=swap">';

function page(width, height, body, { fonts = false, background = "transparent" } = {}) {
  return `<!doctype html><html><head><meta charset="utf-8">${fonts ? FONTS : ""}<style>
html,body{margin:0;background:transparent}
.frame{position:absolute;left:0;top:0;width:${width}px;height:${height}px;overflow:hidden;background:${background};display:grid;place-items:center}
</style></head><body><div class="frame">${body}</div></body></html>`;
}

function render(name, width, height, body, opts = {}) {
  const file = join(tmp, `${name.replace(/[^\w.-]/g, "_")}.html`);
  writeFileSync(file, page(width, height, body, opts));
  screenshot(pathToFileURL(file).href, out(name), width, height, { waitMs: opts.fonts ? 6000 : 1500 });
  return out(name);
}

/**
 * Monogram centred in a square tile. `margin` is the space around the mark as a fraction of the tile;
 * `radius` rounds the tile's corners (transparent outside), as a fraction of the tile.
 */
function tile(size, { bg, fg, margin, radius = 0 }) {
  const box = squareBox(0).join(" ");
  const h = Math.round(size * (1 - margin * 2));
  const r = Math.round(size * radius);
  return [
    `<div style="width:${size}px;height:${size}px;border-radius:${r}px;background:${bg};display:grid;place-items:center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" width="${h}" height="${h}">${strokes(fg)}</svg></div>`,
    {},
  ];
}

const caspianTile = (size, margin = 0.17, radius = 0) => tile(size, { bg: COLORS.caspian, fg: COLORS.brassLight, margin, radius });

render("src/app/apple-icon.png", 180, 180, ...caspianTile(180));
render("public/brand/icon-192.png", 192, 192, ...caspianTile(192));
render("public/brand/icon-512.png", 512, 512, ...caspianTile(512));
render("public/brand/icon-maskable-512.png", 512, 512, ...caspianTile(512, 0.26));
render("public/brand/bb-monogram-1024.png", 1024, 1024, ...tile(1024, { bg: "transparent", fg: COLORS.ink, margin: 0.08 }));
render("public/brand/bb-monogram-brass-on-caspian-1024.png", 1024, 1024, ...caspianTile(1024, 0.16));
render("public/brand/bb-seal-1200.png", 1200, 1200, sealSvg({ embedFont: false }).replace("<svg ", '<svg width="1200" height="1200" '), {
  fonts: true,
});

// favicon.ico: RGBA PNG images inside an ICO container (supported by every current browser).
// The rounded, transparent corners also make the PNGs carry an alpha channel, which ICO decoders expect.
const icoSizes = [16, 32, 48];
const pngs = icoSizes.map((size) => {
  const file = render(`public/brand/favicon-${size}.png`, size, size, ...caspianTile(size, 0.1, 0.18));
  return { size, buf: readFileSync(file) };
});
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map(({ size, buf }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
writeFileSync(out("src/app/favicon.ico"), Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]));

// Link preview, 1200 × 630
const og = `
<style>
.og{position:relative;width:1200px;height:630px;background:${COLORS.caspian};color:${COLORS.mist};font-family:'Schibsted Grotesk',Arial,sans-serif}
.copy{position:absolute;left:76px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center}
.eyebrow{margin:0;font:400 17px/1.3 'Martian Mono',monospace;font-stretch:87.5%;letter-spacing:.09em;text-transform:uppercase;color:${COLORS.mist3}}
h1{margin:22px 0 0;font:500 116px/.9 'Brygada 1918',Georgia,serif;letter-spacing:-.028em;display:flex;flex-direction:column}
h1 b{font-weight:inherit;color:${COLORS.brassLight}}
.org{margin:28px 0 0;font-size:27px;color:#B1C1BE}
.url{margin:34px 0 0;font:400 17px 'Martian Mono',monospace;font-stretch:87.5%;letter-spacing:.04em;color:${COLORS.brassLight}}
.seal{position:absolute;right:-36px;top:35px;width:560px;height:560px}
.ripple{position:absolute;right:-356px;top:-285px;width:1200px;height:1200px;border-radius:50%;border:1px solid #273D43}
.ripple.two{right:-196px;top:-125px;width:880px;height:880px}
</style>
<div class="og">
  <div class="ripple"></div><div class="ripple two"></div>
  <div class="copy">
    <p class="eyebrow">Director · Research, Development &amp; Reputation</p>
    <h1><span><b>B</b>akhtiyar</span><span><b>B</b>adalov</span></h1>
    <p class="org">Azerbaijan Technical University · Baku</p>
    <p class="url">bakhtiyarbadalov.com</p>
  </div>
  <div class="seal">${sealSvg({ dark: true, embedFont: false }).replace("<svg ", '<svg width="560" height="560" ')}</div>
</div>`;
render("src/app/opengraph-image.png", 1200, 630, og, { fonts: true, background: COLORS.caspian });
writeFileSync(out("src/app/twitter-image.png"), readFileSync(out("src/app/opengraph-image.png")));
const alt = "Bakhtiyar Badalov, Director of Research, Development & Reputation at Azerbaijan Technical University, beside his BB monogram seal.";
writeFileSync(out("src/app/opengraph-image.alt.txt"), alt);
writeFileSync(out("src/app/twitter-image.alt.txt"), alt);

rmSync(tmp, { recursive: true, force: true });
console.log(`Brand files written (${Object.keys(vector).length} SVG, ${9 + icoSizes.length} PNG, favicon.ico). Mark stroke ${mark.stroke}.`);

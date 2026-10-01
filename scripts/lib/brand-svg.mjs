// Standalone SVG builders for exported brand files. The live site draws the same
// shapes in src/components/brand (Monogram.tsx, Seal.tsx) from the same monogram.json.

import { readFileSync } from "node:fs";
import { geoAzimuthalEquidistant } from "d3-geo";

const root = new URL("../../", import.meta.url);
export const mark = JSON.parse(readFileSync(new URL("src/components/brand/monogram.json", root), "utf8"));
const { origin, places } = JSON.parse(readFileSync(new URL("src/content/places.json", root), "utf8"));

export const COLORS = {
  ink: "#0F2328",
  ink2: "#3E5357",
  ink3: "#52676A",
  paper: "#EDF1EF",
  paper2: "#E1E8E5",
  card: "#F8FAF9",
  brass: "#B48D3A",
  brassLight: "#DDB566",
  caspian: "#0B181C",
  caspian2: "#102127",
  caspianCard: "#132A30",
  mist: "#E6EDEA",
  mist3: "#8DA19E",
};

const r2 = (n) => Math.round(n * 100) / 100;
const polar = (deg, r) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(Math.cos(a) * r), r2(Math.sin(a) * r)];
};

export function strokes(color) {
  return `<g fill="none" stroke="${color}" stroke-width="${mark.stroke}" stroke-linejoin="miter" stroke-miterlimit="4"><path d="${mark.b1}"/><path d="${mark.b2}"/></g>`;
}

/** The monogram alone, tight portrait box. */
export function monogramSvg(color, { title = "BB monogram of Bakhtiyar Badalov" } = {}) {
  const [, , w, h] = mark.viewBox.split(" ").map(Number);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}" width="${w}" height="${h}" role="img"><title>${title}</title>${strokes(color)}</svg>\n`;
}

/** Square box around the monogram with a margin (fraction of the mark height). */
export function squareBox(margin = 0.12) {
  const [x, y, w, h] = mark.viewBox.split(" ").map(Number);
  const side = h * (1 + margin * 2);
  return [r2(x + w / 2 - side / 2), r2(y + h / 2 - side / 2), r2(side), r2(side)];
}

/** Favicon: adapts to light and dark browser chrome. */
export function faviconSvg() {
  const box = squareBox(0.06).join(" ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}"><style>g{stroke:${COLORS.ink}}@media (prefers-color-scheme:dark){g{stroke:${COLORS.brassLight}}}</style><g fill="none" stroke-width="${mark.stroke + 1}" stroke-linejoin="miter" stroke-miterlimit="4"><path d="${mark.b1}"/><path d="${mark.b2}"/></g></svg>\n`;
}

/** Bearings from Baku, as unit vectors in screen space (y down). */
export function bearings() {
  const proj = geoAzimuthalEquidistant().rotate([-origin.lon, -origin.lat]).scale(100).translate([0, 0]);
  return places.map((p) => {
    const [x, y] = proj([p.lon, p.lat]);
    const len = Math.hypot(x, y);
    return { id: p.id, kind: p.kind, ux: x / len, uy: y / len };
  });
}

/** The full seal, in fixed colours. `dark` swaps to the Caspian palette. */
export function sealSvg({ dark = false, embedFont = true } = {}) {
  const c = dark
    ? { disc: COLORS.caspianCard, line: COLORS.mist, tick: COLORS.mist3, text: "#B1C1BE", starFill: COLORS.caspian2, star: "#C9A04B", mark: COLORS.mist, aztu: "#C9A04B", study: COLORS.mist3 }
    : { disc: COLORS.card, line: COLORS.ink, tick: COLORS.ink3, text: COLORS.ink2, starFill: COLORS.paper2, star: COLORS.brass, mark: COLORS.ink, aztu: COLORS.brass, study: COLORS.ink3 };
  const RT = 258;
  let ticks = "";
  for (let deg = 0; deg < 360; deg += 5) {
    const major = deg % 45 === 0;
    const [x1, y1] = polar(deg, 236);
    const [x2, y2] = polar(deg, 236 - (major ? 14 : 7));
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${major ? c.line : c.tick}" stroke-width="${major ? 1.5 : 1}"/>`;
  }
  const bears = bearings()
    .sort((a, b) => Number(a.kind === "aztu") - Number(b.kind === "aztu"))
    .map(
      (b) =>
        `<line x1="${r2(b.ux * 232)}" y1="${r2(b.uy * 232)}" x2="${r2(b.ux * 202)}" y2="${r2(b.uy * 202)}" stroke="${b.kind === "aztu" ? c.aztu : c.study}" stroke-width="${b.kind === "aztu" ? 3 : 1.75}"/>`,
    )
    .join("");
  const a = 136;
  const v = r2(a * Math.SQRT2);
  const sq = `M${-a} ${-a}H${a}V${a}H${-a}Z`;
  const di = `M0 ${-v}L${v} 0L0 ${v}L${-v} 0Z`;
  const ring = "Research · Development · Reputation · Azerbaijan Technical University · Baku 40.41° N 49.87° E · ";
  const font = embedFont
    ? `<style>@import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@87.5,400&amp;display=swap');</style>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-300 -300 600 600" role="img"><title>BB seal of Bakhtiyar Badalov</title>${font}
<circle r="292" fill="${c.disc}" stroke="${c.line}" stroke-width="1.5"/><circle r="284" fill="none" stroke="${c.line}"/>
<defs><path id="ring" d="M0 ${-RT}A${RT} ${RT} 0 1 1 0 ${RT}A${RT} ${RT} 0 1 1 0 ${-RT}"/></defs>
<text dy="5" fill="${c.text}" font-family="'Martian Mono', ui-monospace, Menlo, monospace" font-size="14.5" font-stretch="87.5%" style="text-transform:uppercase"><textPath href="#ring" textLength="${r2(2 * Math.PI * RT - 8)}" lengthAdjust="spacing">${ring.toUpperCase()}</textPath></text>
<circle r="236" fill="none" stroke="${c.line}"/>${ticks}${bears}
<path d="${sq}${di}" fill="none" stroke="${c.star}" stroke-width="1.5"/><path d="${sq}" fill="${c.starFill}"/><path d="${di}" fill="${c.starFill}"/>
<g transform="scale(1.42) translate(${-mark.center.x} ${-mark.center.y})">${strokes(c.mark)}</g>
</svg>
`;
}

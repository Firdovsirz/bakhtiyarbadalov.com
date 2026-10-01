import { polar, round } from "./geometry";

function star(cx: number, cy: number, outer: number, inner: number) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = ((i * 36 - 90) * Math.PI) / 180;
    const r = i % 2 ? inner : outer;
    d += `${i ? "L" : "M"}${round(cx + Math.cos(a) * r)} ${round(cy + Math.sin(a) * r)}`;
  }
  return `${d}Z`;
}

const PATH = Array.from({ length: 12 }, (_, i) => {
  const [x, y] = polar(i * 30, 44);
  return star(x, y, 7.5, 3);
}).join("");

/** The ring of twelve stars, for the Jean Monnet (EU) feature. */
export function EuStars({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">
      <path d={PATH} fill="currentColor" />
    </svg>
  );
}

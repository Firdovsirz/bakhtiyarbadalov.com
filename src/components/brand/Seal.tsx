import places from "@/content/places.json";
import { projected } from "@/content/map-data";
import { B1, B2, MARK_CENTER, octagramPaths, polar, round } from "./geometry";
import s from "./Seal.module.css";

const RING_TEXT = "Research · Development · Reputation · Azerbaijan Technical University · Baku 40.41° N 49.87° E · ";
const R_OUTER = 292;
const R_TEXT = 258;
const R_INNER = 236;
const MARK_SCALE = 1.42;

/**
 * The BB seal: the monogram on an eight-pointed star, inside a compass ring.
 * The brass ticks point from Baku to each city in his record at true bearing.
 */
export function Seal({ title = "The BB monogram seal of Bakhtiyar Badalov" }: { title?: string }) {
  const ticks = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const major = deg % 45 === 0;
    const [x1, y1] = polar(deg, R_INNER);
    const [x2, y2] = polar(deg, R_INNER - (major ? 14 : 7));
    ticks.push(<line key={deg} className={major ? `${s.tick} ${s.major}` : s.tick} x1={x1} y1={y1} x2={x2} y2={y2} />);
  }

  // Study and training first, AzTU delegations drawn last so brass sits on top.
  const bearings = [...places.places]
    .sort((a, b) => Number(a.kind === "aztu") - Number(b.kind === "aztu"))
    .map((p, i) => {
      const { ux, uy } = projected[p.id];
      return (
        <line
          key={p.id}
          className={`${s.bear} ${p.kind === "aztu" ? s.aztu : s.study}`}
          x1={round(ux * 232)}
          y1={round(uy * 232)}
          x2={round(ux * 202)}
          y2={round(uy * 202)}
          style={{ animationDelay: `${(0.3 + i * 0.07).toFixed(2)}s` }}
        />
      );
    });

  const star = octagramPaths(136);
  const ringPath = `M0 ${-R_TEXT}A${R_TEXT} ${R_TEXT} 0 1 1 0 ${R_TEXT}A${R_TEXT} ${R_TEXT} 0 1 1 0 ${-R_TEXT}`;

  return (
    <svg className={s.seal} viewBox="-300 -300 600 600" role="img" aria-label={title}>
      {[330, 400, 490, 600, 740].map((r, i) => (
        <circle key={r} className={s.ripple} r={r} opacity={(0.85 - i * 0.15).toFixed(2)} />
      ))}
      <circle className={s.disc} r={R_OUTER} />
      <circle className={s.line} r={R_OUTER - 8} />
      <defs>
        <path id="seal-ring-path" d={ringPath} />
      </defs>
      <g className={s.rotate}>
        <text className={s.ringText} dy={5}>
          <textPath href="#seal-ring-path" textLength={round(2 * Math.PI * R_TEXT - 8)} lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </g>
      <circle className={s.line} r={R_INNER} />
      <g>{ticks}</g>
      <g className={s.bearings}>{bearings}</g>
      <path className={s.starOutline} d={star.square + star.diamond} />
      <path className={s.starFill} d={star.square} />
      <path className={s.starFill} d={star.diamond} />
      <g transform={`scale(${MARK_SCALE}) translate(${-MARK_CENTER.x} ${-MARK_CENTER.y})`}>
        <path className={s.mark} d={B1} />
        <path className={s.mark} d={B2} />
        <path className={s.trace} pathLength={1} d={B1} />
        <path className={s.trace} pathLength={1} d={B2} style={{ animationDelay: "1.1s" }} />
      </g>
    </svg>
  );
}

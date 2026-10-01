import places from "@/content/places.json";
import { MAP_RADIUS, MAP_SIZE, landPath, projected, rings } from "@/content/map-data";
import { round } from "@/components/brand/geometry";
import { SectionHead } from "./SectionHead";
import { MapInteractions } from "./MapInteractions";
import s from "./Reach.module.css";

const C = MAP_SIZE / 2;
const km = (n: number) => `${n.toLocaleString("en-US")} km`;

/** Cities that get a direct label; the rest are named on hover and in the list. */
const LABELS: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  depok: { dx: 0, dy: 20, anchor: "middle" },
  lahore: { dx: 0, dy: 20, anchor: "middle" },
  milan: { dx: 0, dy: -11, anchor: "middle" },
  lund: { dx: -8, dy: -7, anchor: "end" },
  valencia: { dx: 0, dy: 19, anchor: "middle" },
  ankara: { dx: 4, dy: 19, anchor: "middle" },
};

export function Reach() {
  const all = places.places;
  // Draw study cities first so AzTU delegations sit on top.
  const drawOrder = [...all].sort((a, b) => Number(a.kind === "aztu") - Number(b.kind === "aztu"));
  const aztu = all.filter((p) => p.kind === "aztu");
  const study = all.filter((p) => p.kind !== "aztu");
  const star = 7;
  const sv = round(star * Math.SQRT2);

  return (
    <section className="sec band" id="reach" aria-labelledby="reach-h">
      <div className="wrap">
        <SectionHead id="reach-h" eyebrow="Reach" title="From Baku, outward">
          <p>
            The places his work has taken him, on a map centred on Baku. On this projection every straight line from the centre is
            the shortest route, and each ring marks another 2,000 km.
          </p>
        </SectionHead>
        <div className={s.reach} id="reach-map" data-focus-class={s.focus} data-on-class={s.on}>
          <div className={s.map}>
            <svg viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`} role="img" aria-labelledby="map-t map-d">
              <title id="map-t">Map centred on Baku</title>
              <desc id="map-d">
                Azimuthal equidistant projection centred on Baku, with rings at 2,000, 4,000, 6,000 and 8,000 km. Lines run from Baku
                to eleven cities: three AzTU delegation destinations and eight places of study, teaching and training, listed beside
                the map.
              </desc>
              <defs>
                <clipPath id="map-disk">
                  <circle cx={C} cy={C} r={MAP_RADIUS} />
                </clipPath>
              </defs>
              <circle className={s.sea} cx={C} cy={C} r={MAP_RADIUS} />
              <path className={s.land} clipPath="url(#map-disk)" d={landPath} />
              {rings.map((r) => (
                <g key={r.km}>
                  <circle className={s.ring} cx={C} cy={C} r={r.r} />
                  <text className={s.ringLabel} x={round(C + 0.7071 * r.r + 4)} y={round(C - 0.7071 * r.r - 4)}>
                    {km(r.km)}
                  </text>
                </g>
              ))}
              {drawOrder.map((p) => {
                const pt = projected[p.id];
                return (
                  <g key={p.id} className={`${s.city} ${p.kind === "aztu" ? s.aztu : s.study}`} data-id={p.id}>
                    <line className={s.ray} x1={C} y1={C} x2={pt.x} y2={pt.y} />
                    <circle className={s.dot} cx={pt.x} cy={pt.y} r={p.kind === "aztu" ? 5.5 : 4.5} />
                    <circle className={s.hit} cx={pt.x} cy={pt.y} r={11} />
                  </g>
                );
              })}
              <path
                className={s.baku}
                d={`M${C - star} ${C - star}H${C + star}V${C + star}H${C - star}ZM${C} ${C - sv}L${C + sv} ${C}L${C} ${C + sv}L${C - sv} ${C}Z`}
              />
              <text className={s.bakuLabel} x={C + 12} y={C + 22}>
                Baku
              </text>
              {Object.entries(LABELS).map(([id, l]) => {
                const pt = projected[id];
                const place = all.find((p) => p.id === id);
                return (
                  <text key={id} className={s.label} x={round(pt.x + l.dx)} y={round(pt.y + l.dy)} textAnchor={l.anchor}>
                    {place?.city}
                  </text>
                );
              })}
            </svg>
            <div className={s.tip} data-map-tip hidden />
          </div>
          <div className={s.places}>
            <PlaceGroup title="AzTU delegations, 2025–2026" kind="aztu" items={aztu} />
            <PlaceGroup title="Study, teaching and training, 2010–2018" kind="study" items={study} />
          </div>
        </div>
        <MapInteractions rootId="reach-map" />
      </div>
    </section>
  );
}

type Place = (typeof places.places)[number];

function PlaceGroup({ title, kind, items }: { title: string; kind: "aztu" | "study"; items: Place[] }) {
  return (
    <>
      <h3 className={s.groupTitle}>
        <span className={`${s.swatch} ${kind === "aztu" ? s.swAztu : s.swStudy}`} aria-hidden="true" />
        {title}
      </h3>
      <ul className={s.list}>
        {items.map((p) => (
          <li key={p.id} className={s.place} tabIndex={0} data-id={p.id}>
            <b>{p.institution}</b>
            <span className={s.km}>
              {p.city} · {km(projected[p.id].km)}
            </span>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

import { Monogram } from "@/components/brand/Monogram";
import { ConstructionFigure } from "./ConstructionFigure";
import s from "./Colophon.module.css";

const SWATCHES = [
  { cls: s.light, label: "Ink on limestone", height: 72 },
  { cls: s.deep, label: "Brass on Caspian", height: 72 },
  { cls: s.brass, label: "Caspian on brass", height: 72 },
  { cls: s.light, label: "24 px", height: 24 },
  { cls: s.light, label: "16 px", height: 16 },
];

export function Colophon() {
  return (
    <section className="sec" id="monogram" aria-labelledby="mono-h">
      <div className={`wrap ${s.colophon}`}>
        <ConstructionFigure />
        <div>
          <p className="eyebrow">Colophon</p>
          <h2 id="mono-h" className={s.title}>
            The monogram
          </h2>
          <div className={s.body}>
            <p>
              Two B&apos;s, for Bakhtiyar and Badalov, locked together like links in a chain. Each letter passes over the other twice
              and under it twice, and the second B stands one step higher than the first.
            </p>
            <p>
              Every corner is cut at 45°, the angle of the eight-pointed star that runs through Azerbaijani ornament, from carpets to
              the stonework of Baku&apos;s old city.
            </p>
            <p>
              <a className="lnk" href="/brand/bb-monogram.svg" download>
                Download the monogram (SVG)
              </a>
            </p>
          </div>
          <div className={s.sizes}>
            {SWATCHES.map((sw) => (
              <figure key={sw.label}>
                <div className={`${s.chip} ${sw.cls}`}>
                  <Monogram height={sw.height} />
                </div>
                <figcaption>{sw.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

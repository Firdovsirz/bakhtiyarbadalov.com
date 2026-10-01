import { EuStars } from "@/components/brand/EuStars";
import { grants, jeanMonnet, rankings } from "@/content/profile";
import { SectionHead } from "./SectionHead";
import s from "./Achievements.module.css";

/** QS bands from 951–1000 (left) to 701–750 (right); AzTU sat in 851–900, then 801–850. */
const BANDS = ["951–1000", "901–950", "851–900", "801–850", "751–800", "701–750"];

function BandLadder() {
  return (
    <svg className={s.ladder} viewBox="0 0 300 58" role="img" aria-label="QS rank bands from 951–1000 to 701–750. 2026: 851–900. 2027: 801–850.">
      {BANDS.map((band, i) => {
        const cls = band === "851–900" ? s.was : band === "801–850" ? s.is : s.cell;
        const label = band === "851–900" ? `QS 2026: ${band}` : band === "801–850" ? `QS 2027: ${band}` : band;
        return (
          <rect key={band} className={cls} x={i * 50} y={20} width={i === 5 ? 50 : 48} height={16}>
            <title>{label}</title>
          </rect>
        );
      })}
      <text x={124} y={13} textAnchor="middle">
        2026
      </text>
      <text className={s.on} x={174} y={13} textAnchor="middle">
        2027
      </text>
      <text x={0} y={52}>
        1,000
      </text>
      <text x={150} y={52} textAnchor="middle">
        Rank band →
      </text>
      <text x={300} y={52} textAnchor="end">
        700
      </text>
    </svg>
  );
}

export function Achievements() {
  return (
    <section className="sec" id="achievements" aria-labelledby="ach-h">
      <div className="wrap">
        <SectionHead id="ach-h" eyebrow="Recognition" title="Achievements and grants">
          <p>An EU teaching award, competitive mobility grants, professional certification, and the ranking results of the university he now serves.</p>
        </SectionHead>

        <article className={s.feature}>
          <EuStars className={s.eu} />
          <div>
            <p className={`eyebrow ${s.featureEyebrow}`}>{jeanMonnet.eyebrow}</p>
            <h3>{jeanMonnet.title}</h3>
            <p className={s.featureBody}>{jeanMonnet.body}</p>
            <p className={s.featureNote}>{jeanMonnet.note}</p>
          </div>
        </article>

        <div className={s.tiles}>
          {rankings.map((r) => (
            <article key={r.label} className={s.tile}>
              <p className="eyebrow">{r.label}</p>
              <p className={s.value}>
                {r.value}
                {r.suffix ? <small>{r.suffix}</small> : null}
              </p>
              <p className={s.note}>{r.note}</p>
              {r.ladder ? <BandLadder /> : null}
            </article>
          ))}
        </div>
        <p className="fine">Ranking results are for Azerbaijan Technical University, as published by QS.</p>

        <div className={s.grants}>
          <div>
            <h3>Grants and certification</h3>
            <p className="fine">Awarded to him personally, 2017–2022.</p>
          </div>
          <ul className="ledger">
            {grants.map((g) => (
              <li key={g.year + g.lead}>
                <span className="y">{g.year}</span>
                <p>
                  <strong>{g.lead}</strong>
                  {g.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

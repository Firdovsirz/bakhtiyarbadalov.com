import { education, languages, training } from "@/content/profile";
import { SectionHead } from "./SectionHead";
import s from "./Education.module.css";

export function Education() {
  return (
    <section className="sec band" id="education" aria-labelledby="edu-h">
      <div className="wrap">
        <SectionHead id="edu-h" eyebrow="Education · Baku, Lund, Baku" title="Education">
          <p>
            Trained in international relations in Baku and in European political science at Lund University in Sweden, followed by
            doctoral research at Baku State University.
          </p>
        </SectionHead>
        <div className={s.degrees}>
          {education.map((d) => (
            <article key={d.institution} className={s.degree}>
              <p className={s.years}>{d.period}</p>
              <h3>
                {d.degree}, {d.field}
              </h3>
              <p className={s.institution}>{d.institution}</p>
              <p className={s.location}>{d.place}</p>
              <p className={s.note}>{d.note}</p>
            </article>
          ))}
        </div>
        <div className={s.after}>
          <div>
            <h3 className={s.subhead}>Professional training</h3>
            <ul className="ledger">
              {training.map((t) => (
                <li key={t.year + t.lead}>
                  <span className="y">{t.year}</span>
                  <p>
                    <strong>{t.lead}</strong>
                    {t.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.subhead}>Languages</h3>
            <ul className={s.languages}>
              {languages.map((l) => (
                <li key={l.name}>
                  {l.name} <span>{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

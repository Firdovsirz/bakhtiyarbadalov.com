import { about, mandate } from "@/content/profile";
import { SectionHead } from "./SectionHead";
import s from "./About.module.css";

export function About() {
  return (
    <section className="sec band" id="about" aria-labelledby="about-h">
      <div className="wrap">
        <SectionHead id="about-h" eyebrow="About" title="Research, development and reputation">
          {about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </SectionHead>
        <div className={s.mandate}>
          {mandate.map((m) => (
            <article key={m.word}>
              <h3 className={s.word}>{m.word}</h3>
              <p className={s.lead}>{m.lead}</p>
              <p className={s.text}>{m.text}</p>
              <ul className={`dia ${s.points}`}>
                {m.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

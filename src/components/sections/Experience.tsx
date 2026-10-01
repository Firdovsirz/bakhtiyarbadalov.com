import { experience } from "@/content/profile";
import { SectionHead } from "./SectionHead";
import s from "./Experience.module.css";

export function Experience() {
  return (
    <section className="sec" id="experience" aria-labelledby="exp-h">
      <div className="wrap">
        <SectionHead id="exp-h" eyebrow="Career · 2007 to now" title="Experience">
          <p>
            From an internship at the Ministry of Foreign Affairs in 2008 to leading research, development and reputation at one of
            Azerbaijan&apos;s main engineering universities.
          </p>
        </SectionHead>
        <ol className={s.timeline}>
          {experience.map((role) => (
            <li key={role.org}>
              <div className={s.when}>
                {role.webPeriod ?? role.period}
                {role.current ? <span className={s.now}>Now</span> : null}
              </div>
              <div className={s.body}>
                <h3 className={s.org}>{role.org}</h3>
                {role.title ? <p className={s.role}>{role.title}</p> : null}
                {role.points.length ? (
                  <ul className={`dia ${s.points}`}>
                    {role.points.map((pt) => (
                      <li key={pt.text}>
                        {pt.lead ? <strong>{pt.lead}</strong> : null}
                        {pt.text}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {role.courses ? (
                  <ul className="chips" aria-label="Courses taught">
                    {role.courses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

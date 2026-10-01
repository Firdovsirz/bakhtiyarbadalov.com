import { Monogram } from "@/components/brand/Monogram";
import { cvProfile, education, experience, grants, interests, languages, site, training } from "@/content/profile";
import { citeName, publications, sentenceCase } from "@/content/publications";
import s from "./CvDocument.module.css";

/** The CV as a document. Rendered on /cv and printed to public/Bakhtiyar-Badalov-CV.pdf. */
export function CvDocument() {
  return (
    <article className={s.doc}>
      <header className={s.head}>
        <div className={s.id}>
          <Monogram className={s.mark} />
          <div>
            <h1 className={s.name}>{site.name}</h1>
            <p className={s.role}>
              {site.role}
              <br />
              {site.org}, {site.city}
            </p>
          </div>
        </div>
        <ul className={s.contact}>
          <li>
            {site.city}, {site.country}
          </li>
          <li>
            <a href={site.links.linkedin}>linkedin.com/in/{site.links.linkedinLabel}</a>
          </li>
          <li>
            <a href={site.links.scholar}>Google Scholar: {site.name}</a>
          </li>
          <li>
            <a href={site.url}>{site.url.replace("https://", "")}</a>
          </li>
        </ul>
      </header>

      <Section title="Profile">
        <p className={s.profile}>{cvProfile}</p>
      </Section>

      <Section title="Experience">
        {experience.map((r) => {
          const bullets = r.points.map((p) => (p.lead ?? "") + p.text);
          if (r.courses) bullets.push(`Courses: ${r.courses.join("; ")}.`);
          return (
            <Row key={r.org} when={r.period}>
              <p>
                <strong>{r.title ?? r.org}</strong>
                {r.title ? (
                  <>
                    <br />
                    {r.org}
                    {r.place ? `, ${r.place}` : ""}
                  </>
                ) : null}
              </p>
              {bullets.length ? (
                <ul>
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </Row>
          );
        })}
      </Section>

      <Section title="Education">
        {education.map((d) => (
          <Row key={d.institution} when={d.period}>
            <p>
              <strong>
                {d.degree}, {d.field}
              </strong>
              <br />
              {d.institution}, {d.place.replace(", Azerbaijan", "")}.{d.cvNote ? ` ${d.cvNote}` : ""}
            </p>
          </Row>
        ))}
      </Section>

      <Section title="Awards, grants and certification">
        {grants.map((g) => (
          <Row key={g.year + g.lead} when={g.year}>
            <p>
              <strong>{g.lead}</strong>
              {g.cvText ?? g.text}
            </p>
          </Row>
        ))}
      </Section>

      <Section title="Professional training">
        {training
          .filter((t) => t.onCv !== false)
          .map((t) => (
            <Row key={t.year + t.lead} when={t.year}>
              <p>
                {t.lead}
                {t.text}
              </p>
            </Row>
          ))}
      </Section>

      <Section title="Publications">
        <ol className={s.pubs}>
          {publications.map((p) => (
            <li key={p.title}>
              <span className={s.when}>{p.year}</span>
              <p>
                {p.authors.map((a, i) => (
                  <span key={a.family}>
                    {i ? ", " : ""}
                    {a.self ? <b>{citeName(a)}</b> : citeName(a)}
                  </span>
                ))}
                . {sentenceCase(p.title)}
                {/[?!.]$/.test(p.title) ? "" : "."}
                {p.venue ? (
                  <>
                    {" "}
                    <i>{p.venue}</i>.
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Languages">
        <p>{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ")}</p>
      </Section>

      <Section title="Research interests">
        <p>{interests.join(" · ")}</p>
      </Section>

      <p className={s.foot}>
        Curriculum vitae · {site.name} · Updated {site.cvUpdated}
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={s.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Row({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <div className={s.row}>
      <p className={s.when}>{when}</p>
      <div className={s.what}>{children}</div>
    </div>
  );
}

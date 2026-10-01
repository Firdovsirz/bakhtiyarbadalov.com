import Link from "next/link";
import { DownloadIcon } from "@/components/ui/icons";
import { site } from "@/content/profile";
import s from "./Contact.module.css";

const ROWS = [
  { k: "LinkedIn", v: site.links.linkedinLabel, href: site.links.linkedin },
  { k: "Google Scholar", v: site.name, href: site.links.scholar },
  { k: "University", v: site.org, href: site.links.aztu },
  { k: "Office", v: site.office },
];

export function Contact() {
  return (
    <section className="sec band" id="contact" aria-labelledby="contact-h">
      <div className={`wrap ${s.contact}`}>
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-h" className={s.title}>
            Get in touch
          </h2>
          <p className={s.intro}>
            For research partnerships, rankings questions or speaking invitations, reach him through LinkedIn or at the university.
          </p>
          <div className={s.cv}>
            <Link className="btn btn-ink" href="/cv">
              Read the CV
            </Link>
            <a className="btn btn-soft" href={site.cvPdf} download>
              <DownloadIcon />
              Download CV (PDF)
            </a>
          </div>
        </div>
        <ul className={s.list}>
          {ROWS.map((r) => (
            <li key={r.k}>
              {r.href ? (
                <a className={s.row} href={r.href} target="_blank" rel="noopener noreferrer">
                  <span className={s.k}>{r.k}</span>
                  <span className={s.v}>{r.v}</span>
                  <span className={s.go} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : (
                <div className={s.row}>
                  <span className={s.k}>{r.k}</span>
                  <span className={s.v}>{r.v}</span>
                  <span />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

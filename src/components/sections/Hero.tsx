import Link from "next/link";
import { Seal } from "@/components/brand/Seal";
import { DownloadIcon } from "@/components/ui/icons";
import { lede, record, site } from "@/content/profile";
import s from "./Hero.module.css";

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-name">
      <div className="wrap">
        <div className={s.grid}>
          <div className={s.copy}>
            <p className="eyebrow">{site.shortRole}</p>
            <h1 className={s.name} id="hero-name">
              <span>
                <b>B</b>akhtiyar
              </span>
              <span>
                <b>B</b>adalov
              </span>
            </h1>
            <p className={s.native}>
              <span lang="az">{site.nativeName}</span>
              <span>
                {site.org}, {site.city}
              </span>
            </p>
            <p className={s.lede}>{lede}</p>
            <div className={s.cta}>
              <Link className="btn btn-ink" href="/cv">
                Read the CV
              </Link>
              <a className="btn btn-soft" href={site.cvPdf} download>
                <DownloadIcon />
                Download CV (PDF)
              </a>
              <a className="lnk" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>
          <figure className={s.seal}>
            <Seal />
            <figcaption>The BB seal. Its brass ticks point from Baku to the eleven cities in his record, at true compass bearing.</figcaption>
          </figure>
        </div>
        <ul className={s.record} aria-label="At a glance">
          {record.map((item) => (
            <li key={item.value}>
              <p className={s.recValue}>{item.value}</p>
              <p className={s.recLabel}>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

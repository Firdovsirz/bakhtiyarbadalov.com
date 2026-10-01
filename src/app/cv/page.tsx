import type { Metadata } from "next";
import Link from "next/link";
import { CvDocument } from "@/components/cv/CvDocument";
import { PrintButton } from "@/components/cv/PrintButton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DownloadIcon } from "@/components/ui/icons";
import { site } from "@/content/profile";
import s from "./cv.module.css";

export const metadata: Metadata = {
  title: "Curriculum vitae",
  description: `Curriculum vitae of ${site.name}: experience, education, grants, training and publications.`,
  alternates: { canonical: "/cv" },
  openGraph: { url: "/cv", title: `Curriculum vitae · ${site.name}` },
};

export default function CvPage() {
  return (
    <>
      <SiteHeader current="cv" />
      <main id="main" className={s.main}>
        <div className={`wrap ${s.toolbar}`}>
          <div>
            <p className="eyebrow">Curriculum vitae · Updated {site.cvUpdated}</p>
            <Link className={s.back} href="/">
              ← Back to the website
            </Link>
          </div>
          <div className={s.actions}>
            <a className="btn btn-ink btn-sm" href={site.cvPdf} download>
              <DownloadIcon />
              Download PDF
            </a>
            <PrintButton />
          </div>
        </div>
        <div className={s.sheet}>
          <CvDocument />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

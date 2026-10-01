import Link from "next/link";
import { Monogram } from "@/components/brand/Monogram";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="sec">
        <div className="wrap" style={{ display: "grid", gap: 20, justifyItems: "start", maxWidth: 720 }}>
          <Monogram height={96} style={{ color: "var(--brass-2)" }} />
          <p className="eyebrow">Error 404</p>
          <h1 style={{ fontSize: "var(--t-2xl)" }}>This page doesn&apos;t exist</h1>
          <p style={{ color: "var(--ink-2)" }}>The link may be old, or the address may have a typo. Everything on the site starts from the home page.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-ink" href="/">
              Go to the home page
            </Link>
            <Link className="btn btn-soft" href="/cv">
              Read the CV
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

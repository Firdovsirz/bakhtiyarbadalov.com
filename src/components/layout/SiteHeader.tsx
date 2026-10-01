import Link from "next/link";
import { Monogram } from "@/components/brand/Monogram";
import { site } from "@/content/profile";
import s from "./SiteHeader.module.css";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#reach", label: "Reach" },
  { href: "/#publications", label: "Publications" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ current }: { current?: "cv" }) {
  return (
    <header className={s.bar}>
      <div className={`wrap ${s.inner}`}>
        <Link className={s.brand} href="/" aria-label={`${site.name}, home`}>
          <Monogram className={s.mark} />
          <span>{site.name}</span>
        </Link>
        <nav className={s.links} aria-label="Sections">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className={`btn btn-ink btn-sm ${s.cv}`} href="/cv" aria-current={current === "cv" ? "page" : undefined}>
          CV
        </Link>
      </div>
    </header>
  );
}

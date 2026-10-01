import { site } from "@/content/profile";
import s from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.inner}`}>
        <span>
          © {new Date().getFullYear()} {site.name} · {site.city}
        </span>
        <span>Set in Brygada 1918, Schibsted Grotesk and Martian Mono</span>
      </div>
    </footer>
  );
}

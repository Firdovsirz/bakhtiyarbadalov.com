import { site } from "@/content/profile";
import { PublicationList } from "./Publications";
import { SectionHead } from "./SectionHead";

export function PublicationsSection() {
  return (
    <section className="sec" id="publications" aria-labelledby="pub-h">
      <div className="wrap">
        <SectionHead id="pub-h" eyebrow="Research · 2009 to 2025" title="Publications">
          <p>
            Early work on EU–Russia energy relations and Caspian energy security; recent work on AI in engineering education,
            sustainability and economic growth.{" "}
            <a className="lnk" href={site.links.scholar} target="_blank" rel="noopener noreferrer">
              Google Scholar profile ↗
            </a>
          </p>
        </SectionHead>
        <PublicationList />
      </div>
    </section>
  );
}

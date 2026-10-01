import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Colophon } from "@/components/sections/Colophon";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { Reach } from "@/components/sections/Reach";
import { languages, site } from "@/content/profile";

const LANG_CODES: Record<string, string> = { Azerbaijani: "az", English: "en", Turkish: "tr", Swedish: "sv", Russian: "ru", German: "de" };

/** schema.org Person, so search engines connect the site, LinkedIn and Google Scholar. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.nativeName,
  url: site.url,
  jobTitle: site.role,
  worksFor: { "@type": "CollegeOrUniversity", name: site.org, url: site.links.aztu },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Lund University" },
    { "@type": "CollegeOrUniversity", name: "Qafqaz University" },
  ],
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "AZ" },
  knowsLanguage: languages.map((l) => LANG_CODES[l.name]).filter(Boolean),
  knowsAbout: ["International relations", "EU politics", "Energy security", "University rankings", "Research development", "AI in education"],
  award: "Jean Monnet Module (Erasmus+), European Commission, 2022",
  sameAs: [site.links.linkedin, site.links.scholar],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Achievements />
        <Reach />
        <PublicationsSection />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

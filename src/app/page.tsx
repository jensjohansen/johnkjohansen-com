import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FocusAreas } from "@/components/sections/FocusAreas";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John K Johansen",
    image: "https://johnkjohansen.com/logo-icon.png",
    "@id": "https://johnkjohansen.com",
    url: "https://johnkjohansen.com",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pasadena",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.1478,
      longitude: -118.1445,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.linkedin.com/in/johnkjohansen/",
      "https://github.com/jensjohansen",
    ],
    description:
      "Software engineering executive, AI agent builder, and open-source contributor. Building AI systems that let small teams do big things.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <FocusAreas />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

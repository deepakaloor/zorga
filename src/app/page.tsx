import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { Approach } from "@/components/Approach";
import { TheQuestion } from "@/components/TheQuestion";
import { Crawl } from "@/components/Crawl";
import { EditorialImage } from "@/components/EditorialImage";
import { ConceptSpreads } from "@/components/ConceptSpreads";
import { HowWeWork } from "@/components/HowWeWork";
import { Audience } from "@/components/Audience";
import { Closing } from "@/components/Closing";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { isDeliveryConfigured } from "@/lib/contact-delivery";

export default function Home() {
  const contactEnabled = isDeliveryConfigured();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 t-label">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Statement />
        <Approach />
        <EditorialImage />
        <TheQuestion />
        <Crawl />
        <ConceptSpreads />
        <HowWeWork />
        <Audience />
        <Closing />
        <ContactForm enabled={contactEnabled} />
      </main>
      <Footer />
      <JsonLd />
    </>
  );
}

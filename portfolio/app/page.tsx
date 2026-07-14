"use client";

import LiquidNavbar from "@/components/v2/LiquidNavbar";
import HeroCinematic from "@/components/v2/hero/HeroCinematic";
import AboutScrapbook from "@/components/v2/about/AboutScrapbook";
import ProjectsShowcase from "@/components/v2/projects/ProjectsShowcase";
import SkillsSection from "@/components/v2/skills/SkillsSection";
import ExperienceSection from "@/components/v2/experience/ExperienceSection";
import CertificatesSection from "@/components/v2/certificates/CertificatesSection";
import CertificatesSectionBento from "@/components/v2/certificates/CertificatesSectionBento";
import CertificatesSectionCarousel from "@/components/v2/certificates/CertificatesSectionCarousel";
import CertificatesSectionTimeline from "@/components/v2/certificates/CertificatesSectionTimeline";
import CertificatesSectionMinimal from "@/components/v2/certificates/CertificatesSectionMinimal";
import CertificatesSectionCanvas from "@/components/v2/certificates/CertificatesSectionCanvas";
import CertificatesSectionBlank from "@/components/v2/certificates/CertificatesSectionBlank";
import CertificatesSectionAccordion from "@/components/v2/certificates/CertificatesSectionAccordion";
import CertificatesSectionIsometric from "@/components/v2/certificates/CertificatesSectionIsometric";
import CertificatesSectionDeck from "@/components/v2/certificates/CertificatesSectionDeck";
import CertificatesSectionTree from "@/components/v2/certificates/CertificatesSectionTree";
import CertificatesSectionMarquee from "@/components/v2/certificates/CertificatesSectionMarquee";
import CertificatesSectionExplorer from "@/components/v2/certificates/CertificatesSectionExplorer";
import CertificatesSectionStreaming from "@/components/v2/certificates/CertificatesSectionStreaming";
import CertificatesSectionDashboard from "@/components/v2/certificates/CertificatesSectionDashboard";
import CertificatesSectionGlass from "@/components/v2/certificates/CertificatesSectionGlass";
import CertificatesSectionBlueprint from "@/components/v2/certificates/CertificatesSectionBlueprint";
import CertificatesSectionEditorial from "@/components/v2/certificates/CertificatesSectionEditorial";
import ContactSectionBento from "@/components/v2/contact/ContactSectionBento";
import ContactSectionBrutalism from "@/components/v2/contact/ContactSectionBrutalism";
import ContactSectionMagnetic from "@/components/v2/contact/ContactSectionMagnetic";
import ContactSectionArcade from "@/components/v2/contact/ContactSectionArcade";
import ContactSectionTypewriter from "@/components/v2/contact/ContactSectionTypewriter";
import ContactSectionMarquee from "@/components/v2/contact/ContactSectionMarquee";
import ContactSectionForm from "@/components/v2/contact/ContactSectionForm";
import ContactSectionExpanding from "@/components/v2/contact/ContactSectionExpanding";
import ContactSection3DCards from "@/components/v2/contact/ContactSection3DCards";
import ContactSectionMinimalist from "@/components/v2/contact/ContactSectionMinimalist";

export default function Home() {
  return (
    <main className="min-h-[200vh] bg-[#0A0A0A] text-gray-900 selection:bg-[#D4AF37]/30 overflow-hidden">
      <LiquidNavbar />
      
      <HeroCinematic />

      <AboutScrapbook />

      <ProjectsShowcase />

      <SkillsSection />

      <ExperienceSection />

      {/* Opsi 1: Desain Original (Scrapbook/Pin) */}
      {/* <CertificatesSection /> */}

      {/* Opsi 2: Desain Bento Grid Modern */}
      {/* <CertificatesSectionBento /> */}

      {/* Opsi 3: Desain Carousel Gelap (Premium & Smooth) */}
      {/* <CertificatesSectionCarousel /> */}

      {/* Opsi 4: Desain Timeline (Journey of Expertise) */}
      {/* <CertificatesSectionTimeline /> */}

      {/* Opsi 5: Desain Minimalis/Brutalist (Clean & Text-heavy) */}
      {/* <CertificatesSectionMinimal /> */}

      {/* Opsi 6: Desain Kanvas Interaktif */}
      {/* <CertificatesSectionCanvas /> */}

      {/* Opsi 7: Horizontal Parallax Scroll (Cinematic) */}
      {/* <CertificatesSectionBlank /> */}

      {/* Opsi 8: Minimalist Accordion List */}
      {/* <CertificatesSectionAccordion /> */}

      {/* Opsi 9: Isometric Desk Canvas */}
      {/* <CertificatesSectionIsometric /> */}

      {/* Opsi 10: Stacked Deck (Swipe / Flashcard Style) */}
      {/* <CertificatesSectionDeck /> */}

      {/* Opsi 11: Skill Tree (Gamification Node) */}
      {/* <CertificatesSectionTree /> */}

      {/* Opsi 12: Infinite Marquee & Hover Reveal (Bold Brutalism) */}
      {/* <CertificatesSectionMarquee /> */}

      {/* Opsi 13: Native File Explorer (Gaya VS Code / OS) */}
      {/* <CertificatesSectionExplorer /> */}

      {/* Opsi 14: Netflix / Streaming Service Style */}
      {/* <CertificatesSectionStreaming /> */}

      {/* Opsi 15: SaaS Data Dashboard (Tabel Analitik) */}
      {/* <CertificatesSectionDashboard /> */}

      {/* Opsi 16: Apple Vision Ultra-Glass Grid */}
      {/* <CertificatesSectionGlass /> */}

      {/* Opsi 17: Architectural Blueprint (Wireframe Mentah) */}
      {/* <CertificatesSectionBlueprint /> */}

      {/* Opsi 18: Editorial Magazine (Typographic Brutalism) (Aktif saat ini) */}
      <CertificatesSectionEditorial />

      {/* --- CONTACT SECTION --- */}
      {/* Opsi 1: The Modern Bento Card */}
      {/* <ContactSectionBento /> */}

      {/* Opsi 3: Typographic Brutalism */}
      {/* <ContactSectionBrutalism /> */}

      {/* Opsi 4: The Floating Magnet / Magnetic Buttons */}
      {/* <ContactSectionMagnetic /> */}

      {/* Opsi 5: The Retro Arcade (8-Bit Console) */}
      {/* <ContactSectionArcade /> */}

      {/* Opsi 7: The Minimalist Typewriter (Gaya Surat/Jurnal) */}
      {/* <ContactSectionTypewriter /> */}

      {/* Opsi 11: The Infinite Marquee (Running Text) */}
      {/* <ContactSectionMarquee /> */}

      {/* Opsi 12: The Clean SaaS Form (Vercel/Stripe Style) */}
      {/* <ContactSectionForm /> */}

      {/* Opsi 13: The Expanding Accordion (Layar Terbelah) */}
      {/* <ContactSectionExpanding /> */}

      {/* Opsi 15: The 3D Glass Cards */}
      {/* <ContactSection3DCards /> */}

      {/* Opsi 16: The Ultra-Minimalist Footer (Aktif saat ini) */}
      <ContactSectionMinimalist />
    </main>
  );
}

import { useState } from "react";
import Navbar          from "@/components/Navbar";
import HeroSection     from "@/components/HeroSection";
import AboutSection    from "@/components/AboutSection";
import SkillsSection   from "@/components/SkillsSection";
import EducationSection   from "@/components/EducationSection";
import InterestsSection   from "@/components/InterestsSection";
import ProjectsSection    from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection  from "@/components/ContactSection";
import Footer          from "@/components/Footer";
import IntroAnimation  from "@/components/IntroAnimation";

export default function Index() {
  // ── true once IntroAnimation calls onComplete() ───────────────────────────
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* ── Intro overlay ──────────────────────────────────────────────────── */}
      {/* Rendered on top of the page (z-[9999]).  Unmounts itself after the    */}
      {/* fade completes, leaving the fully-loaded portfolio visible.            */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* ── Portfolio page ─────────────────────────────────────────────────── */}
      {/* Mounts immediately and renders behind the overlay.  The Prism WebGL   */}
      {/* canvas warms up during the intro so the hero is already alive when    */}
      {/* the overlay fades — no cold-start flicker.                            */}
      <main className="min-h-screen bg-background">
        {/* logoVisible prop fades the nav logo in as the overlay disappears */}
        <Navbar logoVisible={introComplete} />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <InterestsSection />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
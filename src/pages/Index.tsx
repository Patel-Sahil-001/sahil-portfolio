import { useState, lazy, Suspense } from "react";
import Navbar          from "@/components/Navbar";
import HeroSection     from "@/components/HeroSection";
import IntroAnimation  from "@/components/IntroAnimation";

// Lazy-load below-the-fold sections for faster initial render
const AboutSection = lazy(() => import("@/components/AboutSection"));
const CardCascade = lazy(() => import("@/components/card-cascade"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const InterestsSection = lazy(() => import("@/components/InterestsSection"));
const CertificatesSection = lazy(() => import("@/components/CertificatesSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
        <Suspense fallback={null}>
          <AboutSection />
          <CardCascade />
          <EducationSection />
          <InterestsSection />
          <CertificatesSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
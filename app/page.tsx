"use client";

import { useEffect, useState, useCallback } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";

type Section = "hero" | "skills" | "projects" | "resume" | "contact";

const SECTIONS: Section[] = ["hero", "skills", "projects", "resume", "contact"];

function isSection(value: string): value is Section {
  return SECTIONS.includes(value as Section);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("hero");

  // Scroll to section and push hash to history
  const scrollToSection = useCallback((section: Section) => {
    setActiveSection(section);
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState(null, "", "/");
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${section}`);
    }
  }, []);

  // Handle initial hash and back/forward navigation via hashchange
  useEffect(() => {
    history.scrollRestoration = "manual";

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(isSection(hash) ? hash : "hero");
    };

    // On mount: sync activeSection with initial hash (if any)
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Track active section on scroll (no hash changes — only nav buttons create history entries)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Check if at top for hero
          if (window.scrollY < 200) {
            setActiveSection("hero");
          } else {
            for (const section of SECTIONS.slice(1)) {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom > 150) {
                  setActiveSection(section);
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const downloadPDF = () => {
    const printWindow = window.open("/api/resume", "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono relative">
      <ScrollProgress />

      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection onDownloadPDF={downloadPDF} />
        <ContactSection />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

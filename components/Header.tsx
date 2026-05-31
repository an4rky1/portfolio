"use client";

type Section = "about" | "projects" | "resume" | "contact";

export default function Header({
  activeSection,
  scrollToSection,
}: {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}) {
  const sections: Section[] = ["about", "projects", "resume", "contact"];

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-white/20 bg-background/95 backdrop-blur z-40 px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-accent text-xl"><span className="glitch">&lt;&gt;</span></span>
            <h1 className="text-xl font-bold sm:text-2xl text-white">Roman Ivanov</h1>
            <span className="cursor"></span>
          </div>
          <nav className="flex flex-nowrap gap-1 sm:gap-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`btn-nav ${activeSection === section ? "active" : ""}`}
                aria-current={activeSection === section ? "page" : undefined}
              >
                [{section.toUpperCase()}]
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

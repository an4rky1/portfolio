"use client";

type Section = "hero" | "skills" | "projects" | "resume" | "contact";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Header({
  activeSection,
  scrollToSection,
}: {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-foreground/10 bg-background/80 backdrop-blur-lg z-40 px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
          >
            <span className="text-accent text-xl font-bold transition-transform group-hover:scale-110">
              {"</>"}
            </span>
            <span className="text-lg font-semibold text-foreground hidden sm:inline">
              Roman Ivanov
            </span>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-accent text-background"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

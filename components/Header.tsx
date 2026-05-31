"use client";

type Section = "hero" | "skills" | "projects" | "resume" | "contact";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "resume", label: "RESUME" },
  { id: "contact", label: "CONTACT" },
];

export default function Header({
  activeSection,
  scrollToSection,
}: {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 border-b-3 border-foreground bg-background z-40 px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Brutalist */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <span className="bg-accent text-background px-2 py-1 text-lg font-black tracking-tight transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_var(--foreground)]">
              {"R.I"}
            </span>
            <span className="text-sm font-bold text-foreground hidden sm:inline uppercase tracking-wider">
              Roman Ivanov
            </span>
          </button>

          {/* Navigation - Brutalist */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-xs font-bold tracking-wider transition-all duration-150 border-2 ${
                  activeSection === item.id
                    ? "bg-accent text-background border-accent"
                    : "text-foreground/70 border-transparent hover:text-foreground hover:border-foreground"
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

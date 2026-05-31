"use client";

import { useInView } from "@/hooks/useInView";

const skillCategories = [
  {
    title: "LANGUAGES",
    icon: "01",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Go", level: "Advanced" },
      { name: "PHP", level: "Advanced" },
      { name: "Rust", level: "Learning" },
    ],
  },
  {
    title: "BACKEND",
    icon: "02",
    skills: [
      { name: "FastAPI", level: "Expert" },
      { name: "Django", level: "Advanced" },
      { name: "Laravel", level: "Advanced" },
      { name: "Symfony", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
    ],
  },
  {
    title: "FRONTEND",
    icon: "03",
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Vue.js", level: "Intermediate" },
      { name: "Tailwind", level: "Expert" },
    ],
  },
  {
    title: "DATABASES",
    icon: "04",
    skills: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "MySQL", level: "Advanced" },
      { name: "Redis", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Elastic", level: "Intermediate" },
    ],
  },
  {
    title: "DEVOPS",
    icon: "05",
    skills: [
      { name: "Docker", level: "Advanced" },
      { name: "K8s", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "CI/CD", level: "Advanced" },
      { name: "Terraform", level: "Learning" },
    ],
  },
  {
    title: "TOOLS",
    icon: "06",
    skills: [
      { name: "Git", level: "Expert" },
      { name: "Linux", level: "Advanced" },
      { name: "Nginx", level: "Advanced" },
      { name: "GraphQL", level: "Intermediate" },
    ],
  },
];

const levelStyles: Record<string, string> = {
  Expert: "bg-accent text-background border-accent",
  Advanced: "bg-transparent text-accent border-accent",
  Intermediate: "bg-transparent text-foreground border-foreground",
  Learning: "bg-transparent text-muted border-muted",
};

export default function SkillsSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });

  return (
    <section
      id="skills"
      ref={ref}
      className={`px-4 py-16 sm:px-6 sm:py-20 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-foreground">
          <span className="text-accent">{"//"}</span> SKILLS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="card group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-border">
                <h3 className="text-foreground font-bold text-sm tracking-wider">
                  {category.title}
                </h3>
                <span className="text-accent font-mono text-2xl font-black">
                  {category.icon}
                </span>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_currentColor] ${levelStyles[skill.level]}`}
                    title={skill.level}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend - Brutalist */}
        <div className="mt-10 pt-6 border-t-3 border-border">
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-accent border-2 border-accent" />
              <span className="text-muted">Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-transparent border-2 border-accent" />
              <span className="text-muted">Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-transparent border-2 border-foreground" />
              <span className="text-muted">Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-transparent border-2 border-muted" />
              <span className="text-muted">Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

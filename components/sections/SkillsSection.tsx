"use client";

import { useInView } from "@/hooks/useInView";

const skillCategories = [
  {
    title: "Languages",
    icon: "{ }",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Go", level: "Advanced" },
      { name: "PHP", level: "Advanced" },
      { name: "Rust", level: "Learning" },
    ],
  },
  {
    title: "Backend",
    icon: "< />",
    skills: [
      { name: "FastAPI", level: "Expert" },
      { name: "Django", level: "Advanced" },
      { name: "Laravel", level: "Advanced" },
      { name: "Symfony", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
    ],
  },
  {
    title: "Frontend",
    icon: "[ ]",
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Vue.js", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    title: "Databases",
    icon: "( )",
    skills: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "MySQL", level: "Advanced" },
      { name: "Redis", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Elasticsearch", level: "Intermediate" },
    ],
  },
  {
    title: "DevOps",
    icon: "=>",
    skills: [
      { name: "Docker", level: "Advanced" },
      { name: "Kubernetes", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "CI/CD", level: "Advanced" },
      { name: "Terraform", level: "Learning" },
    ],
  },
  {
    title: "Tools",
    icon: "##",
    skills: [
      { name: "Git", level: "Expert" },
      { name: "Linux", level: "Advanced" },
      { name: "Nginx", level: "Advanced" },
      { name: "GraphQL", level: "Intermediate" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Expert: "bg-accent text-background",
  Advanced: "bg-accent/20 text-accent border border-accent/30",
  Intermediate: "bg-foreground/10 text-foreground/70 border border-foreground/20",
  Learning: "bg-foreground/5 text-foreground/50 border border-foreground/10",
};

export default function SkillsSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });

  return (
    <section
      id="skills"
      ref={ref}
      className={`px-4 py-12 sm:px-6 sm:py-16 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-foreground mb-10">
          <span className="text-accent">//</span> Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="group card hover:border-accent/50 transition-all duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-foreground/10">
                <span className="text-accent font-mono text-lg">
                  {category.icon}
                </span>
                <h3 className="text-foreground font-semibold text-lg">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 ${levelColors[skill.level]}`}
                    title={skill.level}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-accent" />
            <span className="text-foreground/60">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-accent/20 border border-accent/30" />
            <span className="text-foreground/60">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-foreground/10 border border-foreground/20" />
            <span className="text-foreground/60">Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-foreground/5 border border-foreground/10" />
            <span className="text-foreground/60">Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}

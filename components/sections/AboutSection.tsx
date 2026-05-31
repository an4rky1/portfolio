"use client";

import { useInView } from "@/hooks/useInView";

const SKILLS = {
  languages: {
    primary: ["Python", "Go", "TypeScript"],
    secondary: ["JavaScript", "Rust", "PHP", "SQL", "C"],
  },
  frameworks: {
    backend: ["FastAPI", "Django", "Laravel", "Symfony", "Node.js"],
    frontend: ["React", "Next.js", "Vue.js"],
  },
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"],
  infrastructure: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform", "GitHub Actions"],
};

export default function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  
  return (
    <section 
      id="about" 
      ref={ref}
      className={`px-4 py-16 sm:px-6 sm:py-24 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            About Me
          </h2>
          <div className="w-20 h-1 bg-accent"></div>
        </div>

        {/* About text */}
        <div className="space-y-6 mb-16">
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            I&apos;m a <span className="text-accent font-semibold">Fullstack Developer</span> with 
            over 3 years of professional experience building web applications and backend systems.
          </p>
          <p className="text-gray-400 leading-relaxed">
            My primary focus is on backend development — designing clean APIs, optimizing database 
            performance, and building scalable distributed systems. I work with Python, Go, and 
            TypeScript daily, and I&apos;m comfortable jumping into frontend work with React and Next.js 
            when needed.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Currently, I&apos;m diving deep into Rust and systems programming, exploring WebAssembly 
            for performance-critical browser workloads. I&apos;m passionate about clean code, developer 
            tooling, and continuous learning.
          </p>
          <p className="text-gray-400 leading-relaxed">
            I work remotely from Eastern Europe and I&apos;m always open to interesting projects 
            and opportunities.
          </p>
        </div>

        {/* Skills section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">
            Technical Skills
          </h3>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Languages */}
            <div className="space-y-3">
              <h4 className="text-accent font-semibold uppercase tracking-wider text-sm">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.languages.primary.map((lang) => (
                  <span 
                    key={lang}
                    className="px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent text-sm rounded"
                  >
                    {lang}
                  </span>
                ))}
                {SKILLS.languages.secondary.map((lang) => (
                  <span 
                    key={lang}
                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-3">
              <h4 className="text-purple-400 font-semibold uppercase tracking-wider text-sm">
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.frameworks.backend.map((fw) => (
                  <span 
                    key={fw}
                    className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm rounded"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-semibold uppercase tracking-wider text-sm">
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.frameworks.frontend.map((fw) => (
                  <span 
                    key={fw}
                    className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm rounded"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="space-y-3">
              <h4 className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
                Databases
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.databases.map((db) => (
                  <span 
                    key={db}
                    className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm rounded"
                  >
                    {db}
                  </span>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div className="space-y-3 sm:col-span-2">
              <h4 className="text-pink-400 font-semibold uppercase tracking-wider text-sm">
                Infrastructure & DevOps
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.infrastructure.map((tool) => (
                  <span 
                    key={tool}
                    className="px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-gray-400">Available for work</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Location:</span>
              <span className="text-gray-300">Remote (Eastern Europe)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Experience:</span>
              <span className="text-gray-300">3+ years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

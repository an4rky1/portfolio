"use client";

import { useState } from "react";

type Section = "about" | "projects" | "resume" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("about");

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Header */}
      <header className="border-b border-white px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-accent">{"<>"}</span> SMITH <span className="text-accent">{"</>"}</span>
              </h1>
              <p className="text-accent text-sm mt-1">
                SOFTWARE ENGINEER / BACKEND SPECIALIST
              </p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {(["about", "projects", "resume", "contact"] as Section[]).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`btn ${activeSection === section ? "btn-primary" : ""}`}
                >
                  [{section.toUpperCase()}]
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeSection === "about" && <AboutSection />}
        {activeSection === "projects" && <ProjectsSection />}
        {activeSection === "resume" && <ResumeSection />}
        {activeSection === "contact" && <ContactSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white mt-16 px-6 py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>© 2025 SMITH. All rights reserved.</p>
          <p className="mt-1">
            <span className="highlight">$</span> echo "Built with Next.js & TailwindCSS"
          </p>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-8">
      <h2 className="section-title text-white">ABOUT_ME.TXT</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Description */}
        <div className="card">
          <div className="card-header">DESCRIPTION:</div>
          <p className="mb-4">
            Backend-focused software engineer with 5+ years building scalable systems.
            I write code that works, not code that looks pretty.
            <span className="highlight"> Performance over aesthetics. Function over form. Results over rhetoric.</span>
          </p>
          <p>
            Specialized in distributed systems, API design, and database optimization.
            I solve problems with minimal dependencies and maximum efficiency.
          </p>
        </div>

        {/* Skills JSON */}
        <div className="card">
          <div className="card-header">SKILLS.JSON:</div>
          <pre className="text-sm overflow-x-auto">
            <code>{`{
  "languages": ["Python", "Go", "JavaScript", "TypeScript", "Rust", "SQL"],
  "frameworks": ["FastAPI", "Django", "Node.js", "React", "Next.js"],
  "databases": ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
  "infrastructure": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
  "tools": ["Git", "Linux", "Vim", "tmux"]
}`}</code>
          </pre>
        </div>
      </div>

      {/* Philosophy */}
      <div className="card">
        <div className="card-header">PHILOSOPHY:</div>
        <blockquote className="border-l-4 border-accent pl-4 py-2 my-4">
          <p className="italic">
            "The best code is code that doesn't need to exist.
            The second best is code that's so simple it obviously has no bugs."
          </p>
        </blockquote>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      name: "DISTRIBUTED_CACHE_SYSTEM",
      description: "High-performance distributed caching system handling 100K+ requests/second. Built for horizontal scaling with consistent hashing.",
      stack: ["Go", "Redis", "Docker", "Kubernetes"],
      code: "#",
      demo: "#",
    },
    {
      name: "API_GATEWAY_SERVICE",
      description: "Custom API gateway with rate limiting, authentication, and request routing. Reduced latency by 40% compared to existing solutions.",
      stack: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      code: "#",
      docs: "#",
    },
    {
      name: "REAL_TIME_ANALYTICS",
      description: "Real-time data processing pipeline for analytics. Processes millions of events per day with sub-second latency.",
      stack: ["Go", "Kafka", "ClickHouse", "Grafana"],
      code: "#",
      demo: "#",
    },
    {
      name: "CLI_DEPLOYMENT_TOOL",
      description: "Command-line deployment tool for containerized applications. Zero-downtime deployments with automatic rollback capabilities.",
      stack: ["Rust", "Docker", "AWS"],
      code: "#",
      docs: "#",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="section-title text-white">PROJECTS.DIR</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.name} className="card">
            <div className="card-header">{project.name}</div>
            <div className="aspect-video bg-card-bg border border-white/20 mb-4 flex items-center justify-center">
              <span className="text-gray-600">[IMAGE_PLACEHOLDER]</span>
            </div>
            <p className="text-sm mb-4">{project.description}</p>
            <p className="text-sm mb-4">
              <span className="highlight">STACK:</span> {project.stack.join(", ")}
            </p>
            <div className="flex gap-2">
              <a href={project.code} className="btn">
                <span className="mr-1"></span> CODE
              </a>
              {project.demo && (
                <a href={project.demo} className="btn">
                  <span className="mr-1">↗</span> DEMO
                </a>
              )}
              {project.docs && (
                <a href={project.docs} className="btn">
                  <span className="mr-1"></span> DOCS
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeSection() {
  return (
    <div className="space-y-8">
      <h2 className="section-title text-white">RESUME.PDF</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Experience */}
        <div className="md:col-span-2 card">
          <div className="card-header">EXPERIENCE:</div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-white">SENIOR SOFTWARE ENGINEER</h3>
              <p className="text-accent text-sm">TechCorp Inc. | 2021 - Present</p>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Built microservices architecture serving 1M+ daily users</li>
                <li>Reduced API response time by 60% through optimization</li>
                <li>Led team of 4 engineers on critical infrastructure projects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white">SOFTWARE ENGINEER</h3>
              <p className="text-accent text-sm">StartupXYZ | 2019 - 2021</p>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Designed and implemented REST APIs for mobile applications</li>
                <li>Migrated legacy monolith to containerized microservices</li>
                <li>Implemented CI/CD pipeline reducing deployment time by 80%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white">JUNIOR DEVELOPER</h3>
              <p className="text-accent text-sm">WebDev Solutions | 2018 - 2019</p>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Developed web applications using Python and JavaScript</li>
                <li>Maintained and optimized database queries</li>
                <li>Collaborated with frontend team on API integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="card">
          <div className="card-header">EDUCATION:</div>
          <div className="mb-6">
            <h3 className="font-bold text-white">B.S. COMPUTER SCIENCE</h3>
            <p className="text-accent text-sm">State University | 2018</p>
          </div>
          
          <div className="card-header mt-4">CERTIFICATIONS:</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li>• AWS Solutions Architect</li>
            <li>• Kubernetes Administrator</li>
            <li>• Docker Certified Associate</li>
          </ul>

          <a href="#" className="btn btn-primary w-full mt-6 text-center">
            ↓ DOWNLOAD_RESUME.PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="space-y-8">
      <h2 className="section-title text-white">CONTACT.SH</h2>
      
      <div className="card">
        <div className="grid md:grid-cols-3 gap-8 py-8">
          {/* Email */}
          <div className="text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-bold text-white mb-2">EMAIL</h3>
            <a href="mailto:smith@email.com" className="btn">
              smith@email.com
            </a>
          </div>

          {/* GitHub */}
          <div className="text-center">
            <div className="text-4xl mb-4">🐙</div>
            <h3 className="font-bold text-white mb-2">GITHUB</h3>
            <a href="https://github.com/smith" target="_blank" rel="noopener noreferrer" className="btn">
              github.com/smith
            </a>
          </div>

          {/* LinkedIn */}
          <div className="text-center">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="font-bold text-white mb-2">LINKEDIN</h3>
            <a href="https://linkedin.com/in/smith" target="_blank" rel="noopener noreferrer" className="btn">
              linkedin.com/in/smith
            </a>
          </div>
        </div>
      </div>

      {/* Terminal-style contact form */}
      <div className="card">
        <div className="card-header">SEND_MESSAGE.SH</div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              <span className="highlight">$</span> NAME=
            </label>
            <input
              type="text"
              className="w-full bg-card-bg border border-white/20 px-4 py-2 text-foreground font-mono focus:outline-none focus:border-accent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">
              <span className="highlight">$</span> EMAIL=
            </label>
            <input
              type="email"
              className="w-full bg-card-bg border border-white/20 px-4 py-2 text-foreground font-mono focus:outline-none focus:border-accent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">
              <span className="highlight">$</span> MESSAGE=
            </label>
            <textarea
              rows={4}
              className="w-full bg-card-bg border border-white/20 px-4 py-2 text-foreground font-mono focus:outline-none focus:border-accent"
              placeholder="Enter your message"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            ./send_message.sh
          </button>
        </form>
      </div>
    </div>
  );
}

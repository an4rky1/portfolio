"use client";

import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";
import "./globals.css";

type Section = "about" | "projects" | "resume" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("about");

  useEffect(() => {
    Prism.highlightAll();

    const handleScroll = () => {
      const sections: Section[] = ["about", "projects", "resume", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono relative">
      {/* Scanline effect */}
      <div className="scanline fixed inset-0 pointer-events-none z-50 opacity-30"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 border-b border-white bg-background/95 backdrop-blur z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-accent text-xl">
                <span className="glitch">{"<>"}</span>
              </span>
              <h1 className="text-2xl font-bold text-white">SMITH</h1>
              <span className="cursor"></span>
            </div>
            <nav className="flex flex-wrap gap-2">
              {(["about", "projects", "resume", "contact"] as Section[]).map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`btn-nav ${activeSection === section ? "active" : ""}`}
                >
                  [{section.toUpperCase()}]
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main>
        <section id="about" className="px-6">
          <div className="max-w-6xl mx-auto py-8">
            <AboutSection />
          </div>
        </section>

        <section id="projects" className="px-6">
          <div className="max-w-6xl mx-auto py-8">
            <ProjectsSection />
          </div>
        </section>

        <section id="resume" className="px-6">
          <div className="max-w-6xl mx-auto py-8">
            <ResumeSection />
          </div>
        </section>

        <section id="contact" className="px-6">
          <div className="max-w-6xl mx-auto py-8">
            <ContactSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white mt-16 px-6 py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>© 2025 SMITH. All rights reserved.</p>
          <p className="mt-1">
            <span className="highlight">$</span> echo "Built with Next.js & TailwindCSS"
            <span className="cursor"></span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="section-title text-white">
        <span className="highlight">$</span> cat ABOUT_ME.TXT
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Description */}
        <div className="card animate-fade-in-delay-1 opacity-0">
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
        <div className="card animate-fade-in-delay-2 opacity-0">
          <div className="card-header">SKILLS.JSON:</div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="highlight font-bold">"languages"</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-1 mt-1 ml-2">
                {["Python", "Go", "JavaScript", "TypeScript", "Rust", "SQL"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-white/10 rounded text-accent">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="highlight font-bold">"frameworks"</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-1 mt-1 ml-2">
                {["FastAPI", "Django", "Node.js", "React", "Next.js"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-white/10 rounded text-blue-400">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="highlight font-bold">"databases"</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-1 mt-1 ml-2">
                {["PostgreSQL", "Redis", "MongoDB", "Elasticsearch"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-white/10 rounded text-purple-400">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="highlight font-bold">"infrastructure"</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-1 mt-1 ml-2">
                {["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-white/10 rounded text-yellow-400">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="highlight font-bold">"tools"</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-1 mt-1 ml-2">
                {["Git", "Linux", "Vim", "tmux"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-white/10 rounded text-pink-400">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="card animate-fade-in-delay-3 opacity-0">
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
      code: `package main

import (
    "github.com/go-redis/redis/v8"
    "context"
)

type Cache struct {
    client *redis.Client
    ctx    context.Context
}

func (c *Cache) Get(key string) ([]byte, error) {
    return c.client.Get(c.ctx, key).Bytes()
}

func (c *Cache) Set(key string, value []byte, ttl time.Duration) error {
    return c.client.Set(c.ctx, key, value, ttl).Err()
}`,
      codeLink: "#",
      demoLink: "#",
    },
    {
      name: "API_GATEWAY_SERVICE",
      description: "Custom API gateway with rate limiting, authentication, and request routing. Reduced latency by 40% compared to existing solutions.",
      stack: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      code: `from fastapi import FastAPI, Request, HTTPException
from redis import asyncio as aioredis
import time

app = FastAPI()

@app.middleware("http")
async def rate_limit(request: Request, call_next):
    redis = await aioredis.from_url("redis://localhost")
    ip = request.client.host
    key = f"rate_limit:{ip}"
    
    count = await redis.incr(key)
    if count == 1:
        await redis.expire(key, 60)
    
    if count > 100:
        raise HTTPException(status_code=429)
    
    return await call_next(request)`,
      codeLink: "#",
      docsLink: "#",
    },
    {
      name: "REAL_TIME_ANALYTICS",
      description: "Real-time data processing pipeline for analytics. Processes millions of events per day with sub-second latency.",
      stack: ["Go", "Kafka", "ClickHouse", "Grafana"],
      code: `package analytics

import (
    "github.com/segmentio/kafka-go"
    "github.com/ClickHouse/clickhouse-go/v2"
)

type Pipeline struct {
    reader *kafka.Reader
    conn   clickhouse.Conn
}

func (p *Pipeline) Process(ctx context.Context) error {
    msg, err := p.reader.ReadMessage(ctx)
    if err != nil {
        return err
    }
    
    event := parseEvent(msg.Value)
    return p.conn.Insert(ctx, event)
}`,
      codeLink: "#",
      demoLink: "#",
    },
    {
      name: "CLI_DEPLOYMENT_TOOL",
      description: "Command-line deployment tool for containerized applications. Zero-downtime deployments with automatic rollback capabilities.",
      stack: ["Rust", "Docker", "AWS"],
      code: `use docker_api::Docker;
use aws_sdk::ecs::Client as ECSClient;

pub struct Deployer {
    docker: Docker,
    ecs: ECSClient,
}

impl Deployer {
    pub async fn deploy(&self, image: &str, service: &str) -> Result<()> {
        self.pull_image(image).await?;
        self.update_service(service, image).await?;
        self.wait_for_stability(service).await?;
        Ok(())
    }
    
    async fn rollback(&self, service: &str, prev_image: &str) -> Result<()> {
        eprintln!("Rolling back to {}", prev_image);
        self.update_service(service, prev_image).await
    }
}`,
      codeLink: "#",
      docsLink: "#",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="section-title text-white">
        <span className="highlight">$</span> ls -la PROJECTS.DIR/
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={project.name} 
            className={`card animate-fade-in-delay-${(index % 3) + 1} opacity-0`}
          >
            <div className="card-header">{project.name}</div>
            <div className="aspect-video bg-card-bg border border-white/20 mb-4 flex items-center justify-center overflow-hidden">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">📁</div>
                <span className="text-gray-600 text-sm">[PROJECT_PREVIEW]</span>
              </div>
            </div>
            <p className="text-sm mb-4">{project.description}</p>
            <p className="text-sm mb-4">
              <span className="highlight">STACK:</span> {project.stack.join(", ")}
            </p>
            
            {/* Code preview */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">// Preview:</div>
              <pre className="text-xs max-h-32 overflow-auto">
                <code className={`language-${project.stack[0].toLowerCase() === 'go' ? 'go' : project.stack[0].toLowerCase() === 'python' ? 'python' : project.stack[0].toLowerCase() === 'rust' ? 'rust' : 'typescript'}`}>
                  {project.code.split('\n').slice(0, 6).join('\n')}...
                </code>
              </pre>
            </div>
            
            <div className="flex gap-2">
              <a href={project.codeLink} className="btn">
                CODE
              </a>
              {project.demoLink && (
                <a href={project.demoLink} className="btn">
                  ↗ DEMO
                </a>
              )}
              {project.docsLink && (
                <a href={project.docsLink} className="btn">
                  DOCS
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
    <div className="space-y-8 animate-fade-in">
      <h2 className="section-title text-white">
        <span className="highlight">$</span> cat RESUME.PDF
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Experience */}
        <div className="md:col-span-2 card animate-fade-in-delay-1 opacity-0">
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
        <div className="card animate-fade-in-delay-2 opacity-0">
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
    <div className="space-y-8 animate-fade-in">
      <h2 className="section-title text-white">
        <span className="highlight">$</span> ./CONTACT.SH
      </h2>
      
      <div className="card animate-fade-in-delay-1 opacity-0">
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
            <div className="text-4xl mb-4"></div>
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
      <div className="card animate-fade-in-delay-2 opacity-0">
        <div className="card-header">SEND_MESSAGE.SH</div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              <span className="highlight">$</span> NAME=
            </label>
            <input
              type="text"
              className="w-full bg-card-bg border border-white/20 px-4 py-2 text-foreground font-mono focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">
              <span className="highlight">$</span> EMAIL=
            </label>
            <input
              type="email"
              className="w-full bg-card-bg border border-white/20 px-4 py-2 text-foreground font-mono focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">
              <span className="highlight">$</span> MESSAGE=
            </label>
            <textarea
              rows={4}
              className="w-full bg-card-bg border border-white/20 px-4 py-2 text-foreground font-mono focus:outline-none focus:border-accent transition-colors"
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

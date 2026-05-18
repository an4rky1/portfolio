"use client";

import { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";

function VideoPreview({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="aspect-video bg-gradient-to-br from-card-bg via-card-bg to-background border border-white/20 mb-4 flex items-center justify-center overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute inset-0 bg-grid-pattern transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-10'}`}></div>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-[100%]' : 'translate-x-[-100%]'}`}></div>

      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {!isHovered && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-card-bg/50"></div>
      )}
    </div>
  );
}

type Section = "about" | "projects" | "resume" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    Prism.highlightAll();

    const handleScroll = () => {
      const sections = ["about", "projects", "resume", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section as Section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

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
      <div className="scanline fixed inset-0 pointer-events-none z-50 opacity-30"></div>
      
      <header className="fixed top-0 left-0 right-0 border-b border-white/20 bg-background/95 backdrop-blur z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-accent text-xl"><span className="glitch">&lt;&gt;</span></span>
              <h1 className="text-2xl font-bold text-white">Roman Ivanov</h1>
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

      <div className="h-20"></div>

      <main>
        <AboutSection />
        <ProjectsSection />
        {isPrinting ? (
          <div className="hidden" id="print-resume">
            <div className="print:hidden"></div>
          </div>
        ) : null}
        <ResumeSection onDownloadPDF={downloadPDF} />
        <ContactSection />
      </main>

      <footer className="border-t border-white/20 mt-16 px-6 py-4">
        <div className="max-w-6xl mx-auto text-center text-base text-gray-500">
          <p>© 2025 Roman Ivanov. All rights reserved.</p>
          <p className="mt-1">
            <span className="highlight">$</span>echo "Built with Next.js & TailwindCSS"<span className="cursor"></span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> cat ABOUT_ME.TXT
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card animate-fade-in-delay-1 opacity-0">
              <div className="card-header">DESCRIPTION:</div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  <span className="highlight font-bold">Fullstack developer</span> with 3+ years of experience. 
                  Mainly work with PHP (Laravel, Symfony) and JavaScript (React, Next.js).
                </p>
                <p>
                  Currently focused on backend development, building APIs and working with databases. 
                  Also do some frontend when needed.
                </p>
                <p>
                  Interested in <span className="highlight">clean code</span>, <span className="highlight">performance</span>, and <span className="highlight">learning new technologies</span>.
                  Currently exploring Rust and DevOps.
                </p>
              </div>
            </div>

            <div className="card animate-fade-in-delay-2 opacity-0">
              <div className="card-header">SKILLS.JSON:</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "languages", items: ["Python", "Go", "JS", "TS", "Rust", "SQL"], color: "text-accent" },
                  { title: "frameworks", items: ["FastAPI", "Django", "Node.js", "React", "Next.js"], color: "text-blue-400" },
                  { title: "databases", items: ["PostgreSQL", "Redis", "MongoDB", "Elastic"], color: "text-purple-400" },
                  { title: "infrastructure", items: ["Docker", "K8s", "AWS", "Terraform", "CI/CD"], color: "text-yellow-400" }
                ].map(cat => (
                  <div key={cat.title} className="bg-white/5 border border-white/10 p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <span className="highlight font-bold text-base">"{cat.title}"</span>
                      <span className="text-gray-500">:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map(skill => (
                        <span key={skill} className={`px-2 py-0.5 bg-white/5 border border-white/10 rounded text-base ${cat.color}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="highlight font-bold text-base">"learning"</span>
                  <span className="text-gray-400">:</span>
                  <span className="animate-pulse text-accent">_</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Rust", progress: 60 },
                    { name: "WebAssembly", progress: 30 },
                    { name: "gRPC", progress: 45 }
                  ].map(skill => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="text-accent/70 text-base w-24">{skill.name}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-500 text-base w-8">{skill.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      name: "DISTRIBUTED_CACHE_SYSTEM",
      description: "High-performance distributed caching system handling 100K+ requests/second. Built for horizontal scaling with consistent hashing.",
      stack: ["Go", "Redis", "Docker", "Kubernetes"],
      status: "completed",
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
      status: "completed",
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
      name: "ML_OPS_DASHBOARD",
      description: "ML model monitoring and management dashboard with real-time metrics, A/B testing, and automated retraining pipelines.",
      stack: ["Python", "FastAPI", "Vue.js", "Prometheus"],
      status: "in-progress",
      code: `from fastapi import FastAPI
from prometheus_client import Counter, Histogram
import time

requests = Counter('http_requests_total', 'Total HTTP requests')
latency = Histogram('http_request_latency_seconds', 'Request latency')

app = FastAPI()

@app.middleware("http")
async def track_metrics(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    requests.inc()
    latency.observe(time.time() - start)
    return response`,
      codeLink: "#",
    },
    {
      name: "SERVERLESS_FRAMEWORK",
      description: "Custom serverless framework for deploying and managing containerized functions across multiple cloud providers.",
      stack: ["Rust", "Docker", "AWS Lambda", "GCP"],
      status: "in-progress",
      code: `use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct FunctionConfig {
    pub name: String,
    pub runtime: String,
    pub memory: u32,
    pub timeout: u32,
}

pub struct ServerlessDeployer {
    client: DockerClient,
    provider: CloudProvider,
}

impl ServerlessDeployer {
    pub async fn deploy(&self, config: FunctionConfig) -> Result<String, Error> {
        let image = self.build_image(&config).await?;
        self.upload_to_cloud(image, config).await
    }
}`,
      codeLink: "#",
    },
    {
      name: "REAL_TIME_ANALYTICS",
      description: "Real-time data processing pipeline for analytics. Processes millions of events per day with sub-second latency.",
      stack: ["Go", "Kafka", "ClickHouse", "Grafana"],
      status: "completed",
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
      status: "completed",
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

  const completedProjects = projects.filter(p => p.status === "completed").map((p, i) => ({ ...p, video: `/projects/${i + 1}.mp4` }));
  const inProgressProjects = projects.filter(p => p.status === "in-progress");

  return (
    <section id="projects" className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> ls -la PROJECTS.DIR/
          </h2>

          {completedProjects.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <h3 className="text-lg font-bold text-accent font-mono">COMPLETED</h3>
                <span className="text-gray-500 text-base">({completedProjects.length})</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {completedProjects.map((project, index) => (
                  <div 
                    key={project.name} 
                    className={`card animate-fade-in-delay-${(index % 3) + 1} opacity-0 flex flex-col h-full group relative`}
                  >
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/50 group-hover:border-accent"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/50 group-hover:border-accent"></div>
                    <div className="card-header">{project.name}</div>
                    
                    <VideoPreview videoSrc={project.video} />
                    
                    <p className="text-base mb-4 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map(tech => (
                        <span key={tech} className="relative border border-white/20 bg-transparent px-2 py-0.5 text-base text-accent font-mono uppercase tracking-wider hover:bg-accent/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <a href={project.codeLink} className="btn btn-primary text-center">
                        <span className="relative z-10">CODE</span>
                      </a>
                      {project.demoLink ? (
                        <a href={project.demoLink} className="btn btn-secondary text-center group">
                          <span className="relative z-10 group-hover:text-accent transition-colors">DEMO <span className="text-accent text-base group-hover:text-background">↗</span></span>
                        </a>
                      ) : project.docsLink ? (
                        <a href={project.docsLink} className="btn btn-secondary text-center group">
                          <span className="relative z-10 group-hover:text-accent transition-colors">DOCS</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {inProgressProjects.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-yellow-400 font-mono">IN_PROGRESS</h3>
                <span className="text-gray-500 text-base">({inProgressProjects.length})</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {inProgressProjects.map((project, index) => (
                  <div 
                    key={project.name} 
                    className="card animate-fade-in-delay-1 opacity-0 flex flex-col h-full group relative border-yellow-400/30"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400/50 via-yellow-400/20 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-400/50 group-hover:border-yellow-400"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-400/50 group-hover:border-yellow-400"></div>
                    <div className="card-header bg-yellow-400/20 text-yellow-400">
                      {project.name}
                      <span className="ml-2 text-base animate-pulse">▌</span>
                    </div>
                    
                    <div className="aspect-video bg-gradient-to-br from-card-bg via-card-bg to-background border border-white/20 mb-4 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="text-center p-4 z-10">
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
                        <span className="text-yellow-400/60 text-base">WORK_IN_PROGRESS</span>
                      </div>
                    </div>
                    
                    <p className="text-base mb-4 flex-grow text-gray-400">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map(tech => (
                        <span key={tech} className="relative border border-yellow-400/20 bg-yellow-400/5 px-2 py-0.5 text-base text-yellow-400/70 font-mono uppercase tracking-wider hover:bg-yellow-400/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <a href={project.codeLink} className="btn btn-secondary text-center">
                        <span className="relative z-10 text-yellow-400/70 group-hover:text-yellow-400">CODE</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ResumeSection({ onDownloadPDF }: { onDownloadPDF: () => void }) {
  return (
    <section id="resume" className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> cat RESUME.PDF
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="card animate-fade-in-delay-1 opacity-0">
              <div className="card-header">EXPERIENCE:</div>
              <div className="space-y-4">
                {[
                  {
                    title: "NEXT.JS DEVELOPER",
                    company: "Nimbus Systems",
                    period: "2024 - 2025",
                    achievements: [
                      "Built production React/Next.js applications with TypeScript",
                      "Implemented server-side rendering and static generation",
                      "Optimized bundle size and improved Core Web Vitals"
                    ]
                  },
                  {
                    title: "LARAVEL FULLSTACK DEVELOPER",
                    company: "CipherTech",
                    period: "2024 - 2025",
                    achievements: [
                      "Developed RESTful APIs and real-time features with Laravel",
                      "Integrated Vue.js frontend with Laravel backend",
                      "Implemented authentication and payment systems"
                    ]
                  },
                  {
                    title: "SYMFONY FULLSTACK DEVELOPER",
                    company: "Vertex Labs",
                    period: "2023 - 2024",
                    achievements: [
                      "Built enterprise applications using Symfony framework",
                      "Worked with PostgreSQL, Redis, and Elasticsearch",
                      "Implemented REST APIs and microservices architecture"
                    ]
                  },
                  {
                    title: "FRONTEND JUNIOR DEVELOPER",
                    company: "Freelance",
                    period: "2022 - 2023",
                    achievements: [
                      "Created responsive websites using HTML, CSS, JavaScript",
                      "Worked with React.js and basic state management",
                      "Collaborated with designers to implement UI/UX"
                    ]
                  }
                ].map((job, idx) => (
                  <div key={idx} className="relative pl-5 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="absolute left-0 top-1 w-2 h-2 bg-accent rounded-full"></div>
                    <h3 className="font-bold text-white text-base">{job.title}</h3>
                    <p className="text-accent text-base mt-1">{job.company} <span className="text-gray-500">|</span> {job.period}</p>
                    <ul className="mt-2 space-y-1 text-base text-gray-400">
                      {job.achievements.map((a, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent/50">▸</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="card animate-fade-in-delay-2 opacity-0">
              <div className="card-header">EDUCATION:</div>
              
              <div className="space-y-5">
                <div className="relative pl-5 pb-4 border-b border-white/10">
                  <div className="absolute left-0 top-1 w-2 h-2 bg-accent rounded-full"></div>
                  <h3 className="text-white font-bold text-base">COMPUTER SCIENCE</h3>
                  <p className="text-accent text-base mt-1">Donbas State Engineering Academy</p>
                  <p className="text-gray-500 text-base">2018 - 2023</p>
                </div>
                
                <div className="relative pl-5">
                  <div className="absolute left-0 top-1 w-2 h-2 bg-white/50 rounded-full"></div>
                  <h3 className="text-white font-bold text-base">APPLIED MATHEMATICS</h3>
                  <p className="text-accent text-base mt-1">Horlivka Technical College</p>
                  <p className="text-gray-500 text-base">2011 - 2014</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button onClick={onDownloadPDF} className="btn btn-primary w-full text-center block text-base py-2">
                  <span className="highlight">$</span> DOWNLOAD_RESUME.PDF ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> ./CONTACT.SH
          </h2>

          <div className="card animate-fade-in-delay-1 opacity-0">
            <div className="grid md:grid-cols-3 gap-6 py-6">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">EMAIL</h3>
                <a href="mailto:roman.ivanov@email.com" className="btn">
                  roman.ivanov@email.com
                </a>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.74c0 .27.16.59.67.5C21.14 20.16 24 16.42 24 12A10 10 0 0012 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">GITHUB</h3>
                <a href="https://github.com/romanivanov" target="_blank" rel="noopener noreferrer" className="btn">
                  github.com/romanivanov
                </a>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">LINKEDIN</h3>
                <a href="https://linkedin.com/in/romanivanov" target="_blank" rel="noopener noreferrer" className="btn">
                  linkedin.com/in/romanivanov
                </a>
              </div>
            </div>
          </div>

          <div className="card animate-fade-in-delay-2 opacity-0">
            <div className="card-header">SEND_MESSAGE.SH</div>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="text-4xl">✓</div>
                <p className="text-accent font-mono text-center">
                  <span className="highlight">$</span> MESSAGE_SENT_SUCCESSFULLY!
                </p>
                <p className="text-gray-500 text-base text-center">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button 
                  type="button" 
                  onClick={() => setFormSubmitted(false)}
                  className="btn mt-4"
                >
                  SEND_ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> NAME=
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    className="w-full bg-card-bg border border-white/30 font-mono px-4 py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none"
                    placeholder="user_name"
                  />
                </div>
                <div>
                  <label className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> EMAIL=
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className="w-full bg-card-bg border border-white/30 font-mono px-4 py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none"
                    placeholder="user@email.com"
                  />
                </div>
                <div>
                  <label className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> MESSAGE=
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    autoComplete="off"
                    className="w-full bg-card-bg border border-white/30 font-mono px-4 py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none resize-none"
                    placeholder="your message here..."
                  />
                </div>
                <button type="submit" className="btn btn-primary self-center px-8 py-3 text-base uppercase tracking-wider">
                  <span className="highlight">$</span> ./send_message.sh
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
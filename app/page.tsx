"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import CodeResume from "@/components/CodeResume";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { useInView } from "@/hooks/useInView";
import { validateContactForm, hasErrors, type ContactFormData, type ContactFormErrors } from "@/lib/contact";

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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      <ScrollProgress />
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

      <ScrollToTop />

      <footer className="border-t border-white/20 mt-16 px-6 py-4">
        <div className="max-w-6xl mx-auto text-center text-base text-gray-500">
          <p>© {new Date().getFullYear()} Roman Ivanov. All rights reserved.</p>
          <p className="mt-1">
            <span className="highlight">$</span>echo "Built with Next.js & TailwindCSS"<span className="cursor"></span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  return (
    <section 
      id="about" 
      ref={ref}
      className={`px-6 py-8 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> cat RESUME.CS
          </h2>
          
          <div className="bg-[#1a1b26] border border-[#292e42] rounded-lg p-6 overflow-x-auto">
            <CodeResume />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  const projects = [
    {
      name: "ASCII_TERMINAL",
      description: "Interactive Matrix-style terminal for ASCII art generation. Features image-to-ASCII conversion via Canvas API, AI image generation (Hugging Face), bento grid gallery with glitch effects, and Supabase authentication.",
      stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS 4", "Zustand", "React Query"],
      status: "completed",
      code: `// Terminal command handler
async function handleCommand(cmd: string) {
  const [action, ...args] = cmd.split(' ');
  
  switch (action) {
    case 'upload':
      return await convertImageToASCII(args[0]);
    case 'generate':
      return await generateFromPrompt(args.join(' '));
    case 'save':
      return await saveToGallery(args[0]);
    case 'gallery':
      return renderGallery();
  }
}`,
      codeLink: "https://github.com/anarky/ascii",
      demoLink: "#",
      docsLink: "#",
    },
    {
      name: "NEWS_PLATFORM",
      description: "Full-stack news aggregation platform with real-time updates, user authentication, and animated UI. Built with Supabase for backend, React Query for data fetching, and Framer Motion for smooth transitions.",
      stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS 4", "React Query", "Framer Motion", "Zustand"],
      status: "completed",
      code: `// News feed with real-time subscription
const { data: news } = useQuery({
  queryKey: ['news'],
  queryFn: fetchNews,
});

supabase.channel('news')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'articles' },
    (payload) => addNewArticle(payload.new)
  )
  .subscribe();`,
      codeLink: "https://github.com/anarky/news",
      demoLink: "#",
      docsLink: "#",
    },
    {
      name: "PIXEL_ART_CONVERTER",
      description: "Image-to-pixel-art converter with customizable settings and user gallery. Features JWT authentication, PostgreSQL database with Drizzle ORM, and Sharp for high-performance image processing.",
      stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Drizzle ORM", "Sharp", "Tailwind CSS", "JWT"],
      status: "completed",
      code: `// Pixel art conversion pipeline
async function convertToPixelArt(
  input: Buffer, 
  pixelSize: number
): Promise<Buffer> {
  const image = sharp(input);
  const { width, height } = await image.metadata();
  
  return image
    .resize(Math.floor(width / pixelSize), 
            Math.floor(height / pixelSize), 
            { kernel: 'nearest' })
    .toBuffer();
}`,
      codeLink: "https://github.com/anarky/pixel-art-converter",
      demoLink: "#",
      docsLink: "#",
    },
    {
      name: "BLOG_PLATFORM",
      description: "Full-stack blog platform with JWT authentication, full-text search, tags, and user profiles. Built with Feature-Sliced Design architecture for scalability, smooth scroll with Lenis, and Zod validation.",
      stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Drizzle ORM", "Framer Motion", "Lenis", "Zod", "JWT"],
      status: "completed",
      code: `// Post search with full-text query
const posts = await db.select()
  .from(postsTable)
  .where(
    sql\`to_tsvector('english', 
      postsTable.title || ' ' || postsTable.content)
      @@ to_tsquery('english', \${query})\`
  )
  .orderBy(desc(postsTable.createdAt))
  .limit(20);`,
      codeLink: "https://github.com/anarky/blog-platform",
      demoLink: "#",
      docsLink: "#",
    },
    {
      name: "CORE_FRAMEWORK",
      description: "Core framework and shared libraries for microservices architecture. Built with Nx monorepo, NestJS, Express, and Zod for type-safe contracts. Provides reusable infrastructure drivers and domain modules.",
      stack: ["NestJS 11", "Nx", "TypeScript", "Express 5", "Zod", "RxJS", "Jest"],
      status: "in-progress",
      code: `@Injectable()
export class CoreModule {
  constructor(
    private readonly config: ConfigService,
    private readonly grpc: GrpcClient,
    private readonly redis: RedisDriver,
  ) {}

  async initialize(): Promise<void> {
    await this.grpc.connect(this.config.grpc);
    await this.redis.ping();
    this.logger.log('Core services initialized');
  }
}`,
      codeLink: "#",
    },
    {
      name: "SAAS_PLATFORM",
      description: "Microservices SaaS platform with GraphQL Federation, gRPC inter-service communication, and CQRS/DDD architecture. Includes auth, user management, API gateway, and Next.js frontend.",
      stack: ["NestJS 11", "GraphQL Federation", "gRPC", "CQRS", "Apollo Gateway", "Bull (Redis)", "Drizzle ORM", "Next.js"],
      status: "in-progress",
      code: `@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.GRPC },
    ]),
  ],
})
export class ApiGatewayModule {}`,
      codeLink: "#",
    },
  ];

  const completedProjects = projects.filter(p => p.status === "completed").map((p, i) => ({ ...p, video: `/projects/${i + 1}.mp4` }));
  const inProgressProjects = projects.filter(p => p.status === "in-progress");

  return (
    <section 
      id="projects" 
      ref={ref}
      className={`px-6 py-8 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
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
                    className={`card transition-all duration-700 ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } flex flex-col h-full group relative`}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
                    className={`card transition-all duration-700 ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } flex flex-col h-full group relative border-yellow-400/30`}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  return (
    <section 
      id="resume" 
      ref={ref}
      className={`px-6 py-8 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> cat RESUME.PDF
          </h2>
          
          <div className="flex flex-col gap-6">
          <div className="card contact-card animate-fade-in-delay-1 opacity-0">
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
                    title: "FRONTEND DEVELOPER",
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

const SPINNER_CHARS = ["[    ]", "[ █  ]", "[  █ ]", "[   █]"];

function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerError(data.error || "Request failed");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setServerError("Network error");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
    setServerError("");
  };

  return (
    <section id="contact" className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8" ref={ref}>
          <h2 className="section-title text-white">
            <span className="highlight">$</span> ./CONTACT.SH
          </h2>

          <div className={`card transition-all duration-700 ${inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <a href="mailto:roman.ivanov@email.com" className="flex items-center gap-3 p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[EMAIL]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-sm truncate">roman.ivanov@email.com</div>
                </div>
              </a>

              <a href="https://github.com/romanivanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.74c0 .27.16.59.67.5C21.14 20.16 24 16.42 24 12A10 10 0 0012 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[GITHUB]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-sm truncate">github.com/romanivanov</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/romanivanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[LINKEDIN]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-sm truncate">linkedin.com/in/romanivanov</div>
                </div>
              </a>

              <a href="https://t.me/romanivanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[TELEGRAM]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-sm truncate">t.me/romanivanov</div>
                </div>
              </a>
            </div>
          </div>

          <div className={`card transition-all duration-700 ${inView ? "animate-fade-in delay-200" : "opacity-0"}`}>
            <div className="card-header">SEND_MESSAGE.SH</div>

            {status === "loading" ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <span className="text-accent font-mono text-4xl tabular-nums">{SPINNER_CHARS[spinnerFrame]}</span>
              </div>
            ) : status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <p className="text-green-400 font-mono text-center text-lg">
                  <span className="highlight">$</span> ./send_message.sh: success
                </p>
                <button onClick={handleReset} className="btn mt-4">
                  SEND_ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> NAME=
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    autoComplete="name"
                    className={`w-full bg-card-bg border font-mono px-4 py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none ${errors.name ? "border-red-400" : "border-white/30"}`}
                    placeholder="user_name"
                  />
                  {errors.name && <span id="name-error" className="text-red-400 text-sm font-mono mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> EMAIL=
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    autoComplete="email"
                    className={`w-full bg-card-bg border font-mono px-4 py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none ${errors.email ? "border-red-400" : "border-white/30"}`}
                    placeholder="user@email.com"
                  />
                  {errors.email && <span id="email-error" className="text-red-400 text-sm font-mono mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> MESSAGE=
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    aria-label="Message"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={4}
                    autoComplete="off"
                    className={`w-full bg-card-bg border font-mono px-4 py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none resize-none ${errors.message ? "border-red-400" : "border-white/30"}`}
                    placeholder="your message here..."
                  />
                  {errors.message && <span id="message-error" className="text-red-400 text-sm font-mono mt-1 block">{errors.message}</span>}
                </div>
                {status === "error" && (
                  <p className="text-red-400 font-mono text-center">
                    <span className="highlight">$</span> ./send_message.sh: error: {serverError}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary self-center px-8 py-3 text-base uppercase tracking-wider"
                >
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
"use client";

import { useState } from "react";
import VideoPreview from "@/components/VideoPreview";
import { useInView } from "@/hooks/useInView";
import { projects, INITIAL_COUNT } from "@/lib/projects";

export default function ProjectsSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  const [showAll, setShowAll] = useState(false);
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());

  const completedProjects = projects.filter(p => p.status !== "in-progress");
  const inProgressProjects = projects.filter(p => p.status === "in-progress");

  const completedWithVideo = completedProjects.map((p, i) => ({ ...p, video: `/projects/${i + 1}.mp4` }));
  const inProgressWithVideo = inProgressProjects.map((p, i) => ({ ...p, video: `/projects/${completedProjects.length + i + 1}.mp4` }));

  const completedVisible = showAll ? completedWithVideo : completedWithVideo.slice(0, INITIAL_COUNT);

  const handleToggleShowAll = () => {
    if (!showAll) {
      setShowAll(true);
      const newIds = new Set(completedWithVideo.slice(INITIAL_COUNT).map(p => p.name));
      setAnimatingIds(newIds);
      setTimeout(() => setAnimatingIds(new Set()), completedWithVideo.slice(INITIAL_COUNT).length * 200 + 800);
    } else {
      setShowAll(false);
      setAnimatingIds(new Set());
      const el = document.getElementById("projects");
      if (el) {
        const headerOffset = 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className={`px-4 py-12 sm:px-6 sm:py-16 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-foreground mb-10">
          <span className="text-accent">//</span> Featured Projects
        </h2>

        {completedVisible.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <h3 className="text-lg font-semibold text-foreground">
                Completed
              </h3>
              <span className="text-muted text-sm">({completedProjects.length})</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {completedVisible.map((project, index) => {
                const isExtra = index >= INITIAL_COUNT;
                const extraIndex = index - INITIAL_COUNT;
                return (
                  <div 
                    key={project.name} 
                    className={`card flex flex-col h-full group ${
                      inView && !isExtra ? "opacity-100 translate-y-0" : ""
                    } ${
                      isExtra && !animatingIds.has(project.name) ? "opacity-100 translate-y-0" : ""
                    } ${
                      inView && !showAll && !isExtra ? "transition-all duration-700" : ""
                    }`}
                    style={
                      isExtra && animatingIds.has(project.name)
                        ? { animation: `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`, animationDelay: `${extraIndex * 200}ms`, opacity: 0 }
                        : !isExtra ? { transitionDelay: `${index * 100}ms` }
                        : undefined
                    }
                  >
                    <h4 className="font-semibold text-foreground text-lg mb-3">
                      {project.name}
                    </h4>
                    
                    <VideoPreview videoSrc={project.video} />
                    
                    <p className="text-foreground/70 text-sm mb-4 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent rounded border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <a 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary text-center text-sm"
                        aria-label={`Source code of ${project.name}`}
                      >
                        View Code
                      </a>
                      {project.demoLink ? (
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary text-center text-sm"
                          aria-label={`Demo of ${project.name}`}
                        >
                          Live Demo
                        </a>
                      ) : project.docsLink ? (
                        <a 
                          href={project.docsLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary text-center text-sm"
                          aria-label={`Documentation of ${project.name}`}
                        >
                          Docs
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {completedProjects.length > INITIAL_COUNT && (
          <div className="flex justify-center pt-8">
            <button
              onClick={handleToggleShowAll}
              className="btn btn-secondary px-8"
            >
              {showAll ? "Show Less" : `Show More (${completedProjects.length - INITIAL_COUNT})`}
            </button>
          </div>
        )}

        {inProgressProjects.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <h3 className="text-lg font-semibold text-foreground">
                In Progress
              </h3>
              <span className="text-muted text-sm">({inProgressProjects.length})</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {inProgressWithVideo.map((project, index) => (
                <div 
                  key={project.name} 
                  className={`card transition-all duration-700 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } flex flex-col h-full group border-yellow-400/30 hover:border-yellow-400/50`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-foreground text-lg">
                      {project.name}
                    </h4>
                    <span className="px-2 py-0.5 text-xs bg-yellow-400/10 text-yellow-400 rounded border border-yellow-400/20">
                      WIP
                    </span>
                  </div>
                  
                  <div className="aspect-video bg-gradient-to-br from-card-bg to-background border border-border rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    <div className="text-center z-10">
                      <div className="text-3xl mb-2">{"</>"}</div>
                      <span className="text-muted text-sm">Work in Progress</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/60 text-sm mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 text-xs font-medium bg-yellow-400/10 text-yellow-400/80 rounded border border-yellow-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <a 
                      href={project.codeLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary w-full text-center text-sm text-yellow-400/70 hover:text-yellow-400 border-yellow-400/30 hover:border-yellow-400"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

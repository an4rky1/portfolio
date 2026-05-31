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
      className={`px-4 py-16 sm:px-6 sm:py-20 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-foreground">
          <span className="text-accent">{"//"}</span> PROJECTS
        </h2>

        {completedVisible.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="marker">COMPLETED</span>
              <span className="text-muted text-sm font-mono">({completedProjects.length})</span>
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
                      inView && !showAll && !isExtra ? "transition-all duration-500" : ""
                    }`}
                    style={
                      isExtra && animatingIds.has(project.name)
                        ? { animation: `slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`, animationDelay: `${extraIndex * 150}ms`, opacity: 0 }
                        : !isExtra ? { transitionDelay: `${index * 100}ms` }
                        : undefined
                    }
                  >
                    {/* Project number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-accent font-mono text-3xl font-black">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h4 className="font-bold text-foreground text-lg mb-4 uppercase tracking-wide">
                      {project.name}
                    </h4>
                    
                    <VideoPreview videoSrc={project.video} />
                    
                    <p className="text-muted text-sm mb-6 flex-grow leading-relaxed font-mono">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="tag text-accent border-accent"
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
                        className="btn btn-primary text-center text-xs"
                        aria-label={`Source code of ${project.name}`}
                      >
                        [CODE]
                      </a>
                      {project.demoLink ? (
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary text-center text-xs"
                          aria-label={`Demo of ${project.name}`}
                        >
                          [DEMO]
                        </a>
                      ) : project.docsLink ? (
                        <a 
                          href={project.docsLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary text-center text-xs"
                          aria-label={`Documentation of ${project.name}`}
                        >
                          [DOCS]
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
          <div className="flex justify-center pt-10">
            <button
              onClick={handleToggleShowAll}
              className="btn btn-secondary"
            >
              {showAll ? "[SHOW_LESS]" : `[SHOW_MORE] +${completedProjects.length - INITIAL_COUNT}`}
            </button>
          </div>
        )}

        {inProgressProjects.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-yellow-400 text-background px-2 py-1 text-xs font-black uppercase tracking-wide">
                IN_PROGRESS
              </span>
              <span className="text-muted text-sm font-mono">({inProgressProjects.length})</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {inProgressWithVideo.map((project, index) => (
                <div 
                  key={project.name} 
                  className={`card transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } flex flex-col h-full group border-yellow-400/50 hover:border-yellow-400`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">
                      {project.name}
                    </h4>
                    <span className="bg-yellow-400/20 text-yellow-400 px-2 py-0.5 text-xs font-bold border-2 border-yellow-400/50">
                      WIP
                    </span>
                  </div>
                  
                  <div className="aspect-video bg-card-bg border-3 border-border mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                    <div className="text-center z-10">
                      <div className="text-4xl font-black text-yellow-400/50 mb-2">{"{ }"}</div>
                      <span className="text-muted text-xs font-mono uppercase tracking-wider">Building...</span>
                    </div>
                  </div>
                  
                  <p className="text-muted text-sm mb-6 flex-grow leading-relaxed font-mono">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map(tech => (
                      <span 
                        key={tech} 
                        className="tag text-yellow-400 border-yellow-400/50"
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
                      className="btn btn-secondary w-full text-center text-xs text-yellow-400 border-yellow-400/50 hover:border-yellow-400 hover:bg-yellow-400 hover:text-background"
                    >
                      [VIEW_CODE]
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

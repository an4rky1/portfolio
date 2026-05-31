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
      className={`px-4 py-6 sm:px-6 sm:py-8 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <h2 className="section-title text-white">
            <span className="highlight">$</span> ls -la PROJECTS.DIR/
          </h2>

          {completedVisible.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <h3 className="text-lg font-bold text-accent font-mono">COMPLETED</h3>
                <span className="text-gray-500 text-base">({completedProjects.length})</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {completedVisible.map((project, index) => {
                  const isExtra = index >= INITIAL_COUNT;
                  const extraIndex = index - INITIAL_COUNT;
                  return (
                    <div 
                      key={project.name} 
                      className={`card flex flex-col h-full group relative ${
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
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/50 group-hover:border-accent"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/50 group-hover:border-accent"></div>
                      <div className="card-header">{project.name}</div>
                      
                      <VideoPreview videoSrc={project.video} />
                      
                      <p className="text-base mb-4 flex-grow">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.stack.map(tech => (
                          <span key={tech} className="relative border border-white/20 bg-transparent px-2 py-0.5 text-xs sm:text-sm lg:text-base text-accent font-mono uppercase tracking-wider hover:bg-accent/20 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-center" aria-label={`Source code of ${project.name}`}>
                          <span className="relative z-10">CODE</span>
                        </a>
                        {project.demoLink ? (
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-center group" aria-label={`Demo of ${project.name}`}>
                            <span className="relative z-10 group-hover:text-accent transition-colors">DEMO <span className="text-accent text-base group-hover:text-background">↗</span></span>
                          </a>
                        ) : project.docsLink ? (
                          <a href={project.docsLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-center group" aria-label={`Documentation of ${project.name}`}>
                            <span className="relative z-10 group-hover:text-accent transition-colors">DOCS</span>
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
            <div className="flex justify-center pt-2">
              <button
                onClick={handleToggleShowAll}
                className="btn btn-secondary px-8 py-3 text-base uppercase tracking-wider group"
              >
                <span className="relative z-10 group-hover:text-accent transition-colors">
                  {showAll ? (
                    <>SHOW_LESS <span className="text-accent group-hover:text-background">↑</span></>
                  ) : (
                    <>SHOW_MORE ({completedProjects.length - INITIAL_COUNT}) <span className="text-accent group-hover:text-background">↓</span></>
                  )}
                </span>
              </button>
            </div>
          )}

          {inProgressProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4 mt-8">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-yellow-400 font-mono">IN_PROGRESS</h3>
                <span className="text-gray-500 text-base">({inProgressProjects.length})</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {inProgressWithVideo.map((project, index) => (
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
                        <div className="text-2xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
                        <span className="text-yellow-400/60 text-xs sm:text-base">WORK_IN_PROGRESS</span>
                      </div>
                    </div>
                    
                    <p className="text-base mb-4 flex-grow text-gray-400">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map(tech => (
                        <span key={tech} className="relative border border-yellow-400/20 bg-yellow-400/5 px-2 py-0.5 text-xs sm:text-sm lg:text-base text-yellow-400/70 font-mono uppercase tracking-wider hover:bg-yellow-400/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-center">
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

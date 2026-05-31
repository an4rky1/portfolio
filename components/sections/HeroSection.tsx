"use client";

import { useEffect, useState } from "react";

const roles = [
  "FULLSTACK_DEV",
  "BACKEND_ENG", 
  "API_ARCHITECT",
  "PROBLEM_SOLVER",
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-3 border-accent opacity-20 hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-accent opacity-10 hidden lg:block" />
      <div className="absolute top-1/3 right-10 w-2 h-40 bg-foreground opacity-10 hidden lg:block" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Terminal-style greeting */}
        <div className="inline-block mb-8 animate-fade-in">
          <span className="marker">HELLO_WORLD</span>
        </div>

        {/* Name - Big and bold */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 animate-fade-in-delay-1 tracking-tighter">
          ROMAN
          <br />
          <span className="text-accent">IVANOV</span>
        </h1>

        {/* Animated role - Terminal style */}
        <div className="h-12 sm:h-14 flex items-center justify-center mb-8 animate-fade-in-delay-2">
          <div className="border-3 border-foreground px-4 py-2 bg-card-bg inline-flex items-center gap-2">
            <span className="text-accent">{">"}</span>
            <span className="text-base sm:text-lg font-mono text-foreground">
              {displayText}
            </span>
            <span className="animate-caret-blink text-accent font-bold">_</span>
          </div>
        </div>

        {/* Description - Raw and direct */}
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-3 font-mono">
          Building scalable backend systems. Designing clean APIs.
          <br className="hidden sm:block" />
          Creating performant web applications.
        </p>

        {/* CTA Buttons - Brutalist style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
          <a
            href="#projects"
            className="btn btn-primary"
          >
            [VIEW_PROJECTS]
          </a>
          <a
            href="#contact"
            className="btn btn-secondary"
          >
            [CONTACT_ME]
          </a>
        </div>

        {/* Scroll indicator - Brutalist */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
          <span className="text-muted text-xs font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-foreground/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

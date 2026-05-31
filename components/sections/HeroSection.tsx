"use client";

import { useEffect, useState } from "react";

const roles = [
  "Fullstack Developer",
  "Backend Engineer", 
  "API Architect",
  "Problem Solver",
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
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card-bg opacity-50" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Greeting */}
        <p className="text-foreground/60 text-sm sm:text-base mb-4 animate-fade-in tracking-wider">
          Hi, my name is
        </p>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-in-delay-1">
          Roman Ivanov
        </h1>

        {/* Animated role */}
        <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center mb-6 animate-fade-in-delay-2">
          <span className="text-xl sm:text-2xl md:text-3xl text-accent font-medium">
            {displayText}
            <span className="animate-caret-blink text-accent">|</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-delay-3">
          I build scalable backend systems, design clean APIs, and create 
          performant web applications. Passionate about code quality, 
          system architecture, and solving complex problems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
          <a
            href="#projects"
            className="btn btn-primary px-8 py-3 text-base font-semibold"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="btn btn-secondary px-8 py-3 text-base font-semibold"
          >
            Contact Me
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

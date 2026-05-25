"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const ABOUT_ME = `/**
 * Roman Ivanov — Fullstack Developer
 * 3+ years of professional experience
 * Remote-first, based in Eastern Europe
 *
 * Passionate about building scalable backend systems,
 * clean APIs, and performant web applications.
 * Currently diving deep into Rust and systems programming.
 */

interface Developer {
  name: string;
  title: string;
  email: string;
  experience: number;
  focus: string[];
  remote: boolean;
  available: boolean;
}

const developer: Developer = {
  name: "Roman Ivanov",
  title: "Fullstack Developer",
  email: "roman.ivanov@email.com",
  experience: 3,
  focus: [
    "Backend Development",
    "API Design & Architecture",
    "Database Optimization",
    "DevOps & Infrastructure",
    "System Design",
  ],
  remote: true,
  available: true,
};

// Currently focused on backend development,
// building high-performance APIs and working
// with complex database systems like PostgreSQL,
// Redis, and Elasticsearch.
//
// Also do frontend when needed — React, Next.js,
// and the modern JavaScript/TypeScript ecosystem.
// Comfortable with full-stack development.
//
// Actively learning Rust for systems programming
// and exploring WebAssembly for browser-side
// performance-critical workloads.
//
// Interested in clean code, performance optimization,
// distributed systems, and developer tooling.
// Always looking for new challenges and opportunities
// to grow as a developer.`;

const SKILLS_JSON = `{
  "languages": {
    "primary": ["Python", "Go", "TypeScript"],
    "secondary": ["JavaScript", "Rust", "PHP", "SQL", "C"],
    "learning": ["WebAssembly", "Zig"]
  },

  "frameworks": {
    "backend": ["FastAPI", "Django", "Laravel", "Symfony", "Node.js"],
    "frontend": ["React", "Next.js", "Vue.js"],
    "testing": ["pytest", "Jest", "Cypress"]
  },

  "databases": {
    "relational": ["PostgreSQL", "MySQL"],
    "nosql": ["MongoDB", "Redis"],
    "search": ["Elasticsearch"]
  },

  "infrastructure": {
    "containers": ["Docker", "Kubernetes"],
    "cloud": ["AWS", "GCP"],
    "iac": ["Terraform", "Ansible"],
    "cicd": ["GitHub Actions", "GitLab CI"]
  },

  "proficiency": {
    "Python": 90,
    "Go": 75,
    "TypeScript": 85,
    "Rust": 60,
    "PHP": 80
  }
}`;

function highlightTSLine(line: string) {
  if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("/**") || line.trim().startsWith("*/")) {
    return <span className="text-gray-300 italic">{line}</span>;
  }

  const parts: React.ReactNode[] = [];
  const remaining = line;
  let key = 0;

  const keywords = /\b(interface|const|export|default|type|import|from|string|number|boolean|void|null|undefined|true|false|enum|new|async|await)\b/g;
  const strings = /"[^"]*"/g;
  const numbers = /\b(\d+)\b/g;
  const punctuations = /[{}[\]();:=<>]/g;

  const tokens: { start: number; end: number; type: string; value: string }[] = [];

  let m;
  while ((m = keywords.exec(remaining)) !== null) {
    tokens.push({ start: m.index, end: m.index + m[0].length, type: "keyword", value: m[0] });
  }
  while ((m = strings.exec(remaining)) !== null) {
    tokens.push({ start: m.index, end: m.index + m[0].length, type: "string", value: m[0] });
  }
  while ((m = numbers.exec(remaining)) !== null) {
    if (!tokens.some(t => t.start <= m!.index && t.end >= m!.index + m![0].length)) {
      tokens.push({ start: m.index, end: m.index + m[0].length, type: "number", value: m[0] });
    }
  }
  while ((m = punctuations.exec(remaining)) !== null) {
    if (!tokens.some(t => t.start <= m!.index && t.end >= m!.index + m![0].length)) {
      tokens.push({ start: m.index, end: m.index + m[0].length, type: "punctuation", value: m[0] });
    }
  }

  tokens.sort((a, b) => a.start - b.start);

  let lastIndex = 0;
  for (const token of tokens) {
    if (token.start > lastIndex) {
      parts.push(remaining.slice(lastIndex, token.start));
    }

    if (/^[A-Z]/.test(token.value) && token.type !== "keyword" && token.type !== "string") {
      parts.push(<span key={key++} className="text-cyan-400">{token.value}</span>);
    } else if (token.type === "keyword") {
      parts.push(<span key={key++} className="text-purple-400">{token.value}</span>);
    } else if (token.type === "string") {
      parts.push(<span key={key++} className="text-green-400">{token.value}</span>);
    } else if (token.type === "number") {
      parts.push(<span key={key++} className="text-orange-400">{token.value}</span>);
    } else if (token.type === "punctuation") {
      parts.push(<span key={key++} className="text-gray-400">{token.value}</span>);
    } else {
      parts.push(<span key={key++} className="text-blue-400">{token.value}</span>);
    }

    lastIndex = token.end;
  }

  if (lastIndex < remaining.length) {
    parts.push(remaining.slice(lastIndex));
  }

  return <>{parts}</>;
}

function highlightJSONLine(line: string) {
  const parts: React.ReactNode[] = [];
  const remaining = line;
  let key = 0;

  const keys = /"([^"]+)"(?=\s*:)/g;
  const strings = /:\s*"([^"]*)"/g;
  const numbers = /:\s*(\d+)/g;
  const punctuations = /[{}[\]]/g;

  const tokens: { start: number; end: number; type: string; value: string }[] = [];

  let m;
  while ((m = keys.exec(remaining)) !== null) {
    tokens.push({ start: m.index, end: m.index + m[0].length, type: "property", value: m[0] });
  }
  while ((m = strings.exec(remaining)) !== null) {
    tokens.push({ start: m.index, end: m.index + m[0].length, type: "string", value: m[0] });
  }
  while ((m = numbers.exec(remaining)) !== null) {
    tokens.push({ start: m.index, end: m.index + m[0].length, type: "number", value: m[0] });
  }
  while ((m = punctuations.exec(remaining)) !== null) {
    if (!tokens.some(t => t.start <= m!.index && t.end >= m!.index + m![0].length)) {
      tokens.push({ start: m.index, end: m.index + m[0].length, type: "punctuation", value: m[0] });
    }
  }

  tokens.sort((a, b) => a.start - b.start);

  let lastIndex = 0;
  for (const token of tokens) {
    if (token.start > lastIndex) {
      parts.push(remaining.slice(lastIndex, token.start));
    }

    if (token.type === "property") {
      parts.push(<span key={key++} className="text-blue-400">{token.value}</span>);
    } else if (token.type === "string") {
      parts.push(<span key={key++} className="text-green-400">{token.value}</span>);
    } else if (token.type === "number") {
      parts.push(<span key={key++} className="text-orange-400">{token.value}</span>);
    } else if (token.type === "punctuation") {
      parts.push(<span key={key++} className="text-gray-400">{token.value}</span>);
    }

    lastIndex = token.end;
  }

  if (lastIndex < remaining.length) {
    parts.push(remaining.slice(lastIndex));
  }

  return <>{parts}</>;
}

export default function CodeResume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [aboutLines, setAboutLines] = useState<string[]>([]);
  const [skillsLines, setSkillsLines] = useState<string[]>([]);
  const [aboutDone, setAboutDone] = useState(false);
  const [skillsDone, setSkillsDone] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const fullLines = ABOUT_ME.split("\n");
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < fullLines.length) {
        setAboutLines(fullLines.slice(0, lineIndex + 1));
        lineIndex++;
      } else {
        clearInterval(interval);
        setAboutDone(true);
        setTimeout(() => setShowSkills(true), 200);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (!inView || !showSkills) return;

    const fullLines = SKILLS_JSON.split("\n");
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < fullLines.length) {
        setSkillsLines(fullLines.slice(0, lineIndex + 1));
        lineIndex++;
      } else {
        clearInterval(interval);
        setSkillsDone(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [inView, showSkills]);

  return (
    <div ref={ref} className="bg-black border border-green-900/50 rounded-lg overflow-hidden font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center bg-gray-900 border-b border-green-900/30 px-3 py-2">
        <div className="flex gap-1.5 mr-3">
          <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
        </div>
        <span className="text-green-500/60 text-xs">roman@portfolio: ~/src</span>
      </div>

      {/* Split Terminal */}
      <div className="flex flex-col md:flex-row min-h-[250px] md:min-h-[450px]">
        {/* About Panel */}
          <div className={`flex-1 p-3 sm:p-4 border-b md:border-b-0 md:border-r border-green-900/30 transition-all duration-500 ${showSkills ? "w-1/2" : "w-full"}`}>
          <div className="text-green-400 mb-2">
            <span className="text-green-500">➜</span>{" "}
            <span className="text-blue-400">~</span>{" "}
            <span className="text-green-400">cat</span> about_me.ts
          </div>
          <div className="text-green-300 leading-5 pl-4 border-l-2 border-green-900/30 text-sm">
            {aboutLines.map((line, i) => (
              <div key={i} className="hover:bg-green-900/10">
                {highlightTSLine(line)}
              </div>
            ))}
            {!aboutDone && (
              <div>
                <span className="animate-pulse text-green-400">█</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Panel */}
        {showSkills && (
          <div className="w-full md:w-1/2 p-3 sm:p-4 animate-fade-in">
            <div className="text-green-400 mb-2">
              <span className="text-green-500">➜</span>{" "}
              <span className="text-blue-400">~</span>{" "}
              <span className="text-green-400">cat</span> skills.json
            </div>
            <div className="text-green-300 leading-6 pl-4 border-l-2 border-green-900/30 text-base">
              {skillsLines.map((line, i) => (
                <div key={i} className="hover:bg-green-900/10">
                  {highlightJSONLine(line)}
                </div>
              ))}
              {!skillsDone && (
                <div>
                  <span className="animate-pulse text-green-400">█</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom prompt */}
      {skillsDone && (
        <div className="px-4 py-2 border-t border-green-900/30 bg-gray-900/50 text-green-400 animate-fade-in">
          <span className="text-green-500">➜</span>{" "}
          <span className="text-blue-400">~</span>{" "}
          <span className="animate-pulse text-green-400">█</span>
        </div>
      )}
    </div>
  );
}

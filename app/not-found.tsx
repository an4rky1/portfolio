"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const terminalLines = [
  { text: "curl -I https://portfolio.romanivanov.dev/nonexistent", isCommand: true, speed: 25 },
  { text: "HTTP/2 404 Not Found", isCommand: false, speed: 15 },
  { text: "Error: page not found in current directory", isCommand: false, speed: 15 },
];

export default function NotFound() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (lineIdx >= terminalLines.length) {
      const timer = setTimeout(() => setShowHome(true), 600);
      return () => clearTimeout(timer);
    }

    const currentLine = terminalLines[lineIdx];
    if (charIdx < currentLine.text.length) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), currentLine.speed);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [lineIdx, charIdx]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono relative flex items-center justify-center">
      <div className="scanline fixed inset-0 pointer-events-none z-50 opacity-30" />

      <div className="max-w-2xl w-full px-6 py-12">
        <pre className="text-accent text-center text-sm md:text-base leading-relaxed mb-10 font-mono tracking-wider">
{`  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  █ 4 0 4 : N O T _ F O U N D █
  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`}
        </pre>

        <div className="space-y-1">
          {terminalLines.map((line, idx) => {
            if (idx < lineIdx) {
              return (
                <div key={idx} className="text-base text-foreground">
                  {line.isCommand && <span className="text-accent">$ </span>}
                  {line.text}
                </div>
              );
            }
            if (idx === lineIdx) {
              return (
                <div key={idx} className="text-base text-foreground">
                  {line.isCommand && <span className="text-accent">$ </span>}
                  {line.text.slice(0, charIdx)}
                  <span className="cursor" />
                </div>
              );
            }
            return null;
          })}
        </div>

        {showHome && (
          <div className="mt-6 animate-fade-in">
            <Link
              href="/"
              className="text-foreground hover:text-accent transition-colors text-base no-underline hover:underline inline-flex items-center"
            >
              <span className="text-accent">$</span>&nbsp;cd ~ &amp;&amp; ./go_home.sh
              <span className="cursor ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

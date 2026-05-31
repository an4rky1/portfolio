"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

const CodeResume = dynamic(() => import("@/components/CodeResume"), {
  loading: () => (
    <div className="bg-black border border-green-900/50 rounded-lg p-4 animate-pulse">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
      </div>
      <div className="text-green-500/40 text-sm">Loading terminal...</div>
    </div>
  ),
});

export default function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  return (
    <section 
      id="about" 
      ref={ref}
      className={`px-4 py-6 sm:px-6 sm:py-8 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <h2 className="section-title text-white">
              <span className="highlight">$</span> cat ABOUT_ME.md
          </h2>
          
          <div className="bg-[#1a1b26] border border-[#292e42] rounded-lg p-6 overflow-x-auto">
            <CodeResume />
          </div>
        </div>
      </div>
    </section>
  );
}

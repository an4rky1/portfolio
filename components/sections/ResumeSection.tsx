"use client";

import { useInView } from "@/hooks/useInView";

const experience = [
  {
    title: "NEXT.JS DEVELOPER",
    company: "Freelance",
    period: "2024 - 2025",
    achievements: [
      "Built production React/Next.js applications with TypeScript",
      "Implemented server-side rendering and static generation",
      "Optimized bundle size and improved Core Web Vitals",
    ],
  },
  {
    title: "LARAVEL FULLSTACK DEVELOPER",
    company: "CipherTech",
    period: "2024 - 2025",
    achievements: [
      "Developed RESTful APIs and real-time features with Laravel",
      "Integrated Vue.js frontend with Laravel backend",
      "Implemented authentication and payment systems",
    ],
  },
  {
    title: "SYMFONY FULLSTACK DEVELOPER",
    company: "Vertex Labs",
    period: "2023 - 2024",
    achievements: [
      "Built enterprise applications using Symfony framework",
      "Worked with PostgreSQL, Redis, and Elasticsearch",
      "Implemented REST APIs and microservices architecture",
    ],
  },
  {
    title: "FRONTEND DEVELOPER",
    company: "Freelance",
    period: "2022 - 2023",
    achievements: [
      "Created responsive websites using HTML, CSS, JavaScript",
      "Worked with React.js and basic state management",
      "Collaborated with designers to implement UI/UX",
    ],
  },
];

export default function ResumeSection({
  onDownloadPDF,
}: {
  onDownloadPDF: () => void;
}) {
  const { ref, inView } = useInView<HTMLElement>({ triggerOnce: true });
  return (
    <section
      id="resume"
      ref={ref}
      className={`px-4 py-6 sm:px-6 sm:py-8 transition-all duration-700 ${
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
                {experience.map((job, idx) => (
                  <div
                    key={idx}
                    className="relative pl-5 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <div className="absolute left-0 top-1 w-2 h-2 bg-accent rounded-full"></div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {job.title}
                    </h3>
                    <p className="text-accent text-sm sm:text-base mt-1">
                      {job.company} <span className="text-gray-500">|</span>{" "}
                      {job.period}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-gray-400">
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
                  <h3 className="text-white font-bold text-sm sm:text-base">
                    COMPUTER SCIENCE
                  </h3>
                  <p className="text-accent text-sm sm:text-base mt-1">
                    Donbas State Engineering Academy
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    2018 - 2023
                  </p>
                </div>

                <div className="relative pl-5">
                  <div className="absolute left-0 top-1 w-2 h-2 bg-white/50 rounded-full"></div>
                  <h3 className="text-white font-bold text-sm sm:text-base">
                    APPLIED MATHEMATICS
                  </h3>
                  <p className="text-accent text-sm sm:text-base mt-1">
                    Horlivka Technical College
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    2011 - 2014
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={onDownloadPDF}
                  className="btn btn-primary w-full text-center block text-sm sm:text-base py-2"
                >
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

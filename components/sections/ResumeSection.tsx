"use client";

import { useInView } from "@/hooks/useInView";

const experience = [
  {
    title: "Next.js Developer",
    company: "Freelance",
    period: "2024 - 2025",
    achievements: [
      "Built production React/Next.js applications with TypeScript",
      "Implemented server-side rendering and static generation",
      "Optimized bundle size and improved Core Web Vitals",
    ],
  },
  {
    title: "Laravel Fullstack Developer",
    company: "CipherTech",
    period: "2024 - 2025",
    achievements: [
      "Developed RESTful APIs and real-time features with Laravel",
      "Integrated Vue.js frontend with Laravel backend",
      "Implemented authentication and payment systems",
    ],
  },
  {
    title: "Symfony Fullstack Developer",
    company: "Vertex Labs",
    period: "2023 - 2024",
    achievements: [
      "Built enterprise applications using Symfony framework",
      "Worked with PostgreSQL, Redis, and Elasticsearch",
      "Implemented REST APIs and microservices architecture",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Freelance",
    period: "2022 - 2023",
    achievements: [
      "Created responsive websites using HTML, CSS, JavaScript",
      "Worked with React.js and basic state management",
      "Collaborated with designers to implement UI/UX",
    ],
  },
];

const education = [
  {
    degree: "Computer Science",
    school: "Donbas State Engineering Academy",
    period: "2018 - 2023",
  },
  {
    degree: "Applied Mathematics",
    school: "Horlivka Technical College",
    period: "2011 - 2014",
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
      className={`px-4 py-12 sm:px-6 sm:py-16 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-foreground mb-10">
          <span className="text-accent">//</span> Experience & Education
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experience */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Work Experience
            </h3>

            <div className="space-y-4">
              {experience.map((job, idx) => (
                <div
                  key={idx}
                  className="card group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h4 className="font-semibold text-foreground">
                      {job.title}
                    </h4>
                    <span className="text-sm text-muted">
                      {job.period}
                    </span>
                  </div>
                  
                  <p className="text-accent text-sm mb-3">
                    {job.company}
                  </p>

                  <ul className="space-y-1.5">
                    {job.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-sm text-foreground/70 flex gap-2"
                      >
                        <span className="text-accent/50 mt-1">-</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Download */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Education
            </h3>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="card">
                  <h4 className="font-semibold text-foreground mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-accent text-sm mb-1">
                    {edu.school}
                  </p>
                  <p className="text-sm text-muted">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>

            {/* Download button */}
            <div className="pt-4">
              <button
                onClick={onDownloadPDF}
                className="btn btn-primary w-full"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

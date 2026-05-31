"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { validateContactForm, hasErrors, type ContactFormData, type ContactFormErrors } from "@/lib/contact";

const SPINNER_CHARS = ["[    ]", "[ █  ]", "[  █ ]", "[   █]"];

export default function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerError(data.error || "Request failed");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setServerError("Network error");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
    setServerError("");
  };

  return (
    <section id="contact" className="px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8" ref={ref}>
          <h2 className="section-title text-white">
            <span className="highlight">$</span> ./CONTACT.SH
          </h2>

          <div className={`card transition-all duration-700 ${inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <a href="mailto:roman.ivanov@email.com" className="flex items-center gap-3 p-3 sm:p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent/70 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[EMAIL]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-xs sm:text-sm truncate">roman.ivanov@email.com</div>
                </div>
              </a>

              <a href="https://github.com/romanivanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 sm:p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.74c0 .27.16.59.67.5C21.14 20.16 24 16.42 24 12A10 10 0 0012 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[GITHUB]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-xs sm:text-sm truncate">github.com/romanivanov</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/romanivanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 sm:p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[LINKEDIN]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-xs sm:text-sm truncate">linkedin.com/in/romanivanov</div>
                </div>
              </a>

              <a href="https://t.me/romanivanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 sm:p-4 border border-white/10 hover:border-accent hover:bg-accent/5 transition-all group rounded no-underline">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all rounded">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent/60 font-mono text-xs group-hover:text-accent transition-colors">[TELEGRAM]</div>
                  <div className="text-foreground/70 group-hover:text-accent transition-colors font-mono text-xs sm:text-sm truncate">t.me/romanivanov</div>
                </div>
              </a>
            </div>
          </div>

          <div className={`card transition-all duration-700 ${inView ? "animate-fade-in delay-200" : "opacity-0"}`}>
            <div className="card-header">SEND_MESSAGE.SH</div>

            {status === "loading" ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <span className="text-accent font-mono text-4xl tabular-nums">{SPINNER_CHARS[spinnerFrame]}</span>
              </div>
            ) : status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <p className="text-green-400 font-mono text-center text-lg">
                  <span className="highlight">$</span> ./send_message.sh: success
                </p>
                <button onClick={handleReset} className="btn mt-4">
                  SEND_ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> NAME=
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    autoComplete="name"
                    className={`w-full bg-card-bg border font-mono px-3 py-2.5 sm:px-4 sm:py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none ${errors.name ? "border-red-400" : "border-white/30"}`}
                    placeholder="user_name"
                  />
                  {errors.name && <span id="name-error" className="text-red-400 text-sm font-mono mt-1 block">{errors.name}</span>}
                </div>
                <div suppressHydrationWarning>
                  <label htmlFor="contact-email" className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> EMAIL=
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    autoComplete="email"
                    className={`w-full bg-card-bg border font-mono px-3 py-2.5 sm:px-4 sm:py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none ${errors.email ? "border-red-400" : "border-white/30"}`}
                    placeholder="user@email.com"
                    data-1p-ignore
                    data-lpignore="true"
                  />
                  {errors.email && <span id="email-error" className="text-red-400 text-sm font-mono mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-base font-mono uppercase tracking-wider mb-2">
                    <span className="highlight">$</span> MESSAGE=
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    aria-label="Message"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={4}
                    autoComplete="off"
                    className={`w-full bg-card-bg border font-mono px-3 py-2.5 sm:px-4 sm:py-3 text-foreground placeholder-gray-600 transition-all duration-300 rounded-none resize-none ${errors.message ? "border-red-400" : "border-white/30"}`}
                    placeholder="your message here..."
                  />
                  {errors.message && <span id="message-error" className="text-red-400 text-sm font-mono mt-1 block">{errors.message}</span>}
                </div>
                {status === "error" && (
                  <p className="text-red-400 font-mono text-center">
                    <span className="highlight">$</span> ./send_message.sh: error: {serverError}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary self-center px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base uppercase tracking-wider"
                >
                  <span className="highlight">$</span> ./send_message.sh
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

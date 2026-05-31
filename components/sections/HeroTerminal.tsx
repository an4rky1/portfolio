"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

type CommandOutput = {
  command: string;
  output: React.ReactNode;
};

const COMMANDS: Record<string, () => React.ReactNode> = {
  help: () => (
    <div className="space-y-1">
      <p className="text-green-400">Available commands:</p>
      <p><span className="text-cyan-400">whoami</span>    - Display developer info</p>
      <p><span className="text-cyan-400">skills</span>    - Show technical skills</p>
      <p><span className="text-cyan-400">contact</span>   - Get contact information</p>
      <p><span className="text-cyan-400">projects</span>  - View recent projects</p>
      <p><span className="text-cyan-400">social</span>    - Social media links</p>
      <p><span className="text-cyan-400">clear</span>     - Clear terminal</p>
      <p><span className="text-cyan-400">help</span>      - Show this help message</p>
    </div>
  ),
  whoami: () => (
    <div className="space-y-2">
      <p className="text-green-400 font-bold">Roman Ivanov</p>
      <p className="text-gray-300">Fullstack Developer with 3+ years of experience</p>
      <p className="text-gray-400">Building scalable backend systems, clean APIs, and performant web applications.</p>
      <p className="text-gray-400">Currently diving deep into Rust and systems programming.</p>
      <div className="mt-2 flex gap-4">
        <span className="text-green-400">Status:</span>
        <span className="text-green-500">Available for work</span>
      </div>
      <div className="flex gap-4">
        <span className="text-green-400">Location:</span>
        <span className="text-gray-300">Remote (Eastern Europe)</span>
      </div>
    </div>
  ),
  skills: () => (
    <div className="space-y-3">
      <div>
        <p className="text-purple-400 mb-1">Languages:</p>
        <p className="text-gray-300 pl-2">Python, Go, TypeScript, JavaScript, Rust, PHP, SQL, C</p>
      </div>
      <div>
        <p className="text-blue-400 mb-1">Backend:</p>
        <p className="text-gray-300 pl-2">FastAPI, Django, Laravel, Symfony, Node.js</p>
      </div>
      <div>
        <p className="text-cyan-400 mb-1">Frontend:</p>
        <p className="text-gray-300 pl-2">React, Next.js, Vue.js</p>
      </div>
      <div>
        <p className="text-orange-400 mb-1">Databases:</p>
        <p className="text-gray-300 pl-2">PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch</p>
      </div>
      <div>
        <p className="text-pink-400 mb-1">Infrastructure:</p>
        <p className="text-gray-300 pl-2">Docker, Kubernetes, AWS, GCP, Terraform, GitHub Actions</p>
      </div>
    </div>
  ),
  contact: () => (
    <div className="space-y-2">
      <p className="text-green-400">Contact Information:</p>
      <p><span className="text-gray-400">Email:</span> <a href="mailto:roman.ivanov@email.com" className="text-cyan-400 hover:underline">roman.ivanov@email.com</a></p>
      <p><span className="text-gray-400">Telegram:</span> <span className="text-cyan-400">@romanivanov</span></p>
      <p className="text-gray-500 mt-2 text-sm">Or scroll down to the contact form below.</p>
    </div>
  ),
  projects: () => (
    <div className="space-y-2">
      <p className="text-green-400">Recent Projects:</p>
      <p className="text-gray-400 text-sm">Type <span className="text-cyan-400">scroll projects</span> or navigate to projects section below.</p>
      <div className="mt-2 space-y-1">
        <p><span className="text-yellow-400">01.</span> <span className="text-gray-300">High-load API Gateway</span> <span className="text-gray-500">- Go, gRPC, Redis</span></p>
        <p><span className="text-yellow-400">02.</span> <span className="text-gray-300">E-commerce Platform</span> <span className="text-gray-500">- Python, FastAPI, PostgreSQL</span></p>
        <p><span className="text-yellow-400">03.</span> <span className="text-gray-300">Real-time Analytics</span> <span className="text-gray-500">- TypeScript, ClickHouse</span></p>
      </div>
    </div>
  ),
  social: () => (
    <div className="space-y-2">
      <p className="text-green-400">Social Links:</p>
      <p><span className="text-gray-400">GitHub:</span> <a href="https://github.com/an4rky1" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/an4rky1</a></p>
      <p><span className="text-gray-400">LinkedIn:</span> <span className="text-cyan-400">linkedin.com/in/romanivanov</span></p>
      <p><span className="text-gray-400">Twitter:</span> <span className="text-cyan-400">@romanivanov_dev</span></p>
    </div>
  ),
};

export default function HeroTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: "", output: (
      <div className="space-y-1">
        <p className="text-green-400">Welcome to my portfolio terminal!</p>
        <p className="text-gray-400">Type <span className="text-cyan-400">help</span> to see available commands.</p>
      </div>
    )},
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === "") return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const commandFn = COMMANDS[trimmed];
    const output = commandFn 
      ? commandFn() 
      : <p className="text-red-400">Command not found: {trimmed}. Type <span className="text-cyan-400">help</span> for available commands.</p>;

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-4xl">
        <div 
          className="bg-black border border-green-900/50 rounded-lg overflow-hidden font-mono"
          style={{ boxShadow: '0 0 60px rgba(74, 222, 128, 0.1), inset 0 0 40px rgba(0,0,0,0.6)' }}
        >
          {/* Terminal header */}
          <div className="flex items-center bg-gray-900 border-b border-green-900/30 px-4 py-3">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
            </div>
            <span className="text-green-500/70 text-sm">roman@portfolio ~ interactive shell</span>
          </div>

          {/* Terminal body */}
          <div 
            ref={terminalRef}
            onClick={focusInput}
            className="h-[400px] sm:h-[450px] overflow-y-auto p-4 cursor-text"
            style={{ textShadow: '0 0 5px rgba(74, 222, 128, 0.1)' }}
          >
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-gray-300">{item.command}</span>
                  </div>
                )}
                <div className="mt-1 text-sm leading-relaxed pl-5">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">➜</span>
              <span className="text-blue-400">~</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-gray-200 caret-green-400"
                  style={{ caretColor: '#4ade80' }}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>

          {/* Hint bar */}
          <div className="px-4 py-2 bg-gray-900/50 border-t border-green-900/30 text-xs text-gray-500">
            <span className="text-green-500/60">Tip:</span> Use <span className="text-cyan-400/60">Tab</span> to autocomplete, <span className="text-cyan-400/60">Arrow keys</span> for history
          </div>
        </div>
      </div>
    </section>
  );
}

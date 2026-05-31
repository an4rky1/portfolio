export default function Footer() {
  return (
    <footer className="border-t border-white/20 mt-8 sm:mt-16 px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-6xl mx-auto text-center text-sm sm:text-base text-gray-500">
        <p>© {new Date().getFullYear()} Roman Ivanov. All rights reserved.</p>
        <p className="mt-1">
          <span className="highlight">$</span>echo &ldquo;Built with Next.js &amp; TailwindCSS&rdquo;<span className="cursor"></span>
        </p>
      </div>
    </footer>
  );
}

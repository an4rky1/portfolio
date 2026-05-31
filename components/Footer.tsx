export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 px-4 py-8 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} Roman Ivanov. All rights reserved.
        </p>
        <p className="mt-2 text-muted/60 text-xs">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

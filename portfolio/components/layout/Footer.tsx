export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-8 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-wider">
            BERLIN<span className="text-[#FF6B00]">.</span>
          </span>
        </div>
        
        <p className="text-neutral-500 text-sm">
          &copy; {currentYear} Berlin Sugiyanto. Crafted with Next.js & Tailwind.
        </p>
        
      </div>
    </footer>
  );
}

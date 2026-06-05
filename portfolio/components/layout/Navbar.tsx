"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useTheme } from "next-themes";
import { TranslationKey } from "@/data/translations";
import { 
  Home, User, FolderCode, Code2, Briefcase, Award, Mail, 
  ArrowUpRight, Sun, Moon, Languages 
} from "lucide-react";

interface NavItem {
  key: TranslationKey;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { key: "nav_home", href: "#home", icon: Home },
  { key: "nav_about", href: "#about", icon: User },
  { key: "nav_projects", href: "#projects", icon: FolderCode },
  { key: "nav_skills", href: "#skills", icon: Code2 },
  { key: "nav_experience", href: "#experience", icon: Briefcase },
  { key: "nav_certifications", href: "#certifications", icon: Award },
  { key: "nav_contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("nav_home");
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = navItems.map(item => ({
        id: item.key,
        element: document.getElementById(item.href.replace('#', ''))
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i].element;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
    {/* Desktop & Tablet Navigation (Top) */}
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 z-50">
      <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-white/60 dark:bg-black/40 border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-colors duration-300">
        
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
          className="flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-lg"
        >
          <span className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">Berlin</span>
          <span className="text-[#FF6B00] text-2xl font-bold">.</span>
        </a>

        {/* Navigation Items (Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.key;
            const label = t(item.key);

            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.key);
                  const el = document.getElementById(item.href.replace('#', ''));
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative flex flex-col items-center justify-center px-3 min-w-[72px] h-16 rounded-[20px] group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavDesktop"
                    className="absolute inset-0 border-2 border-neutral-200 dark:border-white/10 rounded-[20px] bg-neutral-100 dark:bg-white/5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 mb-1 z-10 transition-colors ${isActive ? "text-[#FF6B00]" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"}`} />
                <span className={`text-[10px] font-semibold tracking-wider z-10 transition-colors ${isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"}`}>
                  {label.toUpperCase()}
                </span>
              </a>
            );
          })}
        </div>

        {/* Controls: i18n, Theme, CTA */}
        <div className="flex items-center gap-3">
          {mounted && (
            <>
              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <Languages className="w-4 h-4" />
                <span className="text-[10px] font-bold ml-1">{language.toUpperCase()}</span>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </>
          )}

          {/* Action Button */}
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[#FF6B00] text-white hover:bg-[#ff4500] hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

      </nav>
    </div>

    {/* Mobile Navigation (Bottom Bar) */}
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] z-50">
      <nav className="flex items-center gap-2 overflow-x-auto overflow-y-hidden no-scrollbar px-2 py-3 rounded-3xl bg-white/90 dark:bg-black/80 border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-colors duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.key;
          const label = t(item.key);

          return (
            <a
              key={`mobile-${item.key}`}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(item.key);
                const el = document.getElementById(item.href.replace('#', ''));
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative flex flex-col items-center justify-center flex-shrink-0 min-w-[72px] h-14 rounded-2xl group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavMobile"
                  className="absolute inset-0 border border-neutral-200 dark:border-white/10 rounded-2xl bg-neutral-100 dark:bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 mb-1 z-10 transition-colors ${isActive ? "text-[#FF6B00]" : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white"}`} />
              <span className={`text-[9px] font-semibold tracking-wider z-10 transition-colors ${isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"}`}>
                {label.toUpperCase()}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
    </>
  );
}

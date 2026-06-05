"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FolderGit2, Clock, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";

const codeSnippet = `// Build reliable backend systems
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/api/students', function () {
        return Student::with('courses')
            ->paginate(15);
    });

    Route::post('/api/auth/login', function (Request $req) {
        $token = JWTAuth::attempt($req->only(
            'email', 'password'
        ));

        return response()->json([
            'status' => 'success',
            'token'  => $token,
        ]);
    });
});`;

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: FolderGit2, value: "7", label: t("about_projects") },
    { icon: Clock, value: "4+", label: t("about_years") },
    { icon: Layers, value: "10", label: t("about_tech") },
    { icon: Sparkles, value: "Infinite", label: t("about_curiosity") },
  ];

  return (
    <section id="about" className="relative py-32 bg-neutral-50 dark:bg-[#050505] overflow-hidden transition-colors duration-500">
      <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 relative z-10">

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-none transition-colors duration-500"
        >
          {/* Orange/Red Glow at bottom */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none z-[1] opacity-50 dark:opacity-100"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255, 107, 0, 0.15) 0%, rgba(161, 0, 0, 0.08) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Photo - Absolute Right */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] lg:w-[50%] z-[2] hidden md:block">
            <div 
              className="relative w-full h-full"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%), linear-gradient(to top, transparent 0%, black 25%)",
                WebkitMaskComposite: "destination-in",
                maskImage: "linear-gradient(to right, transparent 0%, black 35%), linear-gradient(to top, transparent 0%, black 25%)",
                maskComposite: "intersect",
              }}
            >
              <Image
                src="/berlin_about.png"
                alt="Berlin Sugiyanto"
                fill
                className="object-cover object-[50%_top] filter dark:brightness-[0.65] brightness-[0.85]"
                sizes="(max-width: 1024px) 0vw, 40vw"
              />
            </div>
          </div>

          {/* Code Snippet - Decorative Background */}
          <div className="absolute top-8 right-[15%] z-[1] hidden lg:block pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <pre 
                className="text-[0.7rem] leading-relaxed font-mono select-none"
                style={{ color: "rgba(255, 107, 0, 0.25)" }}
              >
                {codeSnippet}
              </pre>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-[3] p-8 md:p-12 lg:p-16">
            
            {/* Top Section: Heading + Bio */}
            <div className="lg:max-w-[55%] mb-12">
              
              {/* Label */}
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm font-bold tracking-widest text-[#FF6B00] uppercase mb-6"
              >
                {t('about_title')}
              </motion.h2>

              {/* Heading */}
              <motion.h3 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15] mb-10 transition-colors"
                dangerouslySetInnerHTML={{ __html: t('hero_headline') }}
              />

              {/* Bio Paragraphs */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-5 transition-colors"
              >
                {t('about_desc')}
              </motion.p>
            </div>

            {/* Bottom Section: Quote + Stats */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-l-2 border-[#FF6B00] pl-6 py-2 max-w-sm"
              >
                <p className="text-neutral-800 dark:text-white/90 text-base italic font-medium leading-relaxed transition-colors">
                  &ldquo;I believe good systems start with{" "}
                  <span className="text-[#FF6B00]">clean structure</span> and{" "}
                  <span className="text-[#FF6B00]">honest engineering.</span>&rdquo;
                </p>
              </motion.div>

              {/* Stat Cards */}
              <div className="flex flex-wrap gap-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="flex flex-col items-start px-6 py-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] min-w-[130px] hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/20 hover:bg-[#FF6B00]/[0.05] dark:hover:bg-[#FF6B00]/[0.03] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4 text-[#FF6B00]" />
                      <span className="text-2xl lg:text-3xl font-bold text-[#FF6B00] tracking-tighter font-sans">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[0.65rem] font-bold text-neutral-500 uppercase tracking-widest font-sans transition-colors">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

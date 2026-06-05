"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xdavkpel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "No Subject",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setIsSubmitting(false);
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Oops! There was a problem submitting your form.");
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-neutral-50 dark:bg-[#050505] overflow-hidden border-t border-neutral-200 dark:border-white/5 min-h-screen flex items-center transition-colors duration-500">
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#FF6B00]/10 dark:bg-[#FF6B00]/5 rounded-full blur-[120px] pointer-events-none transition-colors" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Text & Socials */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold text-[#FF6B00] tracking-[0.2em] uppercase mb-4">
                {t('contact_title')}
              </h2>
              <h3 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-[1.2] mb-6 transition-colors"
                dangerouslySetInnerHTML={{ __html: t('contact_headline') }}
              />
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-md transition-colors">
                {t('contact_subheadline')}
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <motion.a
                href="mailto:berlinsugiyanto.work@gmail.com"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 dark:hover:bg-[#FF6B00]/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#FF6B00] transition-colors">
                  <Mail className="w-5 h-5 text-neutral-500 dark:text-white group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-neutral-900 dark:text-white font-bold transition-colors">Email</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm transition-colors">berlinsugiyanto.work@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/berlin-sugiyanto-909282319/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-[#0077b5]/40 dark:hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#0077b5] transition-colors">
                  <FaLinkedin className="w-5 h-5 text-neutral-500 dark:text-white group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-neutral-900 dark:text-white font-bold transition-colors">LinkedIn</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm transition-colors">Berlin Sugiyanto</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/B3rlinSugi"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-[#6e5494]/40 dark:hover:border-[#6e5494]/50 hover:bg-[#6e5494]/10 dark:hover:bg-[#6e5494]/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#6e5494] transition-colors">
                  <FaGithub className="w-5 h-5 text-neutral-500 dark:text-white group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-neutral-900 dark:text-white font-bold transition-colors">GitHub</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm transition-colors">@B3rlinSugi</p>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/berlinsgynt_"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-[#E1306C]/40 dark:hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 dark:hover:bg-[#E1306C]/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#E1306C] transition-colors">
                  <FaInstagram className="w-5 h-5 text-neutral-500 dark:text-white group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-neutral-900 dark:text-white font-bold transition-colors">Instagram</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm transition-colors">@berlinsgynt_</p>
                </div>
              </motion.a>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-1/2 flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-500"
            >
              
              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 transition-colors">{t('contact_form_title')}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm transition-colors">
                  {t('contact_desc')}
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center z-10 relative"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/50">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 transition-colors">{t('contact_success')}</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm transition-colors">{t('contact_form_success_desc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider transition-colors">{t('contact_name')}</label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider transition-colors">{t('contact_email')}</label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider transition-colors">{t('contact_subject')} (Optional)</label>
                    <input 
                      type="text" 
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                      placeholder="Job Opportunity"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider transition-colors">{t('contact_message')}</label>
                    <textarea 
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all resize-none"
                      placeholder="Hello Berlin, I would like to talk about..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#ff4500] disabled:bg-neutral-400 dark:disabled:bg-[#333] text-white disabled:text-neutral-200 dark:disabled:text-neutral-500 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{t('contact_send')}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Decorative Glow inside card */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF6B00]/10 blur-[60px] pointer-events-none rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

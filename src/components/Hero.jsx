import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Globe, Code, MapPin, User, FileText, Briefcase, Zap, Award,
  Link as LinkIcon, ChevronLeft, ChevronRight, ArrowUpRight 
} from 'lucide-react';

const carouselProjects = [
  {
    title: "Rimberio",
    description: "A luxury restaurant landing page featuring full-screen immersive video elements, interactive 3D tilt structures, and an animated smoke cursor.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/kartikrana77/Rimberio",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    icon: "🍽️"
  },
  {
    title: "Rolex Yacht-Master II",
    description: "A hyper-premium cinematic scrollytelling landing page featuring a 192-frame canvas sequence, 3D interactive elements, and glassmorphism bento layouts.",
    tech: ["React", "Three.js", "Framer Motion"],
    github: "https://github.com/kartikrana77/rolex.",
    gradient: "linear-gradient(135deg, #fbbf24 0%, #b45309 100%)",
    icon: "⌚"
  },
  {
    title: "Media Search App",
    description: "A media exploration dashboard aggregating photos, videos, and GIFs from Unsplash, Pexels, and Giphy APIs into a unified dashboard.",
    tech: ["React", "Redux Toolkit", "Axios", "Tailwind"],
    github: "https://github.com/kartikrana77/MediaSearch",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: "🎬"
  },
  {
    title: "Employee System",
    description: "A robust CRUD management application designed for tracking employee records, directory listing, and analytics updates.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/kartikrana77/ems",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    icon: "👥"
  },
  {
    title: "SAGE AI Engine",
    description: "Smart Automated Guidance Engine integrating local language models and voice features to automate workflow tasks.",
    tech: ["Python", "Automation", "LLM", "Speech Recognition"],
    github: "https://github.com/kartikrana77/SAGE---Smart-Automated-Guidance-Engine",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    icon: "🤖"
  }
];

const titles = [
  { line1: 'Full-stack', line2: 'Developer' },
  { line1: 'UI/UX',      line2: 'Designer'  },
  { line1: 'Python',     line2: 'Developer' },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [titleIdx, setTitleIdx] = useState(0);

  // Cycle through titles every 3 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Orbit heartbeat sequence — 5 second loop
  const [glowPhase, setGlowPhase] = useState(0);
  useEffect(() => {
    const timers = [];
    const run = () => {
      setGlowPhase(1);                                          // ring 1 glows
      timers.push(setTimeout(() => setGlowPhase(2),  900));   // ring 2 joins
      timers.push(setTimeout(() => setGlowPhase(3), 1800));   // ring 3 joins
      timers.push(setTimeout(() => setGlowPhase(4), 2700));   // ripple fires
      timers.push(setTimeout(() => setGlowPhase(0), 4000));   // all clear
    };
    run();
    const loop = setInterval(run, 5000);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselProjects.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselProjects.length) % carouselProjects.length);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-start px-6 md:px-24 pt-28 pb-20 relative overflow-hidden z-10">
      
      {/* Background Orbit Lines — heartbeat glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

        {/* Ring 1 — 600px, glows from phase 1 */}
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            border: glowPhase >= 1 && glowPhase <= 3
              ? '1px solid rgba(249,115,22,0.9)'
              : '1px solid rgba(255,255,255,0.09)',
            boxShadow: glowPhase >= 1 && glowPhase <= 3
              ? '0 0 18px 4px rgba(249,115,22,0.5), inset 0 0 18px 4px rgba(249,115,22,0.15)'
              : 'none',
            transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        />

        {/* Ring 2 — 900px, glows from phase 2 */}
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            border: glowPhase >= 2 && glowPhase <= 3
              ? '1px solid rgba(249,115,22,0.7)'
              : '1px solid rgba(255,255,255,0.06)',
            boxShadow: glowPhase >= 2 && glowPhase <= 3
              ? '0 0 22px 6px rgba(249,115,22,0.35), inset 0 0 22px 6px rgba(249,115,22,0.1)'
              : 'none',
            transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        />

        {/* Ring 3 — 1200px, glows from phase 3 */}
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{
            border: glowPhase === 3
              ? '1px solid rgba(249,115,22,0.55)'
              : '1px solid rgba(255,255,255,0.04)',
            boxShadow: glowPhase === 3
              ? '0 0 28px 8px rgba(249,115,22,0.22), inset 0 0 28px 8px rgba(249,115,22,0.07)'
              : 'none',
            transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        />

        {/* Full-section ripple — fires at phase 4 */}
        <div
          className="absolute inset-0"
          style={{
            background: glowPhase === 4
              ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.05) 40%, transparent 70%)'
              : 'transparent',
            transition: 'background 0.7s ease',
          }}
        />
      </div>

      {/* Top Bar Layout */}
      <div className="w-full flex justify-between items-center z-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col font-semibold"
        >
          <span className="font-['Space_Mono'] text-white text-base tracking-wider">kartik</span>
          <span className="font-['Space_Mono'] text-white/70 text-sm tracking-wider">rana</span>
        </motion.div>

        {/* Inline Navigation Menu */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-xs font-['Space_Mono'] uppercase tracking-widest"
        >
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/80 hover:text-white transition-colors cursor-pointer">About</button>
          <button onClick={() => scrollToSection('projects')} className="text-white/80 hover:text-white transition-colors cursor-pointer">Projects</button>
          <button onClick={() => scrollToSection('experience')} className="text-white/80 hover:text-white transition-colors cursor-pointer">Experience</button>
          <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-white transition-colors cursor-pointer">Contact</button>
        </motion.nav>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-white/60 border border-white/10 px-3 py-1.5 rounded-full bg-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Open to work
          </div>
          <a 
            href="/Kartik_Rana_CV.pdf"
            download="Kartik_Rana_CV.pdf"
            className="px-5 py-2.5 bg-white text-black font-semibold text-xs rounded-full hover:bg-white/90 transition-all font-['Space_Mono'] tracking-wider"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Main Content Redesign */}
      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col items-start">
        
        {/* Title Block — cycling roles with orange glow transition */}
        <div className="mb-8">
          {/* Line 1: role word (Syne bold) + pill button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-4 md:gap-x-6"
          >
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`l1-${titleIdx}`}
                  initial={{ opacity: 0, y: 50, textShadow: '0 0 60px rgba(249,115,22,1), 0 0 120px rgba(249,115,22,0.6)' }}
                  animate={{ opacity: 1, y: 0,  textShadow: '0 0 0px rgba(249,115,22,0)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{    opacity: 0, y: -35, textShadow: '0 0 80px rgba(249,115,22,1)', transition: { duration: 0.35, ease: 'easeIn' } }}
                  className="text-5xl md:text-8xl font-bold font-['Syne'] text-white tracking-tight leading-[1.1]"
                >
                  {titles[titleIdx].line1}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Interactive Pill Button Scrolling to Projects */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-['Space_Mono'] text-xs font-bold cursor-pointer hover:bg-zinc-100 transition-colors shadow-lg mt-3 md:mt-0"
            >
              Projects
              <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </motion.div>
          </motion.div>

          {/* Line 2: role descriptor (Space Mono italic) */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`l2-${titleIdx}`}
                initial={{ opacity: 0, y: 50, textShadow: '0 0 60px rgba(249,115,22,1), 0 0 120px rgba(249,115,22,0.6)' }}
                animate={{ opacity: 1, y: 0,  textShadow: '0 0 0px rgba(249,115,22,0)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.06 } }}
                exit={{    opacity: 0, y: -35, textShadow: '0 0 80px rgba(249,115,22,1)', transition: { duration: 0.35, ease: 'easeIn' } }}
                className="text-5xl md:text-8xl font-bold font-['Space_Mono'] italic text-white tracking-tight leading-[1.1]"
              >
                {titles[titleIdx].line2}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Bio Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white/75 max-w-xl text-sm md:text-base leading-relaxed mb-12 font-['Space_Grotesk']"
        >
          My goal is to build secure, robust, and impactful full-stack applications with elegant user experiences, bridging front-end performance and back-end security.
        </motion.p>

        {/* Social Link Capsule Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-3 mb-20"
        >
          <a href="https://github.com/kartikrana77" target="_blank" rel="noreferrer" className="social-pill">
            <Code className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/kartik-rana-40168b370/" target="_blank" rel="noreferrer" className="social-pill">
            <Globe className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
            LinkedIn
          </a>
          <a href="mailto:kartikrana9938@gmail.com" className="social-pill">
            <Mail className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
            Email
          </a>
          <div className="social-pill cursor-default">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
            Delhi, India
          </div>
        </motion.div>

        {/* Interactive Showcase Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          {/* Section label */}
          <div className="lg:col-span-12 flex justify-between items-center">
            <span className="section-label">... /Featured works ...</span>
            
            {/* Nav Arrows */}
            <div className="flex gap-2">
              <button onClick={prevSlide} className="btn-circle-arrow" aria-label="Previous Slide">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextSlide} className="btn-circle-arrow" aria-label="Next Slide">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Card Frame */}
          <div className="lg:col-span-12 w-full overflow-hidden py-4">
            <div className="relative flex justify-center items-center h-[26rem] md:h-80 w-full">
              <AnimatePresence mode="popLayout">
                {carouselProjects.map((proj, idx) => {
                  let position = "hidden";
                  if (idx === activeSlide) position = "active";
                  else if (idx === (activeSlide - 1 + carouselProjects.length) % carouselProjects.length) position = "left";
                  else if (idx === (activeSlide + 1) % carouselProjects.length) position = "right";

                  if (position === "hidden") return null;

                  return (
                    <motion.div
                      key={proj.title}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        x: position === "left" ? -300 : position === "right" ? 300 : 0,
                        zIndex: position === "active" ? 10 : 1
                      }}
                      animate={{ 
                        opacity: position === "active" ? 1 : 0.25, 
                        scale: position === "active" ? 1 : 0.85, 
                        x: position === "left" ? -280 : position === "right" ? 280 : 0,
                        filter: position === "active" ? "blur(0px)" : "blur(4px)",
                        zIndex: position === "active" ? 10 : 1
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`absolute w-full max-w-xl md:max-w-2xl h-[24rem] md:h-72 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 glass-panel items-start md:items-center ${
                        position === "active" ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      {/* Gradient fluid block */}
                      <div 
                        className="w-24 md:w-36 h-24 md:h-full rounded-2xl flex items-center justify-center text-4xl shrink-0"
                        style={{ background: proj.gradient }}
                      >
                        <span className="drop-shadow-lg">{proj.icon}</span>
                      </div>

                      {/* Project info details */}
                      <div className="flex flex-col text-left justify-between h-full flex-grow">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold font-['Syne'] text-white mb-2">{proj.title}</h3>
                          <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4">{proj.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.tech.map((t) => (
                              <span key={t} className="text-[10px] font-['Space_Mono'] bg-white/5 border border-white/10 text-white/80 px-2 py-0.5 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <a 
                            href={proj.github} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-4 py-2 bg-white text-black font-['Space_Mono'] text-xs font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2"
                          >
                            Explore
                          </a>
                          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

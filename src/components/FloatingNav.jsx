import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Briefcase, Zap, Award, Link as LinkIcon } from 'lucide-react';

export default function FloatingNav() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="fixed bottom-6 md:bottom-8 left-0 right-0 w-full z-[9999] flex justify-center pointer-events-none"
    >
      <div className="glass-pill rounded-full flex items-center px-1.5 py-1.5 md:px-2 md:py-2 gap-1 md:gap-2 shadow-2xl overflow-x-auto no-scrollbar pointer-events-auto max-w-[92vw]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <NavButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} icon={<User className="w-4 h-4" />} label="Home" active />
        <NavButton onClick={() => scrollToSection('about')} icon={<FileText className="w-4 h-4" />} label="About" />
        <NavButton onClick={() => scrollToSection('experience')} icon={<Briefcase className="w-4 h-4" />} label="Experience" />
        <NavButton onClick={() => scrollToSection('projects')} icon={<Zap className="w-4 h-4" />} label="Projects" />
        <NavButton onClick={() => scrollToSection('certifications')} icon={<Award className="w-4 h-4" />} label="Certifications" />
        <NavButton onClick={() => scrollToSection('contact')} icon={<LinkIcon className="w-4 h-4" />} label="Contact" />
      </div>
    </motion.div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center shrink-0 gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-medium transition-all cursor-pointer ${
        active 
          ? 'bg-white text-black shadow-md font-bold' 
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      <span className={`${active ? 'inline' : 'hidden'} lg:inline`}>{label}</span>
    </button>
  );
}

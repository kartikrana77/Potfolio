import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, Zap, Target, BookOpen, Smile } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const skillsData = [
  {
    category: "Front-end",
    list: "React / HTML5 / CSS3 / JavaScript (ES6+) / Tailwind CSS / Redux Toolkit / Framer Motion / Vite"
  },
  {
    category: "Back-end",
    list: "Node.js / Express / MongoDB / Mongoose / REST APIs / Authentication & Security"
  },
  {
    category: "Languages & Core",
    list: "JavaScript / Python / C Programming / Data Structures / Object-Oriented Design"
  },
  {
    category: "Interests & Focus",
    list: "Cybersecurity / Artificial Intelligence / Browser Extensions / Automation Tools / Technical Writing"
  }
];

const timelineData = [
  {
    period: "2024 - Present",
    company: "Freelance & Open Source",
    role: "Fullstack Web Developer | React & Node.js"
  },
  {
    period: "2024",
    company: "Rimberio UX Project",
    role: "Immersive UI Lead | React, Tailwind & GSAP"
  },
  {
    period: "2024",
    company: "Rolex Yacht-Master II Project",
    role: "Frontend Developer | React, Three.js & Framer Motion"
  },
  {
    period: "2023 - 2024",
    company: "MediaSearch Application",
    role: "Frontend Developer | React & Redux Toolkit"
  },
  {
    period: "2022 - Present",
    company: "Manipal University Jaipur",
    role: "BCA Student (3rd Year) | Computer Applications"
  }
];

export default function BentoSection() {
  const [activeRow, setActiveRow] = useState(0);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section className="w-full min-h-screen px-6 md:px-24 py-24 relative z-10" id="about">
      
      {/* Orbits in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[60%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* About Bio Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-20">
          <div className="md:col-span-4">
            <span className="section-label">... /About me ...</span>
          </div>
          <div className="md:col-span-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white text-xl md:text-2xl leading-relaxed font-['Space_Grotesk']"
            >
              Hello! I'm <strong className="text-white">Kartik Rana</strong>, a Full-Stack Web Developer, AI Explorer, and Future Cybersecurity Guardian. Pursuing my BCA at Manipal University Jaipur, I love bridging technical structures with creative visuals.
            </motion.p>
          </div>
        </div>

        {/* Grid Layout: Skills on Left, Photo Portrait on Right */}
        <motion.div 
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24"
        >
          {/* Skills Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillsData.map((skill, index) => (
              <motion.div 
                key={skill.category}
                variants={itemVariant}
                whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.3)" }}
                className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-colors duration-300 relative group overflow-hidden"
              >
                {/* Visual cursor-like overlay detail */}
                <div className="absolute top-4 right-4 w-6 h-6 border border-white/5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)]"></span>
                </div>

                <div>
                  <h4 className="text-xs font-['Space_Mono'] uppercase tracking-widest text-[var(--color-brand-orange)] mb-4">
                    {skill.category}
                  </h4>
                  <p className="text-white/80 font-['Space_Mono'] text-xs leading-relaxed">
                    {skill.list}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Portrait Photo Container */}
          <motion.div 
            variants={itemVariant}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel rounded-3xl overflow-hidden aspect-[4/5] lg:h-full relative flex items-center justify-center group hover:border-white/20 transition-colors">
              <img 
                src="/developer_portrait.png" 
                alt="Kartik Rana" 
                className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              
              {/* Photo Overlay Caption */}
              <div className="absolute bottom-6 left-6 text-left">
                <span className="font-['Space_Mono'] text-xs text-white/50 tracking-wider">CREATIVE / SECURE</span>
                <h4 className="text-lg font-bold font-['Syne'] text-white">Kartik Rana</h4>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Vision Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 md:p-10 mb-28 border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-2xl h-fit">
                <Target className="w-6 h-6 text-[var(--color-brand-orange)]" />
              </div>
              <div>
                <h4 className="text-white font-bold font-['Syne'] mb-2">My Mission</h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  Bridge Full-Stack Web Development with Cybersecurity, constructing secure-by-default applications with polished UX.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-2xl h-fit">
                <BookOpen className="w-6 h-6 text-[var(--color-brand-orange)]" />
              </div>
              <div>
                <h4 className="text-white font-bold font-['Syne'] mb-2">Future Goal</h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  Become a professional Cybersecurity Guardian while leveraging AI and automation to solve real-world problems.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-2xl h-fit">
                <Smile className="w-6 h-6 text-[var(--color-brand-orange)]" />
              </div>
              <div>
                <h4 className="text-white font-bold font-['Syne'] mb-2">Fun Fact</h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  "Storyteller by heart" – crafting code paths like chapters in a story, aiming for clarity and excitement in every solution.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline (Work & Education Table from Reference) */}
        <div className="w-full relative z-10" id="experience">
          <div className="flex justify-between items-end mb-12">
            <AnimatedHeading
              text="Work"
              variant="slideUp"
              className="text-5xl md:text-7xl font-bold font-['Syne'] text-white"
            />
            <span className="section-label">... /Journey milestones ...</span>
          </div>

          <div className="w-full flex flex-col border-t border-white/10 mb-6">
            {timelineData.map((item, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveRow(index)}
                onClick={() => setActiveRow(index)}
                className={`timeline-row px-4 md:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer relative group ${
                  activeRow === index ? "active" : ""
                }`}
              >
                {/* Time / Period */}
                <div className="w-full md:w-1/4 mb-2 md:mb-0 font-['Space_Mono'] text-sm timeline-meta text-white/50">
                  {item.period}
                </div>

                {/* Company / Institution */}
                <div className="w-full md:w-1/3 mb-2 md:mb-0 font-bold font-['Space_Grotesk'] text-lg md:text-xl timeline-title text-white">
                  {item.company}
                </div>

                {/* Role / Description */}
                <div className="w-full md:w-1/3 font-['Space_Mono'] text-sm timeline-role text-white/60">
                  {item.role}
                </div>

                {/* Hover indicator arrow (Right alignment) */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className={`w-5 h-5 ${activeRow === index ? "text-black" : "text-[var(--color-brand-orange)]"}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer info */}
          <div className="w-full text-right font-['Space_Mono'] text-xs text-white/40 italic">
            Experience / Academic Journey: 2 years 6 months
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Folder, Users, Film, Utensils, Sparkles, Clock } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const projects = [
  {
    id: 'rimberio',
    title: 'Rimberio',
    description: 'A cinematic and immersive luxury restaurant landing page. Features a fullscreen video hero section, interactive 3D tilt effects, and a custom animated smoke cursor to create a premium dining brand experience.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    github: 'https://github.com/kartikrana77/Rimberio',
    icon: <Utensils className="w-8 h-8 text-[var(--color-brand-orange)]" />
  },
  {
    id: 'rolex',
    title: 'Rolex Yacht-Master II',
    description: 'A hyper-premium, Awwwards-level cinematic scrollytelling landing page built for Rolex. Features a 192-frame synchronized canvas image sequence, React Three Fiber 3D interactions, and a luxury bento box layout.',
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/kartikrana77/rolex',
    icon: <Clock className="w-8 h-8 text-[var(--color-brand-orange)]" />
  },
  {
    id: 'mediasearch',
    title: 'Media Search App',
    description: 'A modern media search application that allows users to seamlessly explore photos, videos, and GIFs from multiple APIs (Unsplash, Pexels, Giphy) in one place, and save their favorite items into a personal collection.',
    tech: ['React', 'Redux Toolkit', 'Axios', 'Tailwind CSS'],
    github: 'https://github.com/kartikrana77/MediaSearch',
    icon: <Film className="w-8 h-8 text-[var(--color-brand-orange)]" />
  },
  {
    id: 'ems',
    title: 'Employee Management System',
    description: 'A fast and responsive Employee Management System designed for managing employee records efficiently. Users can add, edit, and delete employee details through a clean, modern UI with instant HMR updates.',
    tech: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/kartikrana77/ems',
    icon: <Users className="w-8 h-8 text-[var(--color-brand-orange)]" />
  },
  {
    id: 'sage',
    title: 'Sage',
    description: 'An advanced, intelligent application currently under development. Built with robust full-stack technologies to deliver seamless automation and powerful features for complex real-world workflows.',
    tech: ['React', 'Node.js', 'Full-Stack Integration'],
    github: 'https://github.com/kartikrana77/Sage',
    icon: <Sparkles className="w-8 h-8 text-[var(--color-brand-orange)]" />
  }
];

export default function ProjectsSection() {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full min-h-screen px-6 md:px-24 py-24 relative z-10" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <AnimatedHeading
            text="Featured Projects"
            highlight="Projects"
            variant="scatter"
            className="text-4xl md:text-5xl font-bold font-['Syne'] text-white mb-4"
          />
          <p className="text-white/60 max-w-2xl text-lg">
            A curated selection of my recent work spanning frontend architecture, full-stack applications, and luxury UI/UX design.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.a 
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noreferrer"
              variants={itemVariant}
              className="glass-panel rounded-3xl p-8 md:p-10 flex flex-col group cursor-pointer transition-all hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] relative overflow-hidden"
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-[var(--color-brand-orange)] opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl">
                  {project.icon}
                </div>
                <div className="flex items-center gap-3 text-white/50 group-hover:text-[var(--color-brand-orange)] transition-colors">
                  <Code className="w-6 h-6" />
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-brand-orange)] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-medium px-3 py-1 bg-white/10 text-white/80 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

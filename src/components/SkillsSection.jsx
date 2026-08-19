import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';

const skills = [
  // Front-end
  { name: 'React',          color: '#61DAFB', bg: '#61DAFB15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'HTML5',          color: '#E34F26', bg: '#E34F2615', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3',           color: '#1572B6', bg: '#1572B615', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript',     color: '#F7DF1E', bg: '#F7DF1E15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS',   color: '#38BDF8', bg: '#38BDF815', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Redux',          color: '#764ABC', bg: '#764ABC15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'Framer Motion',  color: '#BB4FFF', bg: '#BB4FFF15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
  { name: 'Vite',           color: '#646CFF', bg: '#646CFF15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  // Back-end
  { name: 'Node.js',        color: '#339933', bg: '#33993315', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express',        color: '#FFFFFF', bg: '#FFFFFF10', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MongoDB',        color: '#47A248', bg: '#47A24815', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  // Languages
  { name: 'Python',         color: '#3776AB', bg: '#3776AB15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C',              color: '#A8B9CC', bg: '#A8B9CC15', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  // Tools & interests
  { name: 'Git',            color: '#F05032', bg: '#F0503215', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Next.js',        color: '#FFFFFF', bg: '#FFFFFF10', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Linux',          color: '#FCC624', bg: '#FCC62415', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

// Duplicate for infinite loop
const infiniteSkills = [...skills, ...skills, ...skills];

export default function SkillsSection() {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const itemWidth = 120; // px per item (card + gap)
  const speed = 0.5; // px per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start in the middle copy so we can loop both ways
    posRef.current = skills.length * itemWidth;
    track.style.transform = `translateX(-${posRef.current}px)`;

    const animate = () => {
      posRef.current += speed;

      // Loop: when we've scrolled through one full copy, reset silently
      if (posRef.current >= skills.length * 2 * itemWidth) {
        posRef.current -= skills.length * itemWidth;
      }

      track.style.transform = `translateX(-${posRef.current}px)`;

      // Determine which index is closest to center of viewport
      const trackRect = track.getBoundingClientRect();
      const viewCenter = window.innerWidth / 2;
      const relativeCenter = viewCenter - trackRect.left;
      const idx = Math.round(relativeCenter / itemWidth) % skills.length;
      setCenterIdx((idx + skills.length) % skills.length);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden" id="skills">
      {/* Header */}
      <div className="px-6 md:px-24 max-w-6xl mx-auto mb-14">
        <span className="section-label mb-3 block">... /tech stack ...</span>
        <AnimatedHeading
          text="Skills & Technologies"
          highlight="Technologies"
          variant="bounceDown"
          className="text-4xl md:text-5xl font-bold font-['Syne'] text-white"
        />
      </div>

      {/* Gradient edge fades */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
        />

        {/* Scrolling track */}
        <div className="overflow-hidden py-10">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ width: `${infiniteSkills.length * itemWidth}px` }}
          >
            {infiniteSkills.map((skill, i) => {
              const trueIdx = i % skills.length;
              const isCenter = trueIdx === centerIdx;

              return (
                <div
                  key={`${skill.name}-${i}`}
                  className="flex-shrink-0 transition-all duration-300"
                  style={{
                    width: '96px',
                    transform: isCenter
                      ? 'translateY(-22px) scale(1.35)'
                      : 'translateY(0px) scale(1)',
                    zIndex: isCenter ? 10 : 1,
                    filter: isCenter
                      ? 'none'
                      : 'brightness(0.55) saturate(0.6)',
                  }}
                >
                  <div
                    className="rounded-2xl flex flex-col items-center justify-center gap-2 p-3 select-none"
                    style={{
                      background: isCenter ? skill.bg : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isCenter ? skill.color + '55' : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: isCenter
                        ? `0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${skill.color}30`
                        : 'none',
                      height: '96px',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-9 h-9 object-contain"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span
                      className="text-[9px] font-['Space_Mono'] text-center leading-tight"
                      style={{ color: isCenter ? skill.color : 'rgba(255,255,255,0.45)' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Multilingual "Bye" data ───────────────────────────────────────────────
const byeWords = [
  { text: 'Bye',        lang: 'English',  effect: 'wave'    },
  { text: 'अलविदा',    lang: 'Hindi',    effect: 'bounce'  },
  { text: 'Tschüss',   lang: 'German',   effect: 'fade'    },
  { text: 'Hej då',    lang: 'Swedish',  effect: 'slide'   },
  { text: 'さようなら', lang: 'Japanese', effect: 'scale'   },
];

// ─── Per-effect animation variants ────────────────────────────────────────
function getVariants(effect) {
  switch (effect) {
    case 'wave':
      return {
        initial: { opacity: 0, y: 80 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
        exit:    { opacity: 0, y: -60, transition: { duration: 0.5, ease: 'easeIn' } },
      };
    case 'bounce':
      return {
        initial: { opacity: 0, scale: 0.4, y: 120 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
        exit:    { opacity: 0, scale: 0.6, y: -80, transition: { duration: 0.45, ease: 'easeIn' } },
      };
    case 'fade':
      return {
        initial: { opacity: 0, filter: 'blur(40px)', scale: 1.15 },
        animate: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
        exit:    { opacity: 0, filter: 'blur(60px)', scale: 0.9, transition: { duration: 0.6 } },
      };
    case 'slide':
      return {
        initial: { opacity: 0, x: '30vw', skewX: -6 },
        animate: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
        exit:    { opacity: 0, x: '-25vw', skewX: 6, transition: { duration: 0.5, ease: 'easeIn' } },
      };
    case 'scale':
    default:
      return {
        initial: { opacity: 0, scale: 1.6, filter: 'blur(20px)' },
        animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        exit:    { opacity: 0, scale: 0.5, filter: 'blur(30px)', transition: { duration: 0.5 } },
      };
  }
}

// ─── Wave letter sub-animation ────────────────────────────────────────────
function WaveText({ text }) {
  const letters = [...text];
  return (
    <span style={{ display: 'inline-flex' }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -18, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const navLinks = [
  { label: 'About',          href: '#about' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

const socialLinks = [
  { icon: <GithubIcon />,   href: 'https://github.com/kartikrana77',                        label: 'GitHub'   },
  { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/in/kartik-rana-40168b370/',     label: 'LinkedIn' },
  { icon: <MailIcon />,     href: 'mailto:kartikrana9938@gmail.com',                        label: 'Email'    },
];

export default function Footer() {
  const [idx, setIdx]     = useState(0);
  const timerRef          = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % byeWords.length);
    }, 3200);
    return () => clearInterval(timerRef.current);
  }, []);

  const current = byeWords[idx];
  const variants = getVariants(current.effect);

  return (
    <footer className="relative w-full z-20 overflow-hidden" style={{ background: 'transparent' }}>

      {/* ── Top info strip ── */}
      <div className="relative z-10 px-8 md:px-16 pt-6 pb-4 flex flex-col md:flex-row justify-between items-start gap-8">

        {/* Left — Nav */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-['Space_Mono'] text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1 group w-fit"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(l.href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {l.label}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>

        {/* Right — Tagline + Socials */}
        <div className="flex flex-col gap-4 items-end">
          <p className="font-['Space_Grotesk'] text-white/60 text-sm text-right max-w-xs">
            Building secure, elegant, and impactful digital experiences — one commit at a time.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giant Animated BYE ── */}
      <div className="relative z-10 w-full px-8 md:px-16 pb-4">

        {/* Language label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`lang-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="block font-['Space_Mono'] text-xs text-white/30 uppercase tracking-widest mb-2"
          >
            {current.lang}
          </motion.span>
        </AnimatePresence>

        {/* Big animated word — fixed height container, centers text, scales to fit */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(90px, 16vw, 220px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`bye-${idx}`}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex items-center"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                /* Scale so longest word (さようなら = 7 chars) always fits */
                fontSize: 'clamp(3.5rem, 13vw, 13rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#fff',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {current.effect === 'wave'
                ? <WaveText text={current.text} />
                : current.text
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div
        className="relative z-10 px-8 md:px-16 pt-5 pb-24 md:pb-8 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span className="font-['Space_Mono'] text-white/25 text-xs">
          © {new Date().getFullYear()} Kartik Rana — All rights reserved
        </span>
        <span className="font-['Space_Mono'] text-white/20 text-xs">
          Delhi, India · Built with React &amp; Framer Motion
        </span>
      </div>
    </footer>
  );
}

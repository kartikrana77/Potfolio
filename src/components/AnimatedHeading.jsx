import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * Deterministic "random" scatter offsets based on char index
 * so they don't change between renders.
 */
const SCATTER_X = [ 55, -70,  40, -50,  80, -35,  60, -90,  30, -60,  75, -45];
const SCATTER_Y = [-50,  40, -70,  55, -35,  65, -45,  30, -60,  50, -40,  70];

/**
 * AnimatedHeading
 *
 * Props:
 *   text        – string (required) — the heading text
 *   highlight   – string (optional) — substring to color in orange
 *   variant     – one of: 'slideUp' | 'bounceDown' | 'scatter' | 'slideRight' | 'zoomSpin' | 'wave'
 *   className   – additional classes for the outer container (font, size, etc.)
 *   tag         – 'h1' | 'h2' | 'h3' | 'p'  (default 'h2')
 *   once        – bool, re-trigger on every viewport entry when false (default false)
 */
export default function AnimatedHeading({
  text = '',
  highlight = '',
  variant = 'slideUp',
  className = '',
  style = {},
  tag: Tag = 'h2',
  once = false,
}) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });
  const ctrl  = useAnimation();

  useEffect(() => {
    if (inView)      ctrl.start('visible');
    else if (!once)  ctrl.start('hidden');
  }, [inView, ctrl, once]);

  // ── Split helpers ─────────────────────────────────────────────────────────
  const chars = [...text];                  // character-level split
  const words = text.split(' ');            // word-level split (spaces become separate spans)

  // ── Variant configs ───────────────────────────────────────────────────────
  const configs = {

    // 1. BentoSection "Work" — characters slide up + slight rotate
    slideUp: {
      splitBy: 'char',
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.035 } } },
      item: (i) => ({
        hidden:  { opacity: 0, y: 64, rotateX: -40 },
        visible: { opacity: 1, y: 0,  rotateX: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }),
    },

    // 2. SkillsSection — words bounce down with spring
    bounceDown: {
      splitBy: 'word',
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
      item: (i) => ({
        hidden:  { opacity: 0, y: -70, scale: 0.6 },
        visible: { opacity: 1, y: 0,   scale: 1,
          transition: { type: 'spring', stiffness: 280, damping: 18, delay: i * 0.02 } },
      }),
    },

    // 3. ProjectsSection — chars scatter from random positions and assemble
    scatter: {
      splitBy: 'char',
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } },
      item: (i) => ({
        hidden:  { opacity: 0, x: SCATTER_X[i % 12], y: SCATTER_Y[i % 12], scale: 0.2, rotate: (i % 2 === 0 ? 1 : -1) * 15 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
          transition: { type: 'spring', stiffness: 220, damping: 22, delay: i * 0.025 } },
      }),
    },

    // 4. CertificationsSection — words slide in from right with blur
    slideRight: {
      splitBy: 'word',
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } },
      item: (i) => ({
        hidden:  { opacity: 0, x: 90, filter: 'blur(8px)' },
        visible: { opacity: 1, x: 0,  filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }),
    },

    // 5. ContactSection — chars zoom + spin in
    zoomSpin: {
      splitBy: 'char',
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.045 } } },
      item: (i) => ({
        hidden:  { opacity: 0, scale: 0, rotate: i % 2 === 0 ? -25 : 25 },
        visible: { opacity: 1, scale: 1, rotate: 0,
          transition: { type: 'spring', stiffness: 300, damping: 20 } },
      }),
    },

    // 6. Wave — chars animate up/down in a continuous wave (BentoSection bio)
    wave: {
      splitBy: 'char',
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
      item: (i) => ({
        hidden:  { opacity: 0, y: 50, skewX: -10 },
        visible: { opacity: 1, y: 0,  skewX: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 } },
      }),
    },
  };

  const cfg = configs[variant] || configs.slideUp;

  // ── Shared wrapper style: block element, overflow clipped during animation ──
  const wrapperStyle = { display: 'block', ...style };

  // ── Render character-level split ─────────────────────────────────────────
  if (cfg.splitBy === 'char') {
    let charCounter = 0;
    return (
      <Tag className={className} ref={ref} style={wrapperStyle}>
        <motion.span
          variants={cfg.container}
          initial="hidden"
          animate={ctrl}
          style={{ display: 'inline', lineHeight: 'inherit' }}
        >
          {words.map((word, wIdx) => (
            <React.Fragment key={wIdx}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {[...word].map((char, cIdx) => {
                  const currentIdx = charCounter++;
                  return (
                    <motion.span
                      key={currentIdx}
                      variants={cfg.item(currentIdx)}
                      style={{
                        display: 'inline-block',
                        color: shouldHighlight(text, highlight, currentIdx)
                          ? 'var(--color-brand-orange)'
                          : undefined,
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
              {wIdx < words.length - 1 && (
                <motion.span
                  variants={cfg.item(charCounter++)}
                  style={{ display: 'inline-block' }}
                >
                  {'\u00a0'}
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // ── Render word-level split ───────────────────────────────────────────────
  return (
    <Tag className={className} ref={ref} style={wrapperStyle}>
      <motion.span
        variants={cfg.container}
        initial="hidden"
        animate={ctrl}
        style={{ display: 'inline', lineHeight: 'inherit' }}
      >
        {words.map((word, i) => {
          const highlighted =
            highlight &&
            word.replace(/[^a-zA-Z0-9]/g, '') === highlight.replace(/[^a-zA-Z0-9]/g, '');
          return (
            <React.Fragment key={i}>
              <motion.span
                variants={cfg.item(i)}
                style={{
                  display: 'inline-block',
                  color: highlighted ? 'var(--color-brand-orange)' : undefined,
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && '\u00a0'}
            </React.Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/**
 * Determine if char at index i falls within the highlighted substring.
 */
function shouldHighlight(text, highlight, charIdx) {
  if (!highlight) return false;
  const start = text.indexOf(highlight);
  if (start === -1) return false;
  return charIdx >= start && charIdx < start + highlight.length;
}

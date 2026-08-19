import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function CircuitCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for smoother tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Add a slight spring physics to the mask movement so it feels organic
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // SVG Circuit Pattern background (HeroPatterns)
  const circuitPattern = `data:image/svg+xml,%3Csvg width='304' height='304' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 2 0v62.8a5 5 0 1 1-2 0V128zm-89.8 83.2a5 5 0 1 1 2 0v54.6a5 5 0 1 1-2 0v-54.6zm-120.4-2.4a5 5 0 1 1 2 0v11.6a5 5 0 1 1-2 0v-11.6zm63.6 15.6a5 5 0 1 1 2 0v21a5 5 0 1 1-2 0v-21zm76-80a5 5 0 1 1 2 0v83a5 5 0 1 1-2 0v-83zm-69.8 98a5 5 0 1 1 2 0v20.8a5 5 0 1 1-2 0v-20.8zm-22.4-78a5 5 0 1 1 2 0v35.8a5 5 0 1 1-2 0v-35.8zM43.4 86a5 5 0 1 1 2 0v61.8a5 5 0 1 1-2 0V86zm165.4-86a5 5 0 1 1 2 0v37.8a5 5 0 1 1-2 0V0zm-119 0a5 5 0 1 1 2 0v57.8a5 5 0 1 1-2 0V0zm62.4 0a5 5 0 1 1 2 0v16.8a5 5 0 1 1-2 0V0zM8.6 0a5 5 0 1 1 2 0v29.8a5 5 0 1 1-2 0V0zm115 67.8a5 5 0 1 1 0-2h45v2h-45zm22.4 89a5 5 0 1 1 0-2h46v2h-46zm-93-6a5 5 0 1 1 0-2h22.6v2H53zm-20.4-18a5 5 0 1 1 0-2h37.4v2H32.6zm-17.8 72a5 5 0 1 1 0-2H63v2H14.8zm33-40a5 5 0 1 1 0-2H77v2H47.8zm50-136a5 5 0 1 1 0-2H135v2H97.8zm110 50a5 5 0 1 1 0-2H239v2h-31.2zM151 72a5 5 0 1 1 0-2h22v2h-22zm-35.8-24a5 5 0 1 1 0-2H161v2h-45.8zM42 22a5 5 0 1 1 0-2H83v2H42zm36.4-16a5 5 0 1 1 0-2H102v2H78.4zm55-2a5 5 0 1 1 0-2h30.6v2h-30.6zm80 4a5 5 0 1 1 0-2h30.6v2H213.4zM245 42a5 5 0 1 1 0-2h37.6v2H245zm11.8 14a5 5 0 1 1 0-2H304v2h-47.2zm-2.4 122a5 5 0 1 1 0-2H304v2h-49.6zM277 56a5 5 0 1 1 0-2h27v2h-27zm10.6 28a5 5 0 1 1 0-2H304v2h-16.4zm-48.4-16a5 5 0 1 1 0-2H255v2h-15.8zm-76 58a5 5 0 1 1 0-2h22.6v2h-22.6zM153 126a5 5 0 1 1 0-2h31v2h-31zM97 122a5 5 0 1 1 0-2H135v2H97zm116.6 62a5 5 0 1 1 0-2H263v2h-49.4zm-14-16a5 5 0 1 1 0-2h34.6v2h-34.6zm-17.8 70a5 5 0 1 1 0-2H243v2h-61.2zm-4.6 38a5 5 0 1 1 0-2H243v2h-65.8zM97.2 268a5 5 0 1 1 0-2h45.8v2H97.2zm44.2 16a5 5 0 1 1 0-2H213v2h-71.6zm67.4-4a5 5 0 1 1 0-2H304v2h-95.2zM153 252a5 5 0 1 1 0-2h27v2h-27zm-14.8-12a5 5 0 1 1 0-2H183v2h-44.8zM95 190a5 5 0 1 1 0-2h21v2H95zm14 36a5 5 0 1 1 0-2h12v2h-12zm-35.8 44a5 5 0 1 1 0-2h42.6v2H73.2zM27 228a5 5 0 1 1 0-2h24v2H27zm4-44a5 5 0 1 1 0-2h17.6v2H31zm10 24a5 5 0 1 1 0-2h27.4v2H41zm16.8 54a5 5 0 1 1 0-2H74v2H57.8zm11.8 14a5 5 0 1 1 0-2H99v2H69.6zM50 176a5 5 0 1 1 0-2H83v2H50zm35.8-24a5 5 0 1 1 0-2H95v2H85.8zM76 130a5 5 0 1 1 0-2h26.4v2H76z' fill='%23f97316' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E`;

  const maskImage = useMotionTemplate`radial-gradient(circle 300px at ${smoothX}px ${smoothY}px, black 0%, transparent 80%)`;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: `url("${circuitPattern}")`,
        backgroundSize: '204px 204px',
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
      }}
    />
  );
}

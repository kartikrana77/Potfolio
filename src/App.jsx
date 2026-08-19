import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProgress, setLoaded } from './store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import CircuitCursor from './components/CircuitCursor';
import FloatingNav from './components/FloatingNav';

// Lazy loaded components for better performance
const BentoSection = React.lazy(() => import('./components/BentoSection'));
const SkillsSection = React.lazy(() => import('./components/SkillsSection'));
const ProjectsSection = React.lazy(() => import('./components/ProjectsSection'));
const CertificationsSection = React.lazy(() => import('./components/CertificationsSection'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));
const Footer = React.lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef(null);
  const mainWrapperRef = useRef(null);
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.animation.isLoaded);
  
  const frameCount = 300; 
  const currentFrame = (index) => (
    `/ezgif-26dc3ad5eb12afd1-png-split/ezgif-frame-${String(index).padStart(3, '0')}.png`
  );

  const imagesRef = useRef([]);
  const animationObj = useRef({ frame: 1 });

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches : false;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let loadedImages = 0;
    const images = [];
    imagesRef.current = images;
    
    // Fallback: If images take too long or hang, force load after 3 seconds
    const fallbackTimer = setTimeout(() => {
      if (loadedImages < frameCount) {
        console.warn("Forcing load due to timeout");
        dispatch(setLoaded(true));
        render();
      }
    }, 3000);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      images.push(img);
    }

    for (let i = 1; i <= frameCount; i++) {
      const img = images[i - 1];
      
      img.onload = () => {
        loadedImages++;
        if (loadedImages === frameCount) {
          clearTimeout(fallbackTimer);
          dispatch(setLoaded(true));
          render();
        }
      };
      
      img.onerror = () => {
        loadedImages++;
        if (loadedImages === frameCount) {
          clearTimeout(fallbackTimer);
          dispatch(setLoaded(true));
          render();
        }
      };

      img.src = currentFrame(i);
    }

    const render = () => {
      if (!imagesRef.current[animationObj.current.frame - 1]) return;
      const img = imagesRef.current[animationObj.current.frame - 1];
      if (img && img.complete && img.naturalWidth !== 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Slightly darker tint over canvas to make text more readable
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Add a slight dark overlay directly on canvas
        context.fillStyle = "rgba(0,0,0,0.4)";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);

    const st = gsap.to(animationObj.current, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: mainWrapperRef.current,
        start: "top top",
        end: "bottom bottom", 
        scrub: 0.5,
        onUpdate: (self) => {
          render();
          dispatch(setProgress(self.progress * 100));
        }
      }
    });

    // Refresh GSAP when lazy loaded components expand the document height
    let resizeObserver;
    if (mainWrapperRef.current) {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(mainWrapperRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      st.scrollTrigger?.kill();
      st.kill();
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [dispatch, isMobile]);

  return (
    <div className="relative w-full bg-black min-h-[300vh]" ref={mainWrapperRef}>
      {/* Fixed Background Canvas */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </motion.div>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 text-[var(--color-brand-orange)]">
          <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-semibold tracking-widest text-sm">LOADING EXPERIENCE...</p>
        </div>
      )}
      
      {/* Scrollable Content Overlay */}
      {isLoaded && (
        <div className="relative z-10 w-full">
          <CircuitCursor />
          <FloatingNav />
          <Hero />
          <React.Suspense fallback={
            <div className="w-full min-h-screen flex items-center justify-center text-white/50">
              <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--color-brand-orange)] rounded-full animate-spin"></div>
            </div>
          }>
            <BentoSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />
            <ContactSection />
            <Footer />
          </React.Suspense>
        </div>
      )}
    </div>
  );
}

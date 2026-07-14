import { useRef, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import Prism from './Prism';
import { useIsMobile } from '@/hooks/use-mobile';

// Premium easing curves
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraScope, animateCamera] = useAnimate();
  const isMobile = useIsMobile();

  // Initial Split Text Data
  const titleText = "PATEL SAHIL";
  const subtitleText = "Web Developer | MERN Stack Developer | Full-Stack Engineer";

  // Stagger animation variants
  const letterContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045, // Faster, premium stagger
        delayChildren: 0.1
      }
    }
  };

  const letterItem = {
    hidden: { y: 40, rotateX: 8, scale: 0.96, opacity: 0 },
    show: {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      transition: {
        ease: EASE_OUT_EXPO,
        duration: 0.8
      }
    }
  };

  // Setup slow cinematic camera drift
  useEffect(() => {
    let animation: any;
    if (cameraScope.current && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animation = animateCamera(cameraScope.current, 
        { scale: [1, 1.04], x: ['0%', '-0.3%'], y: ['0%', '-0.2%'] }, 
        { duration: 15, ease: [0.22, 1, 0.36, 1] }
      );
    }
    return () => animation?.stop();
  }, [animateCamera, cameraScope]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden premium-bg">
      
      {/* Camera Container for drift effect */}
      <div ref={cameraScope} className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Prism Background */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
          <Prism
            animationType="rotate"
            timeScale={0.4} // Slightly slower for elegance
            height={3.5}
            baseWidth={5.5}
            scale={isMobile ? 2.5 : 3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={0.8} // Reduced glow for 90-8-2 balance
            suspendWhenOffscreen={true}
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 text-center">

        {/* Staggered Title */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-wide leading-none mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'rgba(255, 255, 255, 0.93)', perspective: 800 }}
          variants={letterContainer}
          initial="hidden"
          animate="show"
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={letterItem} className="inline-block origin-bottom">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: EASE_OUT_CUBIC }}
          className="text-lg md:text-2xl font-light max-w-2xl font-sans"
          style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.02em' }}
        >
          {subtitleText}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: EASE_OUT_CUBIC }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}

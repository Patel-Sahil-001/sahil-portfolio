import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Prism from './Prism';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial Split Text Data
  const titleText = "PATEL SAHIL";
  const subtitleText = "Aspiring Software Developer | Java & Python Enthusiast | UI/UX Explorer";

  // Stagger animation variants
  const letterContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const letterItem = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Prism Background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      {/* Film Grain Filter (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none z-10">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 text-center">

        {/* Staggered Title */}
        <motion.h1
          className="text-7xl md:text-9xl lg:text-[10rem] font-bold text-white tracking-wide leading-none mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif", textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          variants={letterContainer}
          initial="hidden"
          animate="show"
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={letterItem} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-white/80 font-light max-w-2xl font-sans"
        >
          {subtitleText}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}

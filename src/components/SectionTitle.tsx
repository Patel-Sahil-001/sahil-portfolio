import { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement; // the <section>
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const titleHeight = containerRef.current.offsetHeight;

      // How far the section has scrolled past the top of viewport
      // 0 = title just became visible/sticky, 1 = content fully covers title
      const scrolled = -rect.top;
      const ratio = Math.max(0, Math.min(1, scrolled / titleHeight));
      progress.set(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  // Color: bright white → dull dark gray as content scrolls over
  const color = useTransform(
    progress,
    [0, 0.8],
    ['rgba(255,255,255,1)', 'rgba(255,255,255,0.5)']
  );

  // Glow: intense → completely off
  const textShadow = useTransform(
    progress,
    [0, 0.8],
    [
      '0 0 10px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)',
      '0 0 0px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0)'
    ]
  );

  // Subtitle fades out
  const subtitleOpacity = useTransform(progress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="h-[30vh] sm:h-[50vh] flex flex-col items-center justify-center sticky top-0 z-0 overflow-hidden pointer-events-none"
    >
      <motion.h2
        className="text-3xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-widest uppercase text-center px-4"
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          color,
          textShadow,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-white/40 tracking-[0.2em] text-sm uppercase"
          style={{ opacity: subtitleOpacity }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

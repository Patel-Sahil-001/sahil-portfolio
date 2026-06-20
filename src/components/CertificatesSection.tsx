import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import AnimatedButton from './ui/animated-button';
import SectionTitle from './SectionTitle';

const certificates = [
  {
    title: 'Prompt Engineering',
    org: 'Parul University',
    date: 'Dec 2024',
    color: '#3b82f6',
    tags: ['AI', 'LLM', 'Prompting'],
    src: '/certificates/prompt-engineering.pdf',
    mockGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
  },
  {
    title: 'UI/UX Design',
    org: 'Parul University',
    date: 'Mar 2025',
    color: '#8b5cf6',
    tags: ['Figma', 'Design Systems', 'User Research'],
    src: '/certificates/uiux-design.pdf',
    mockGradient: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)'
  },
  {
    title: 'AI for Business',
    org: 'HP',
    date: 'Nov 2025',
    color: '#10b981',
    tags: ['Strategy', 'Automation', 'BI'],
    src: '/certificates/ai-business-professionals.pdf',
    mockGradient: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)'
  }
];

const StickyCard = ({ i, title, org, date, tags, src, mockGradient, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`
        }}
        className="relative flex flex-col w-[90vw] sm:w-[350px] md:w-[600px] max-w-full h-[400px] sm:h-[450px] md:h-[500px] rounded-[25px] overflow-hidden bg-[#18181b] border border-white/10 shadow-2xl origin-top"
      >
        {/* Top: Image/Visual Area */}
        <div className="flex-1 w-full relative overflow-hidden min-h-[150px]" style={{ background: mockGradient }}>
          <motion.div style={{ scale: imageScale }} className="w-full h-full absolute inset-0">
            {/* If real image exists, use it here, otherwise mock content */}
            <div className="w-full h-full flex items-center justify-center">
              <h3 className="text-4xl md:text-6xl font-bold text-white/20 uppercase tracking-widest text-center px-4">
                {title}
              </h3>
            </div>
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover" />
          </motion.div>
        </div>

        {/* Bottom: Info Area */}
        <div className="flex-none flex flex-col justify-between p-6 md:p-8 bg-[#18181b]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              <span className="text-xs font-mono uppercase text-white/50 tracking-widest">{org}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/5">
            <span className="text-white/30 font-mono text-xs">{date}</span>
            <AnimatedButton
              href={src}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-widest px-3 py-1"
            >
              View Credential <ExternalLink className="w-3 h-3 inline ml-1" />
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function CertificatesSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="certificates" ref={container} className="relative bg-[#0a0a0f] text-white">
      {/* Intro Heading */}
      <SectionTitle title="CERTIFICATIONS" subtitle="Scroll to explore" />

      <div className="relative pb-[20vh]">
        {certificates.map((cert, i) => {
          // Calculate target scale for the "stacking" effect
          const targetScale = 1 - ((certificates.length - i) * 0.05);
          return (
            <StickyCard
              key={i}
              i={i}
              {...cert}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

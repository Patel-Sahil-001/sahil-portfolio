import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Database, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import AnimatedButton from './ui/animated-button';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionTitle from './SectionTitle';

const projects = [
  {
    title: 'StockFlow ERP',
    subtitle: 'Inventory & warehouse operations',
    badge: 'Full-stack',
    icon: Database,
    description: 'Real-time inventory and supply tracking platform. Monitors warehouse stock levels, manages vendor purchase orders, and generates dispatch analytics with automated low-stock alerts.',
    technologies: ['React', 'Python', 'Java', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Multi-warehouse stock sync',
      'Automated purchase orders',
      'Inventory analytics dashboard',
      'Role-based staff access'
    ],
    liveLink: 'https://stockflow-erp.vercel.app',
    githubLink: 'https://github.com/Patel-Sahil-001/StockFlow-ERP-Project',
    image: '/StockFlow-project.png'
  },
  {
    title: 'PromptForge Verse',
    subtitle: 'Prompt testing & token optimization',
    badge: 'Developer tool',
    icon: SlidersHorizontal,
    description: 'Prompt evaluation workbench. Reverse-engineers visual references into structured model instructions, benchmarks outputs across multiple LLM backends side-by-side, and tracks token consumption.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Zustand'],
    highlights: [
      'Image-to-prompt extraction',
      'Multi-model comparison view',
      'Fallback routing engine',
      'Usage & credit tracking'
    ],
    liveLink: 'https://promptforge-verse.vercel.app/',
    githubLink: 'https://github.com/Patel-Sahil-001/promptforge-verse',
    image: '/Promptforge-verse-project.png'
  }
];

export default function ProjectsSection() {
  const isMobile = useIsMobile();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCardEnter = (index: number) => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="relative text-white pb-[10vh]">
      <div className="absolute inset-0 pointer-events-none z-0" />

      {/* Sticky Background Title */}
      <SectionTitle title="PROJECTS" />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 mt-[-10vh]">
        <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto place-content-center justify-center">
            {projects.map((project, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={project.title}
                  className={`relative ${isHovered ? 'z-40' : 'z-10'}`}
                  onMouseEnter={() => handleCardEnter(index)}
                  onMouseLeave={handleCardLeave}
                >
                  {/* MOBILE VIEW: Clean, readable static card for touch screens */}
                  {isMobile ? (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card text-card-foreground rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-lg"
                    >
                      {/* Project Image */}
                      <div className="w-full h-48 relative overflow-hidden p-3 pb-0 bg-neutral-950/40">
                        <img
                          src={project.image.replace('.png', '.webp')}
                          alt={`Screenshot of ${project.title}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                      </div>

                      {/* Project Details */}
                      <div className="flex flex-col flex-grow p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-neutral-200 flex-shrink-0">
                            <project.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold text-neutral-100 leading-tight truncate">
                              {project.title}
                            </h3>
                            <p className="text-xs text-neutral-400 font-normal truncate">
                              {project.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-neutral-400 text-xs my-3 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2.5 mt-auto">
                          <AnimatedButton
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            className="flex-1 rounded-xl text-xs font-medium py-1.5 justify-center"
                          >
                            <Github className="w-3.5 h-3.5 mr-1.5 inline" /> GitHub
                          </AnimatedButton>
                          <AnimatedButton
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="default"
                            className="flex-1 rounded-xl text-xs font-medium py-1.5 justify-center"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5 inline" /> Live Demo
                          </AnimatedButton>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* LAPTOP / DESKTOP VIEW: Smooth Fluent Pop-out Card with unslopped styling */
                    <div className="relative">
                      {/* RESTING CARD (Always preserves layout in the grid) */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        animate={{
                          scale: isHovered ? 0.98 : 1,
                          opacity: isHovered ? 0.4 : 1
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 22,
                          y: { duration: 0.5, delay: index * 0.1 }
                        }}
                        className="bg-card/80 backdrop-blur-md text-card-foreground rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-lg cursor-pointer hover:border-white/20 transition-colors duration-200"
                      >
                        {/* Resting Hero Graphic / Thumbnail */}
                        <div className="w-full h-52 sm:h-56 relative overflow-hidden p-3 pb-0 bg-neutral-950/30">
                          <img
                            src={project.image.replace('.png', '.webp')}
                            alt={`Screenshot of ${project.title}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          />
                          <div className="absolute top-5 right-5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-black/60 backdrop-blur-md border border-white/10 text-neutral-300">
                            {project.badge}
                          </div>
                        </div>

                        {/* Resting Info Bar */}
                        <div className="p-4 sm:p-5 flex items-center justify-between border-t border-white/5 bg-neutral-950/30">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-neutral-200 flex-shrink-0">
                              <project.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-base font-semibold text-neutral-100 leading-tight truncate">
                                {project.title}
                              </h3>
                              <p className="text-xs text-neutral-400 font-normal truncate mt-0.5">
                                {project.subtitle}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs text-neutral-400 font-medium px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center gap-1 flex-shrink-0 hover:text-white transition-colors">
                            Details <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.div>

                      {/* EXPANDED HOVER POPOVER CARD: Responsive bouncy spring expansion */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              scale: 0.96,
                              y: 6,
                              transition: { duration: 0.14, ease: [0.32, 0, 0.67, 0] }
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 340,
                              damping: 18,
                              mass: 0.75
                            }}
                            style={{
                              transformOrigin: "center top"
                            }}
                            className="absolute z-50 -top-3 -left-2 sm:-left-3 w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] bg-[#14161a] border border-white/[0.14] rounded-2xl p-5 shadow-[0_24px_50px_rgba(0,0,0,0.85)] flex flex-col"
                          >
                            {/* 1. Header: Clean quiet icon tile + unslopped title & label + quick preview link */}
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <motion.div
                                  whileHover={{ scale: 1.08 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                  className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-neutral-200 flex-shrink-0 shadow-sm cursor-pointer"
                                >
                                  <project.icon className="w-5 h-5" />
                                </motion.div>
                                <div className="min-w-0">
                                  <h3 className="text-base font-semibold text-neutral-100 truncate leading-tight">
                                    {project.title}
                                  </h3>
                                  <p className="text-xs text-neutral-400 font-normal truncate mt-0.5">
                                    {project.subtitle}
                                  </p>
                                </div>
                              </div>

                              <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.1] transition-colors flex items-center gap-1.5 shadow-sm active:scale-[0.98]"
                              >
                                View live <ExternalLink className="w-3 h-3" />
                              </motion.a>
                            </div>

                            {/* 2. Description (Concrete facts, plain words) */}
                            <p className="text-xs text-neutral-300 leading-relaxed mb-3.5">
                              {project.description}
                            </p>

                            {/* 3. Showcase Screenshot Preview */}
                            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black/60 aspect-video mb-3.5 shadow-inner group/img">
                              <img
                                src={project.image.replace('.png', '.webp')}
                                alt={`Screenshot of ${project.title}`}
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                              />
                            </div>

                            {/* 4. Technologies Tags (Clean neutral chips) */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-neutral-300 border border-white/[0.07]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* 5. Footer Action Buttons */}
                            <div className="grid grid-cols-2 gap-2.5 mt-auto pt-2.5 border-t border-white/[0.08]">
                              <AnimatedButton
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                className="rounded-xl text-xs font-medium py-2 w-full justify-center"
                              >
                                <Github className="w-3.5 h-3.5 mr-1.5 inline" /> Code
                              </AnimatedButton>
                              <AnimatedButton
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="default"
                                className="rounded-xl text-xs font-medium py-2 w-full justify-center"
                              >
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5 inline" /> Live demo
                              </AnimatedButton>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300">
              <Code2 className="h-4 w-4 text-neutral-400" />
              <p className="text-xs font-medium">More projects in development</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

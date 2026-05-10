import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import AnimatedButton from './ui/animated-button';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionTitle from './SectionTitle';

const projects = [
  {
    title: 'StockFlow ERP',
    description: 'A comprehensive enterprise resource planning system designed to streamline inventory management, order processing, and supply chain operations. Built with modern technologies for scalability and performance.',
    technologies: ['Python', 'Java', 'React', 'Database Management', 'UI/UX Design'],
    highlights: [
      'Real-time inventory tracking',
      'Order management system',
      'Analytics dashboard',
      'User-friendly interface'
    ],
    liveLink: 'https://stockflow-erp.vercel.app',
    githubLink: 'https://github.com/Patel-Sahil-001/StockFlow-ERP-Project',
    image: '/StockFlow-project.png'
  },
  {
    title: 'PromptForge Verse',
    description: 'An advanced AI prompt engineering laboratory designed to bridge the gap between simple ideas and complex AI model inputs. It empowers users to craft highly optimised, model-ready prompts and reverse-engineer images into detailed text instructions, all powered by a robust, multi-provider AI backend within a visually stunning interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Framer Motion', 'Zustand'],
    highlights: [
      'AI Prompt Enhancer',
      'Image Alchemy',
      'Intelligent Fallback System',
      'Automated Credit & Auth System',
      'Immersive UI/UX'
    ],
    liveLink: 'https://promptforge-verse.vercel.app/',
    githubLink: 'https://github.com/Patel-Sahil-001/promptforge-verse',
    image: '/Promptforge-verse-project.png'
  }
];

export default function ProjectsSection() {
  const isMobile = useIsMobile();

  const particles = useMemo(() => {
    const count = isMobile ? 8 : 20;
    return [...Array(count)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [isMobile]);

  return (
    <section id="projects" className="relative gradient-bg-animate text-white pb-[10vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-0" />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Sticky Background Title */}
      <SectionTitle title="PROJECTS" />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 mt-[-10vh]">
        <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={isMobile ? {} : { y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card text-card-foreground rounded-[2rem] overflow-hidden flex flex-col shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="w-full h-56 relative overflow-hidden p-3 pb-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-sm"
                />
              </div>

              {/* Project Details */}
              <div className="flex flex-col flex-grow p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-3 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed text-center">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-foreground text-background tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-auto">
                  <AnimatedButton
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="rounded-full text-sm font-semibold px-8"
                  >
                    GitHub
                  </AnimatedButton>
                  <AnimatedButton
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="rounded-full text-sm font-semibold px-8"
                  >
                    Live Demo
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg glass-premium pulse-glow shimmer border border-white/30">
            <Code2 className="h-5 w-5 text-primary" />
            <p className="text-foreground font-medium">More projects coming soon...</p>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

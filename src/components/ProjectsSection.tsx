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

  return (
    <section id="projects" className="relative text-white pb-[10vh]">
      <div className="absolute inset-0 pointer-events-none z-0" />

      {/* Sticky Background Title */}
      <SectionTitle title="PROJECTS" />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 mt-[-10vh]">
        <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-10 shadow-2xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto place-content-center justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={isMobile ? {} : { scale: 1.01, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: index * 0.15 }}
              className="group bg-card text-card-foreground rounded-[2rem] overflow-hidden flex flex-col shadow-lg border border-border/10 hover:shadow-xl transition-all duration-500"
            >
              {/* Project Image */}
              <div className="w-full h-48 sm:h-56 relative overflow-hidden p-3 pb-0">
                <img
                  src={project.image.replace('.png', '.webp')}
                  alt={`Screenshot of ${project.title} project`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform group-hover:scale-[1.03]"
                  style={{ transitionDuration: '1200ms', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                />
              </div>

              {/* Project Details */}
              <div className="flex flex-col flex-grow p-5 sm:p-8">
                <h3 className="text-2xl font-bold mb-3 text-center">
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
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-auto">
                  <AnimatedButton
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="rounded-full text-sm font-semibold px-5 sm:px-8"
                  >
                    GitHub
                  </AnimatedButton>
                  <AnimatedButton
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="rounded-full text-sm font-semibold px-5 sm:px-8"
                  >
                    Live Demo
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg glass-premium border border-white/10">
            <Code2 className="h-5 w-5 text-primary" />
            <p className="text-foreground font-medium">More projects coming soon...</p>
          </div>
        </motion.div>
        </div>
      </div>

    </section>
  );
}

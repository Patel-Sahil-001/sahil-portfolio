import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { Button } from './ui/button';

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
  }
];

import { useMemo } from 'react';

export default function ProjectsSection() {
  const particles = useMemo(() => {
    return [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white/5 to-background" />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 glow-text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Showcasing my best work and creative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:glow-white transition-all duration-300 border border-white/20 hover:border-white/50"
            >
              <div className="grid md:grid-cols-2 gap-6 p-8">
                {/* Project Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 md:h-full rounded-xl overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Project Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2 text-foreground">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-primary border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.open(project.liveLink)}
                      className="flex-1 bg-primary hover:bg-white/90 text-primary-foreground font-semibold border border-transparent hover:border-white/20"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live
                    </Button>
                    <Button
                      onClick={() => window.open(project.githubLink)}
                      variant="outline"
                      className="flex-1 border-white/50 text-foreground hover:bg-white/10"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </div>
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
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 border border-white/30">
            <Code2 className="h-5 w-5 text-primary" />
            <p className="text-foreground font-medium">More projects coming soon...</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

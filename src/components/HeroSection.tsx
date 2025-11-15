import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import Hero3D from './Hero3D';
import TechInfoModal from './TechInfoModal';
import { useState } from 'react';

const techData = [
  {
    name: 'Python',
    icon: '🐍',
    description: 'My primary programming language. Proficient in data structures, algorithms, and building scalable applications with Python.',
    proficiency: '90%',
    color: 'orange'
  },
  {
    name: 'Java',
    icon: '☕',
    description: 'Strong foundation in Java programming. Specialized in OOP concepts, DSA implementation, and enterprise application development.',
    proficiency: '85%',
    color: 'teal'
  },
  {
    name: 'C++',
    icon: '⚙️',
    description: 'Experienced in C++ for competitive programming and system-level applications. Strong understanding of memory management and optimization.',
    proficiency: '80%',
    color: 'purple'
  },
  {
    name: 'JavaScript',
    icon: '⚡',
    description: 'Modern JavaScript (ES6+) for building interactive web applications. Experience with React and frontend frameworks.',
    proficiency: '75%',
    color: 'green'
  },
  {
    name: 'HTML5',
    icon: '🌐',
    description: 'Semantic HTML5 for building accessible and SEO-friendly web pages. Strong understanding of modern web standards.',
    proficiency: '90%',
    color: 'orange'
  },
  {
    name: 'CSS3',
    icon: '🎨',
    description: 'Advanced CSS3 including Flexbox, Grid, animations, and responsive design. Experience with Tailwind CSS and modern frameworks.',
    proficiency: '85%',
    color: 'teal'
  },
  {
    name: 'UI/UX Design',
    icon: '✨',
    description: 'Passionate about creating beautiful, intuitive user interfaces. Proficient in Figma and modern design principles.',
    proficiency: '85%',
    color: 'pink'
  },
  {
    name: 'Data Structures & Algorithms',
    icon: '🧮',
    description: 'Strong foundation in DSA. Constantly solving problems and optimizing solutions for better performance.',
    proficiency: '85%',
    color: 'purple'
  }
];

export default function HeroSection() {
  const [selectedTech, setSelectedTech] = useState<typeof techData[0] | null>(null);

  const handleTechClick = (index: number) => {
    setSelectedTech(techData[index]);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-orange-950/20" />
      
      {/* Particle effect overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-orange rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-neon-teal rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-primary font-mono text-lg font-space">// Welcome to my portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold glow-text-orange font-exo"
            >
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-teal to-neon-purple">
                Patel Sahil
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground font-space"
            >
              Aspiring Software Developer | Java & Python Enthusiast | UI/UX Explorer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl font-space"
            >
              B.Tech CSE student at Parul University, passionate about creating elegant solutions 
              through code and design. Building the future one line at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-lg p-4 inline-block"
            >
              <p className="text-sm text-secondary font-semibold animate-pulse">
                💡 Click on the floating tech icons to learn more!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-orange font-semibold font-space"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-secondary/50 text-secondary hover:bg-secondary/10 font-space"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <a 
                href="https://linkedin.com/in/patelsahil9124" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:glow-orange transition-all duration-300"
              >
                <Linkedin className="h-6 w-6 text-primary" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:glow-teal transition-all duration-300"
              >
                <Github className="h-6 w-6 text-secondary" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[500px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/20 to-neon-teal/20 rounded-full blur-3xl" />
            <Hero3D onTechClick={handleTechClick} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-sm text-muted-foreground font-space">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Tech Info Modal */}
      {selectedTech && (
        <TechInfoModal tech={selectedTech} onClose={() => setSelectedTech(null)} />
      )}
    </section>
  );
}

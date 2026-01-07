import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import ProfileImage from './ProfileImage';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
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
              <span className="text-primary font-mono text-sm sm:text-base md:text-lg font-space">// Welcome to my portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold glow-text-orange font-exo"
            >
              Hi, I'm <br />
              <span className="text-white">
                Patel Sahil
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-space"
            >
              Aspiring Software Developer | Java & Python Enthusiast | UI/UX Explorer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl font-space"
            >
              B.Tech CSE student at Parul University, passionate about creating elegant solutions
              through code and design. Building the future one line at a time.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-orange font-semibold font-space"
                onClick={() => window.open('/resume.pdf', '_blank')}
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
                href="https://www.linkedin.com/in/patel-sahil9124/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:glow-orange transition-all duration-300"
              >
                <Linkedin className="h-6 w-6 text-primary" />
              </a>
              <a
                href="https://github.com/Patel-Sahil-001"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:glow-teal transition-all duration-300"
              >
                <Github className="h-6 w-6 text-secondary" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Profile Image with rotating elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-80 sm:h-96 md:h-[500px] lg:h-[600px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/20 to-neon-teal/20 rounded-full blur-3xl" />
            <ProfileImage />
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
    </section>
  );
}

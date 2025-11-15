import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/20 to-background" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-purple" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            Let's connect and build something amazing together
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="glass rounded-2xl p-8 glow-cyan">
                <h3 className="text-2xl font-bold mb-6 text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                      <a 
                        href="mailto:97sahil9924@gmail.com" 
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        97sahil9924@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Linkedin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/in/patelsahil9124" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-secondary transition-colors"
                      >
                        linkedin.com/in/patelsahil9124
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                      <p className="text-foreground">Surat, Gujarat, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
                    Feel free to reach out through any of the channels above!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Animated 3D Envelope */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="glass rounded-2xl p-8 w-full hover:glow-purple transition-all duration-300">
                <div className="relative h-64 flex items-center justify-center">
                  {/* Glowing envelope illustration */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotateY: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="w-48 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/50 glow-cyan flex items-center justify-center">
                      <Send className="h-16 w-16 text-primary" />
                    </div>
                    
                    {/* Floating particles around envelope */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{
                          left: `${50 + Math.cos((i * Math.PI) / 4) * 100}px`,
                          top: `${50 + Math.sin((i * Math.PI) / 4) * 100}px`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                <div className="text-center mt-6">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan font-semibold w-full"
                    onClick={() => window.location.href = 'mailto:97sahil9924@gmail.com'}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Send Email
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

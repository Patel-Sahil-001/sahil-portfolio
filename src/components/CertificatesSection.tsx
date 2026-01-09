import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const certificates = [
  {
    title: 'Prompt Engineering',
    issuer: 'Parul University',
    date: 'December 2024',
    description: 'Specialized certification in prompt engineering techniques and best practices for working with AI language models.',
    link: '/certificates/prompt-engineering.pdf'
  },
  {
    title: 'UI/UX Design',
    issuer: 'Parul University',
    date: 'March 2025',
    description: 'Professional certification in user interface and user experience design principles, tools, and best practices.',
    link: '/certificates/uiux-design.pdf'
  },
  {
    title: 'AI for Business Professionals',
    issuer: 'HP',
    date: 'November 2025',
    description: 'Comprehensive course on implementing AI solutions and strategies for business optimization and digital transformation.',
    link: '/certificates/ai-business-professionals.pdf'
  }

];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/20 to-background" />

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Certifications & Credentials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-teal mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            Professional certifications and credentials I've earned
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificates.length > 0 ? (
            certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 group hover:glow-cyan transition-all duration-300 border border-primary/20 hover:border-primary/50"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {cert.title}
                    </h3>
                    <p className="text-sm text-primary font-semibold">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  {cert.description}
                </p>

                <div className="flex gap-3">
                  <Button
                    onClick={() => window.open(cert.link, '_blank')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 text-center py-12"
            >
              <Award className="h-12 w-12 text-primary/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Certificates coming soon...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

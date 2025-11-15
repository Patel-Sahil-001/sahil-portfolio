import { motion } from 'framer-motion';
import { Code2, Palette, Brain } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: "Problem Solver",
    description: "Passionate about DSA and building efficient algorithms in Java"
  },
  {
    icon: Palette,
    title: "Design Thinker",
    description: "Creating intuitive UI/UX experiences with modern design principles"
  },
  {
    icon: Brain,
    title: "Quick Learner",
    description: "Always exploring new technologies and expanding my skill set"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-teal font-exo">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-orange to-neon-teal mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 glow-orange">
              <p className="text-lg leading-relaxed text-foreground/90 mb-4 font-space">
                I'm a <span className="text-primary font-semibold">B.Tech Computer Science and Engineering</span> student
                at Parul University (2024-2027), with a strong foundation from my 
                <span className="text-secondary font-semibold"> Diploma in Computer Engineering</span> from 
                Bhagwan Mahavir University.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 mb-4 font-space">
                My journey in tech is driven by a unique blend of <span className="text-neon-orange">problem-solving prowess</span> and 
                <span className="text-neon-teal"> creative design thinking</span>. I specialize in Java and Python development,
                with a keen interest in Data Structures & Algorithms.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 font-space">
                What sets me apart is my passion for <span className="text-accent font-semibold">UI/UX design</span> — 
                I believe great code deserves an equally great interface. I'm constantly exploring the intersection 
                of functionality and aesthetics to create solutions that are both powerful and beautiful.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-xl p-6 hover:glow-teal transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground font-exo">{feature.title}</h3>
                    <p className="text-muted-foreground font-space">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

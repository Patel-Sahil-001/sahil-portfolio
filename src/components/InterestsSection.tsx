import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe } from 'lucide-react';

const interests = [
  {
    icon: Code,
    title: "Software Development",
    description: "Building scalable applications with clean, efficient code",
    gradient: "from-white/10 to-gray-500/10"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user experiences",
    gradient: "from-gray-500/10 to-white/10"
  },
  {
    icon: Database,
    title: "Data Structures & Algorithms",
    description: "Solving complex problems with optimal solutions",
    gradient: "from-white/10 to-gray-500/10"
  },
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    description: "Building end-to-end web applications and platforms",
    gradient: "from-gray-500/10 to-white/10"
  }
];

export default function InterestsSection() {
  return (
    <section id="interests" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 glow-text-white tracking-widest uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Areas of Interest
          </h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            What drives my passion for technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-8 h-full hover:glow-white transition-all duration-300">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 rounded-xl bg-white/10 group-hover:glow-white transition-all duration-300">
                    <interest.icon className="h-10 w-10 text-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {interest.title}
                  </h3>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {interest.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm constantly exploring the intersection of <span className="text-foreground font-semibold">technology and design</span>,
              seeking to create solutions that are not only functionally robust but also
              <span className="font-semibold text-foreground"> aesthetically pleasing</span>.
              My goal is to contribute to projects that make a real impact while continuously
              learning and growing as a developer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

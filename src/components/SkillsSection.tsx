import { motion } from 'framer-motion';

import { skillCategories } from '@/lib/skills';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden gradient-bg-animate">
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
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass-premium rounded-2xl p-8 glass-card-hover shimmer pulse-glow"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1, duration: 1, ease: "easeOut" }}
                        className="h-full bg-white rounded-full"
                        style={{
                          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'REST API', 'JavaScript', 'CSS3'].map((tech, index) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="glass-premium px-6 py-3 rounded-full text-foreground font-semibold pulse-glow cursor-pointer hover:bg-white/20 shimmer"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

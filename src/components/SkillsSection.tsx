import { motion } from 'framer-motion';

const skillCategories = [
  {
    category: "Programming Languages",
    color: "neon-cyan",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "C", level: 75 },
      { name: "JavaScript", level: 70 },
    ]
  },
  {
    category: "Web Technologies",
    color: "neon-purple",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "React", level: 70 },
      { name: "Tailwind CSS", level: 80 },
    ]
  },
  {
    category: "Design & Tools",
    color: "neon-pink",
    skills: [
      { name: "UI/UX Design", level: 85 },
      { name: "Figma", level: 80 },
      { name: "Windows UX", level: 75 },
      { name: "Prompt Engineering", level: 70 },
    ]
  },
  {
    category: "Computer Science",
    color: "neon-blue",
    skills: [
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 80 },
      { name: "Problem Solving", level: 90 },
      { name: "Database Systems", level: 75 },
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-8 hover:glow-cyan transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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
                        className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}/50 rounded-full`}
                        style={{
                          boxShadow: `0 0 10px hsl(var(--${category.color}) / 0.5)`
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
          {['Python', 'Java', 'React', 'UI/UX', 'DSA', 'CSS3', 'Figma', 'C++'].map((tech, index) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="glass px-6 py-3 rounded-full text-primary font-semibold glow-cyan cursor-pointer"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

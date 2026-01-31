import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Parul University",
    location: "Vadodara, Gujarat",
    period: "2024 - 2027",
    description: "Currently pursuing B.Tech with focus on advanced programming, data structures, and software engineering.",
    color: "neon-cyan"
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Bhagwan Mahavir University",
    location: "Surat, Gujarat",
    period: "2021 - 2024",
    description: "Completed diploma with strong foundation in programming fundamentals, web development, and database management.",
    color: "neon-purple"
  },
  {
    degree: "Secondary Education (SSC)",
    institution: "GSEB Board",
    location: "Surat, Gujarat",
    period: "2020 - 2021",
    description: "Completed secondary education with excellent academic performance, developing strong analytical skills.",
    color: "neon-blue"
  }
];

const certifications = [
  {
    title: "Windows UX Design",
    issuer: "Microsoft",
    year: "2024",
    icon: "🎨"
  },
  {
    title: "Prompt Engineering",
    issuer: "Online Certification",
    year: "2024",
    icon: "🤖"
  }
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
        </motion.div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />

            {educationData.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} md:w-1/2 pl-20 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-auto md:right-[-8px] top-6 w-4 h-4 rounded-full bg-foreground glow-white" />

                <div className="glass rounded-xl p-6 hover:glow-white transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-white/10">
                      <GraduationCap className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                      <p className="text-muted-foreground font-semibold">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground/70">{edu.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-foreground" />
                    <span className="text-sm text-foreground font-semibold">{edu.period}</span>
                  </div>

                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Professional Certifications
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-6 hover:glow-white transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-3 grayscale">{cert.icon}</div>
                <h4 className="text-xl font-bold text-foreground mb-2">{cert.title}</h4>
                <p className="text-muted-foreground font-semibold mb-1">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground/70">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

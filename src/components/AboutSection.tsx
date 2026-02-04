import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Github, Linkedin, Eye } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { AnimatedDock } from './ui/animated-dock';
import DownloadButton from './ui/button-download';
import AnimatedButton from './ui/animated-button';

const socialLinks = [
  {
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/patel-sahil9124/',
    label: 'LinkedIn',
    color: 'hover:text-[#0077b5]'
  },
  {
    icon: Github,
    url: 'https://github.com/Patel-Sahil-001',
    label: 'GitHub',
    color: 'hover:text-[#333]'
  },
  {
    icon: Instagram,
    url: 'https://www.instagram.com/_.sahilll._47/',
    label: 'Instagram',
    color: 'hover:text-[#E4405F]'
  }
];

export default function AboutSection() {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const handleViewResume = () => {
    window.open('/Resume.pdf', '_blank');
  };

  const handleDownloadResume = () => {
    if (downloadStatus !== "idle") return;

    setDownloadStatus("downloading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setDownloadStatus("downloaded");

          // Trigger actual download
          const link = document.createElement('a');
          link.href = '/Resume.pdf';
          link.download = 'Sahil_Patel_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          return 100;
        }
        return prevProgress + 2;
      });
    }, 40); // Update every 40ms for smooth 60fps animation (2 seconds total)

    // Show 'Downloaded' state for 1.5 seconds
    setTimeout(() => {
      setDownloadStatus("complete");
    }, 2000 + 1500);

    // Reset to idle state
    setTimeout(() => {
      setDownloadStatus("idle");
      setProgress(0);
    }, 2000 + 1500 + 100);
  };

  return (
    <section id="about" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 glow-text-white tracking-widest uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            About Me
          </h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Side - About Text and Resume Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 order-2 md:order-1"
          >
            {/* Who I Am Card */}
            <div className="glass rounded-xl p-4 hover:glow-white transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 text-foreground">Who I Am</h3>
                  <ScrollReveal
                    baseOpacity={0.15}
                    enableBlur
                    baseRotation={1}
                    blurStrength={2}
                    containerClassName="!m-0"
                    textClassName="!text-xs sm:!text-sm !leading-relaxed !font-normal text-muted-foreground"
                  >
                    Aspiring Software Developer with a strong foundation in Python, and full-stack web development, focused on building efficient and scalable software solutions.
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="glass rounded-xl p-4 hover:glow-white transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 text-foreground">Education</h3>
                  <ScrollReveal
                    baseOpacity={0.15}
                    enableBlur
                    baseRotation={1}
                    blurStrength={2}
                    containerClassName="!m-0"
                    textClassName="!text-xs sm:!text-sm !leading-relaxed !font-normal text-muted-foreground"
                  >
                    Currently pursuing a B.Tech in Computer Science and Engineering at Parul University, with a Diploma in Computer Engineering providing a solid base in programming fundamentals.
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {/* Career Objective Card */}
            <div className="glass rounded-xl p-4 hover:glow-white transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 text-foreground">Goal</h3>
                  <ScrollReveal
                    baseOpacity={0.15}
                    enableBlur
                    baseRotation={1}
                    blurStrength={2}
                    containerClassName="!m-0"
                    textClassName="!text-xs sm:!text-sm !leading-relaxed !font-normal text-muted-foreground"
                  >
                    To begin my career as a software developer, continuously enhance my technical expertise, and contribute to impactful, real-world software projects.
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {/* Resume Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <AnimatedButton
                onClick={handleViewResume}
                className="flex-1 font-semibold py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="mr-2 h-4 w-4 inline" />
                View Resume
              </AnimatedButton>
              <DownloadButton
                downloadStatus={downloadStatus}
                progress={progress}
                onClick={handleDownloadResume}
                className="flex-1 border-white/50 text-foreground hover:bg-white/10 font-semibold py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Right Side - Profile Photo and Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 order-1 md:order-2"
          >
            {/* Profile Photo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl group-hover:bg-white/30 transition-all duration-300" />
              <div className="relative glass rounded-3xl p-3 overflow-hidden border-2 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src="/profile-photo.png"
                  alt="Sahil Patel"
                  className="w-full h-auto rounded-2xl object-cover"
                  style={{ maxWidth: '350px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </motion.div>

            {/* Social Media Dock */}
            <AnimatedDock
              items={socialLinks.map((social) => ({
                link: social.url,
                Icon: <social.icon className="h-5 w-5" />,
                target: "_blank",
                label: social.label
              }))}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

export default function ContactSection() {
  return (
    <section id="contact" className="relative gradient-bg-animate text-white pb-[10vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-0" />

      {/* Sticky Background Title */}
      <SectionTitle title="CONTACT" />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 mt-[-10vh]">
        <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">

        <div className="max-w-2xl mx-auto text-center glass-premium rounded-xl p-8 glass-card-hover shimmer pulse-glow">
          <p className="text-lg text-muted-foreground mb-4">
            Feel free to reach out to me for any collaborations or queries!
          </p>
          <a href="mailto:contact@example.com" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold">
            Say Hello
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

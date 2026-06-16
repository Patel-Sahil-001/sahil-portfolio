import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Send, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import SectionTitle from './SectionTitle';

// TODO: Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = '5a9c6fc2-8769-42f4-986b-b5fe9bd05b4b';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[${formData.inquiryType || 'General'}] Message from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          inquiry_type: formData.inquiryType,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', inquiryType: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative gradient-bg-animate text-white pb-[10vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-0" />

      {/* Sticky Background Title */}
      <SectionTitle title="GET IN TOUCH" />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 mt-[-10vh]">
        <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-10 shadow-2xl">

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">

          {/* Left - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-premium rounded-2xl p-4 sm:p-6 flex flex-col justify-between border border-white/10"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Contact Information
                </h3>
                <div className="p-1.5 rounded-lg bg-white/10">
                  <Mail className="w-4 h-4 text-foreground" />
                </div>
              </div>

              {/* Contact Items */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">Email Address</p>
                    <a href="mailto:99sahil9426@gmail.com" className="text-sm text-foreground font-semibold hover:text-white/80 transition-colors">
                      99sahil9426@gmail.com
                    </a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">Respond within 24 hours</p>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                    <Linkedin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/patel-sahil9124/" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground font-semibold hover:text-white/80 transition-colors">
                      patelsahil9124
                    </a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">Connect with me</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">Location</p>
                    <p className="text-sm text-foreground font-semibold">Surat, Gujarat</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider + Collaboration Note */}
            <div className="mt-5">
              <div className="w-full h-px bg-white/10 mb-4" />
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Let's collaborate!</span> I'm always interested in discussing new projects, innovative ideas, and exciting opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-premium rounded-2xl p-4 sm:p-6 border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Send me a Message
              </h3>
              <div className="p-1.5 rounded-lg bg-white/10">
                <Send className="w-4 h-4 text-foreground" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 sm:py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 sm:py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/30 transition-colors pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded bg-emerald-500/20">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 block">
                  Inquiry Type
                </label>
                <div className="relative">
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 sm:py-2.5 text-sm text-foreground focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#111] text-white/50">Select an inquiry type</option>
                    <option value="Collaboration" className="bg-[#111]">Collaboration</option>
                    <option value="Job Opportunity" className="bg-[#111]">Job Opportunity</option>
                    <option value="Freelance Project" className="bg-[#111]">Freelance Project</option>
                    <option value="General" className="bg-[#111]">General</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 block">
                  Your Message
                </label>
                <textarea
                  placeholder="Tell me about your project, idea, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 sm:py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || submitted}
                whileHover={!loading && !submitted ? { scale: 1.02 } : {}}
                whileTap={!loading && !submitted ? { scale: 0.98 } : {}}
                className={`w-full py-3 sm:py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed ${
                  submitted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-foreground text-background hover:bg-white/90'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : submitted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

        </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const inquiryType = formData.get('subject') as string;

    // Format the subject properly
    formData.set('subject', `${inquiryType} - From ${name}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
        // Redirect to success page after 1.5 seconds
        setTimeout(() => {
          window.location.href = '/success';
        }, 1500);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 glow-text-purple" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
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
              <div className="glass rounded-2xl p-8 glow-cyan border border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-xl shadow-primary/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Contact Information
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Email Address</h4>
                      <a
                        href="mailto:99sahil9426@gmail.com"
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-300 break-all"
                      >
                        99sahil9426@gmail.com
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">Respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 group-hover:from-blue-500/30 group-hover:to-blue-500/20 transition-all duration-300">
                      <Linkedin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/patel-sahil9124/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-foreground hover:text-blue-400 transition-colors duration-300"
                      >
                        patelsahil9124
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">Connect with me</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/10 group-hover:from-orange-500/30 group-hover:to-orange-500/20 transition-all duration-300">
                      <MapPin className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">Location</h4>
                      <p className="text-lg font-semibold text-foreground">Surat, Gujarat</p>
                      <p className="text-xs text-muted-foreground mt-1">India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-primary/20">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed text-foreground">
                      <span className="font-semibold text-primary">Let's collaborate!</span> I'm always interested in discussing new projects, innovative ideas, and exciting opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form with Web3Forms */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="glass rounded-2xl p-8 w-full hover:glow-purple transition-all duration-300 border border-primary/20 hover:border-primary/50 shadow-xl shadow-purple/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Send me a Message
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Send className="h-4 w-4 text-white" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="access_key" value="5a9c6fc2-8769-42f4-986b-b5fe9bd05b4b" />
                  <input type="hidden" name="from_name" value="Sahil Patel Portfolio" />

                  <div>
                    <label htmlFor="name" className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">
                      Inquiry Type
                    </label>
                    <Select name="subject" required>
                      <SelectTrigger className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/50">
                        <SelectValue placeholder="Select an inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Project Collaboration">Project Collaboration</SelectItem>
                        <SelectItem value="Full-Stack Development">Full-Stack Development</SelectItem>
                        <SelectItem value="Web3 & Blockchain">Web3 & Blockchain</SelectItem>
                        <SelectItem value="Technical Consultation">Technical Consultation</SelectItem>
                        <SelectItem value="Career Opportunity">Career Opportunity</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, idea, or opportunity..."
                      required
                      rows={4}
                      className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 flex items-start gap-3 animate-in">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-300 font-semibold text-sm">Message sent successfully!</p>
                        <p className="text-green-300/80 text-xs mt-1">I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-3 animate-in">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-300 font-semibold text-sm">Failed to send message</p>
                        <p className="text-red-300/80 text-xs mt-1">Please check your information and try again.</p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground glow-cyan font-semibold py-6 text-base transition-all duration-300 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/50"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Sending your message...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

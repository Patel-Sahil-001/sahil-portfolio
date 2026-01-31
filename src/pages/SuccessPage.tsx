import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white/5 to-background" />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl shadow-white/5">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-20 h-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-white/10 opacity-20 aspect-square"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Message Sent!
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground mb-8 text-lg"
          >
            Thank you for reaching out. I've received your message and will get back to you within 24 hours.
          </motion.p>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 flex items-start gap-3"
          >
            <Mail className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Check your inbox</p>
              <p className="text-xs text-muted-foreground">
                I'll send you a confirmation email shortly. Please check your spam folder if you don't see it.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-6 glow-white"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              onClick={() => window.location.href = '/#contact'}
              variant="outline"
              className="w-full border-white/50 text-foreground hover:bg-white/10"
            >
              Send Another Message
            </Button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            In the meantime, feel free to explore my portfolio and connect on{' '}
            <a
              href="https://www.linkedin.com/in/patel-sahil9124/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/80 transition-colors underline"
            >
              LinkedIn
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TechInfo {
  name: string;
  description: string;
  proficiency: string;
  icon: string;
  color: string;
}

interface TechInfoModalProps {
  tech: TechInfo | null;
  onClose: () => void;
}

export default function TechInfoModal({ tech, onClose }: TechInfoModalProps) {
  if (!tech) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-2xl p-8 max-w-md w-full glow-white relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass hover:glow-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center mb-6">
            <div className={`text-6xl mb-4 glow-text-white`}>
              {tech.icon}
            </div>
            <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }}>
              {tech.name}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
              <p className="text-foreground leading-relaxed">{tech.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Proficiency Level</h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: tech.proficiency }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="h-full bg-white rounded-full bg-gradient-to-r from-gray-400 to-white"
                  />
                </div>
                <span className="text-sm font-semibold text-foreground">{tech.proficiency}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Click anywhere outside to close
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

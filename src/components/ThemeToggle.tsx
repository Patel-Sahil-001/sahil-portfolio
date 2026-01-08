import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/30 flex items-center justify-center overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {/* Background glow effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
            />

            {/* Icon container with rotation animation */}
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -180, opacity: 0, scale: 0 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 180, opacity: 0, scale: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute"
                    >
                        <Moon className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: 180, opacity: 0, scale: 0 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -180, opacity: 0, scale: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute"
                    >
                        <Sun className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rotating sun rays effect */}
            {theme === 'light' && (
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-1 bg-primary/20 rounded-full"
                            style={{
                                left: '50%',
                                top: '50%',
                                transformOrigin: '0 0',
                                transform: `rotate(${i * 45}deg) translate(16px, -50%)`,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.button>
    );
}

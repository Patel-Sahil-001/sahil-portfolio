import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import AnimatedButton from './ui/animated-button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home',         href: '#hero',         id: 'hero'         },
  { label: 'About',        href: '#about',        id: 'about'        },
  { label: 'Skills',       href: '#skills',       id: 'skills'       },
  { label: 'Education',    href: '#education',    id: 'education'    },
  { label: 'Interests',    href: '#interests',    id: 'interests'    },
  { label: 'Certificates', href: '#certificates', id: 'certificates' },
  { label: 'Projects',     href: '#projects',     id: 'projects'     },
];

interface NavbarProps {
  /** Becomes true when the intro animation finishes — fades in the nav logo. */
  logoVisible?: boolean;
}

export default function Navbar({ logoVisible = false }: NavbarProps) {
  const [isOpen,         setIsOpen]         = useState(false);
  const [activeSection,  setActiveSection]  = useState('hero');
  const [scrolled,       setScrolled]       = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── scroll effect ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── active-section detection ───────────────────────────────────────────────
  useEffect(() => {
    const opts: IntersectionObserverInit = {
      root:       null,
      rootMargin: '-50% 0px -50% 0px',
      threshold:  0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, opts);

    // Observe all nav sections + the contact section
    [...navLinks.map(l => l.id), 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-white/10 shadow-lg'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo lockup ──────────────────────────────────────────────── */}
          {/* Logo is always visible after intro. The divider + name slide     */}
          {/* out when the user scrolls past the hero section.                  */}
          <motion.div
            className="flex items-center flex-shrink-0"
            animate={{ opacity: logoVisible ? 1 : 0 }}
            transition={{ duration: 0 }}
          >
            <img
              id="nav-logo"
              src="/logo.png"
              alt="Sahil Patel"
              draggable={false}
              className="w-8 h-8 select-none pointer-events-none"
              style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
            />

            {/* ── Divider + Name (scroll-reveal) ─────────────────────────── */}
            <motion.div
              className="flex items-center overflow-hidden"
              animate={{
                clipPath: activeSection !== 'hero'
                  ? 'inset(0 0% 0 0)'
                  : 'inset(0 100% 0 0)',
              }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              {/* Divider */}
              <div
                aria-hidden="true"
                style={{
                  width:           1,
                  height:          22,
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  flexShrink:      0,
                  marginLeft:      10,
                  marginRight:     10,
                }}
              />
              {/* Name */}
              <span
                className="text-white whitespace-nowrap select-none"
                style={{
                  fontFamily:    "'Bebas Neue', sans-serif",
                  fontSize:      '1.05rem',
                  letterSpacing: '0.08em',
                  lineHeight:    1,
                }}
              >
                PATEL SAHIL
              </span>
            </motion.div>
          </motion.div>

          {/* ── Desktop navigation ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-1"
          >
            <div className="flex items-center p-1 rounded-full bg-background/20 backdrop-blur-sm border border-white/5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeSection === link.id
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full glow-white"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <AnimatedButton
              onClick={(e) => handleNavClick('contact', e)}
              className="text-sm font-semibold"
            >
              Get in Touch
            </AnimatedButton>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-white/10 transition-colors relative z-50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile drawer ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={(e) => handleNavClick(link.id, e)}
                    className={cn(
                      'block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium',
                      activeSection === link.id
                        ? 'bg-primary/20 text-primary border border-primary/50 glow-white'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-4">
                  <AnimatedButton
                    onClick={(e) => handleNavClick('contact', e)}
                    className="w-full text-base font-semibold"
                  >
                    Get in Touch
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
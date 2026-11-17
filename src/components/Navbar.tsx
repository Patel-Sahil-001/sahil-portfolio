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
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (isClickScrollingRef.current) return;
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, opts);

    const observeSections = () => {
      [...navLinks.map(l => l.id), 'contact'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observerRef.current?.observe(el);
      });
    };

    observeSections();

    // Re-run observer setup when DOM mutations occur (e.g. lazy loaded sections)
    const mutationObserver = new MutationObserver(() => observeSections());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const checkBottom = () => {
      // If user is scrolled near the bottom of the page, activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        if (!isClickScrollingRef.current) {
          setActiveSection('contact');
        }
      }
    };

    window.addEventListener('scroll', checkBottom, { passive: true });

    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', checkBottom);
    };
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Release the lock once smooth scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 800);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/50 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(255,255,255,0.03)]'
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
              className="w-8 h-8 select-none pointer-events-none drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
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
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] backdrop-blur-3xl">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm tracking-wide transition-colors duration-200 select-none',
                    activeSection === link.id
                      ? 'text-white font-bold'
                      : 'text-zinc-400 font-medium hover:text-white',
                  )}
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.22] to-white/[0.08] backdrop-blur-3xl shadow-[0_4px_24px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.35)]"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 17,
                        mass: 0.7,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Desktop CTA (Glass pill with pure white glow) ─────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={(e) => handleNavClick('contact', e)}
              className={cn(
                "relative group px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98]",
                activeSection === 'contact'
                  ? "bg-white text-black font-bold shadow-[0_0_28px_rgba(255,255,255,0.7),0_0_12px_rgba(255,255,255,0.9)]"
                  : "bg-white/[0.06] hover:bg-white/[0.12] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              )}
            >
              <span className="relative z-10">
                Get in Touch
              </span>
            </button>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-white/[0.05] text-foreground hover:bg-white/[0.1] backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all relative z-50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile drawer (Frosted glass sheet with subtle white glow) ───── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-2 mb-4 overflow-hidden rounded-3xl bg-black/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="px-4 py-5 space-y-1.5">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={(e) => handleNavClick(link.id, e)}
                    className={cn(
                      'block w-full text-left px-4 py-2.5 text-sm rounded-2xl transition-all duration-300 font-medium select-none',
                      activeSection === link.id
                        ? 'bg-white/[0.14] text-white font-bold'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]',
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-3">
                  <button
                    onClick={(e) => handleNavClick('contact', e)}
                    className="w-full py-3 rounded-2xl text-sm font-semibold tracking-wide text-white bg-white/[0.1] hover:bg-white/[0.15] backdrop-blur-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
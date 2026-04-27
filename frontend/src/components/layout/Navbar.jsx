import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sun, Moon, ArrowRight } from 'lucide-react';
import { navLinks } from '../../data/navigation';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } })
  };

  return (
    <>
      {/* Ambient gradient background */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: scrolled 
            ? 'radial-gradient(ellipse at 50% 0%, rgba(196, 69, 54, 0.08) 0%, transparent 70%)'
            : 'transparent',
          opacity: scrolled ? 1 : 0,
          zIndex: 999
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-br-cream/90 backdrop-blur-xl shadow-soft border-b border-gray-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-12 h-12 rounded-xl bg-ink-primary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-warm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Code2 className="w-6 h-6 text-br-cream relative z-10" />
              </div>
              <div className="flex flex-col">
                <span 
                  className="font-display font-bold text-2xl leading-none tracking-tighter"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-ink-primary) 0%, var(--color-terracotta) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  ABHAY
                </span>
                <span className="text-[0.6rem] font-mono text-accent-terracotta tracking-widest uppercase">
                  Developer
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.path}
                  href={link.path}
                  className="group relative text-sm font-medium tracking-wider uppercase text-ink-secondary"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="block py-1">{link.label}</span>
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 origin-right transform scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:origin-left group-hover:scale-x-100"
                    style={{ background: 'var(--gradient-warm)' }}
                  />

                </motion.a>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.a
              href="/contact"
              className="hidden lg:flex items-center gap-3 px-6 py-3 bg-ink-primary text-br-cream text-sm font-bold tracking-wider uppercase group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                y: -2,
                boxShadow: '0 20px 60px rgba(196,69,54,0.25)'
              }}
            >
              <span>Work with me</span>
              <ArrowRight className="w-4 h-4 text-accent-terracotta group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl bg-br-warm/50 hover:bg-br-warm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-accent-terracotta" />
              ) : (
                <Moon className="w-5 h-5 text-ink-primary" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-12 h-12 rounded-xl bg-br-warm/50 hover:bg-br-warm flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute left-0 block w-full h-0.5 bg-ink-primary transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-[11px]' : 'top-0'
                  }`}
                />
                <span 
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block w-full h-0.5 bg-ink-primary transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`absolute left-0 block w-full h-0.5 bg-ink-primary transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-[11px]' : 'bottom-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-y-0 right-0 w-[85vw] max-w-md bg-br-cream z-40 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.path}
                    href={link.path}
                    custom={i}
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-4xl font-bold text-ink-primary hover:text-accent-terracotta transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="p-8 border-t border-gray-200">
                <motion.a
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 text-center bg-ink-primary text-br-cream font-bold tracking-wider uppercase rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                >
                  Start a project
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

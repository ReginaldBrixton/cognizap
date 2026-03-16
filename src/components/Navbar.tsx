import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-sage/80" />
          <span className="font-serif font-semibold text-xl tracking-tight text-dark dark:text-night-text">CogniZap</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone dark:text-night-muted">
          <Link to="/product" className="hover:text-dark dark:hover:text-night-text transition-colors">Product</Link>
          <Link to="/features" className="hover:text-dark dark:hover:text-night-text transition-colors">Features</Link>
          <Link to="/integrations" className="hover:text-dark dark:hover:text-night-text transition-colors">Integrations</Link>
          <Link to="/pricing" className="hover:text-dark dark:hover:text-night-text transition-colors">Pricing</Link>
          <Link to="/support" className="hover:text-dark dark:hover:text-night-text transition-colors">Support</Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-stone/10 dark:hover:bg-night-surface transition-colors text-dark dark:text-night-text"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/early-access" className="hidden sm:block bg-dark dark:bg-night-text text-cream dark:text-night px-5 py-2 rounded-full text-sm font-medium hover:bg-dark/90 dark:hover:bg-night-text/90 transition-colors">
            Get Early Access
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-stone/10 dark:hover:bg-night-surface transition-colors text-dark dark:text-night-text"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 glass rounded-2xl md:hidden flex flex-col gap-4 shadow-xl"
          >
            <Link 
              to="/product" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text transition-colors px-2 py-1"
            >
              Product
            </Link>
            <Link 
              to="/features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text transition-colors px-2 py-1"
            >
              Features
            </Link>
            <Link 
              to="/integrations" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text transition-colors px-2 py-1"
            >
              Integrations
            </Link>
            <Link 
              to="/pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text transition-colors px-2 py-1"
            >
              Pricing
            </Link>
            <Link 
              to="/support" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text transition-colors px-2 py-1"
            >
              Support
            </Link>
            <Link to="/early-access" onClick={() => setIsMobileMenuOpen(false)} className="w-full mt-2 bg-dark dark:bg-night-text text-cream dark:text-night px-5 py-3 rounded-xl text-sm font-medium hover:bg-dark/90 dark:hover:bg-night-text/90 transition-colors text-center">
              Get Early Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

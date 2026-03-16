import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function ScrollControls() {
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const { pathname } = useLocation();

  const updateScrollInfo = () => {
    setScrollPos(window.scrollY);
    setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollInfo, { passive: true });
    window.addEventListener('resize', updateScrollInfo);
    
    // Initial check
    updateScrollInfo();

    return () => {
      window.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, []);

  // Recalculate on route change
  useEffect(() => {
    updateScrollInfo();
    const timeout = setTimeout(updateScrollInfo, 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const showTop = scrollPos > 300;
  const showBottom = maxScroll > 300 && scrollPos < maxScroll - 300;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="pointer-events-auto w-11 h-11 rounded-full flex items-center justify-center bg-[#fafafc]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[25px] saturate-[200%] border-[0.5px] border-white/50 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-[#3c3c43] dark:text-white/90 hover:bg-white dark:hover:bg-[#2c2c2e] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showBottom && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            onClick={scrollToBottom}
            className="pointer-events-auto w-11 h-11 rounded-full flex items-center justify-center bg-[#fafafc]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[25px] saturate-[200%] border-[0.5px] border-white/50 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-[#3c3c43] dark:text-white/90 hover:bg-white dark:hover:bg-[#2c2c2e] transition-colors"
            aria-label="Scroll to bottom"
          >
            <ArrowDown size={20} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function CTA() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || !isDesktop) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic effect radius
    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    navigate('/early-access');
  };

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Generative Gradient Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            borderRadius: ["40% 60% 70% 30%", "30% 70% 40% 60%", "40% 60% 70% 30%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-[80vw] h-[80vw] bg-sage/20 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70%", "70% 30% 60% 40%", "60% 40% 30% 70%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-[70vw] h-[70vw] bg-sage/10 blur-[150px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl text-dark dark:text-night-text mb-8">Begin Your Journey</h2>
        <p className="text-xl md:text-2xl text-stone dark:text-night-muted mb-16 max-w-2xl mx-auto">
          Join the waitlist for early access to the research tool that thinks like you do.
        </p>

        {/* Magnetic Button with Liquid Fill */}
        <motion.button
          ref={buttonRef}
          style={{ x: isDesktop ? mouseXSpring : 0, y: isDesktop ? mouseYSpring : 0 }}
          onClick={handleClick}
          className="relative group overflow-hidden rounded-full border border-dark/20 dark:border-white/20 bg-white/50 dark:bg-night/50 backdrop-blur-md px-12 py-6 text-2xl font-serif text-dark dark:text-night-text shadow-xl transition-all duration-300 hover:border-dark/40 dark:hover:border-white/40 hover:shadow-2xl hover:shadow-sage/30"
        >
          {/* Liquid Fill SVG */}
          <div className="absolute inset-0 z-0 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <svg
              className="absolute bottom-0 left-0 w-[200%] h-[200%] text-sage fill-current animate-wave"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <path d="M0,1000 C300,800 400,1000 1000,800 L1000,1000 Z" />
              <path d="M0,800 C300,1000 400,800 1000,1000 L1000,1000 Z" opacity="0.5" />
            </svg>
            <div className="absolute inset-0 top-1/2 bg-sage" />
          </div>

          <span className="relative z-10 group-hover:text-cream transition-colors duration-500">
            Request Access
          </span>
        </motion.button>
      </div>
    </section>
  );
}

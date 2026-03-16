import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(from + progress * (to - from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toFixed(1)}</span>;
}

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Apply spring physics to the scroll progress for buttery smooth morphing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Morphing animations
  const chaosOpacity = useTransform(smoothProgress, [0.2, 0.5], [1, 0]);
  const chaosScale = useTransform(smoothProgress, [0.2, 0.5], [1, 0.8]);
  const harmonyOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const harmonyScale = useTransform(smoothProgress, [0.4, 0.6], [0.9, 1]);

  // Flying elements
  const flyX = useTransform(smoothProgress, [0.3, 0.6], [0, 200]);
  const flyY = useTransform(smoothProgress, [0.3, 0.6], [0, 100]);
  const flyRotate = useTransform(smoothProgress, [0.3, 0.6], [-15, 0]);
  const flyOpacity = useTransform(smoothProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="relative min-h-screen bg-cream dark:bg-night-surface py-32 overflow-hidden transition-colors duration-500">
      {/* Liquid Transition Top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-sand dark:bg-night transition-colors duration-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-dark dark:text-night-text mb-6">The Fragmented Mind</h2>
          <p className="text-lg text-stone dark:text-night-muted max-w-2xl mx-auto">
            Research today is a chaotic dance between a dozen tabs, lost citations, and scattered notes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative min-h-[400px] md:min-h-[500px]">
          {/* Chaos Side */}
          <motion.div 
            style={{ opacity: chaosOpacity, scale: chaosScale }}
            className="relative h-[300px] md:h-[400px] rounded-3xl bg-white/50 dark:bg-night/50 border border-stone/20 dark:border-white/10 p-6 group hover:animate-pulse"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {/* Fake UI Elements representing chaos */}
              <div className="absolute top-4 left-4 w-32 md:w-48 h-24 md:h-32 bg-red-100/50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/30 rotate-[-6deg] shadow-lg p-3">
                <div className="h-3 md:h-4 w-2/3 bg-red-200 dark:bg-red-800/50 rounded mb-2" />
                <div className="h-1.5 md:h-2 w-full bg-red-100 dark:bg-red-900/50 rounded mb-1" />
                <div className="h-1.5 md:h-2 w-4/5 bg-red-100 dark:bg-red-900/50 rounded" />
              </div>
              <div className="absolute top-16 md:top-20 right-4 md:right-8 w-40 md:w-56 h-32 md:h-40 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-900/30 rotate-[8deg] shadow-lg p-3">
                <div className="h-3 md:h-4 w-1/2 bg-blue-200 dark:bg-blue-800/50 rounded mb-2" />
                <div className="h-1.5 md:h-2 w-full bg-blue-100 dark:bg-blue-900/50 rounded mb-1" />
                <div className="h-1.5 md:h-2 w-full bg-blue-100 dark:bg-blue-900/50 rounded mb-1" />
                <div className="h-1.5 md:h-2 w-3/4 bg-blue-100 dark:bg-blue-900/50 rounded" />
              </div>
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 w-32 md:w-40 h-20 md:h-24 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-900/30 rotate-[-12deg] shadow-lg p-3">
                <div className="h-3 md:h-4 w-3/4 bg-yellow-200 dark:bg-yellow-800/50 rounded mb-2" />
                <div className="h-1.5 md:h-2 w-full bg-yellow-100 dark:bg-yellow-900/50 rounded" />
              </div>
              <div className="absolute bottom-4 right-4 w-48 md:w-64 h-32 md:h-48 bg-purple-100/50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-900/30 rotate-[4deg] shadow-lg p-3">
                <div className="h-3 md:h-4 w-1/3 bg-purple-200 dark:bg-purple-800/50 rounded mb-2" />
                <div className="h-1.5 md:h-2 w-full bg-purple-100 dark:bg-purple-900/50 rounded mb-1" />
                <div className="h-1.5 md:h-2 w-full bg-purple-100 dark:bg-purple-900/50 rounded mb-1" />
                <div className="h-1.5 md:h-2 w-5/6 bg-purple-100 dark:bg-purple-900/50 rounded" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-serif text-2xl text-stone/50 dark:text-night-muted/50 rotate-[-15deg]">Chaos</span>
            </div>
          </motion.div>

          {/* Harmony Side */}
          <motion.div 
            style={{ opacity: harmonyOpacity, scale: harmonyScale }}
            className="absolute inset-0 md:relative md:inset-auto h-[300px] md:h-[400px] rounded-3xl glass p-6 shadow-2xl shadow-sage/20 border-sage/30 group"
          >
            <div className="absolute inset-0 bg-sage/5 rounded-3xl group-hover:bg-sage/10 transition-colors duration-500" />
            <div className="relative h-full flex flex-col gap-4">
              {/* Fake UI Elements representing harmony */}
              <div className="h-12 w-full bg-white/80 dark:bg-night/80 rounded-xl border border-white/50 dark:border-white/10 flex items-center px-4 shadow-sm">
                <div className="h-4 w-1/4 bg-sage/30 rounded" />
              </div>
              <div className="flex-1 flex gap-4">
                <div className="w-1/3 h-full bg-white/60 dark:bg-night/60 rounded-xl border border-white/40 dark:border-white/10 p-3 flex flex-col gap-2">
                  <div className="h-3 w-full bg-stone/10 dark:bg-white/10 rounded" />
                  <div className="h-3 w-5/6 bg-stone/10 dark:bg-white/10 rounded" />
                  <div className="h-3 w-4/5 bg-stone/10 dark:bg-white/10 rounded" />
                </div>
                <div className="flex-1 h-full bg-white/80 dark:bg-night/80 rounded-xl border border-white/50 dark:border-white/10 p-4 shadow-sm flex flex-col gap-3">
                  <div className="h-6 w-1/2 bg-sage/20 rounded-lg" />
                  <div className="h-3 w-full bg-stone/10 dark:bg-white/10 rounded" />
                  <div className="h-3 w-full bg-stone/10 dark:bg-white/10 rounded" />
                  <div className="h-3 w-3/4 bg-stone/10 dark:bg-white/10 rounded" />
                  <div className="mt-auto h-24 w-full bg-sage/10 rounded-lg border border-sage/20" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-serif text-2xl text-sage/80">Harmony</span>
            </div>
          </motion.div>

          {/* Flying Elements (Visible during transition) */}
          <motion.div 
            style={{ x: flyX, y: flyY, rotate: flyRotate, opacity: flyOpacity }}
            className="absolute left-1/4 top-1/3 w-32 h-20 bg-white dark:bg-night shadow-xl rounded-lg border border-stone/20 dark:border-white/10 p-2 z-10 pointer-events-none"
          >
            <div className="h-2 w-full bg-stone/20 dark:bg-white/20 rounded mb-1" />
            <div className="h-2 w-3/4 bg-stone/20 dark:bg-white/20 rounded" />
          </motion.div>
        </div>

        {/* Counter */}
        <div className="mt-32 text-center">
          <div className="font-serif text-6xl md:text-8xl text-sage mb-4 flex justify-center items-baseline gap-2">
            <Counter from={0} to={3.2} duration={2.5} />
            <span className="text-2xl md:text-4xl text-stone dark:text-night-muted">hours</span>
          </div>
          <p className="text-xl text-stone dark:text-night-muted font-medium uppercase tracking-widest">Saved per research session</p>
        </div>
      </div>
    </section>
  );
}

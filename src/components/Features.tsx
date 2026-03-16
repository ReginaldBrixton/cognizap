import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';
import { FileText, BrainCircuit, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
  parallaxY?: any;
}

function FeatureCard({ title, description, icon, delay = 0, className, parallaxY }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      <motion.div
        style={{ y: isDesktop ? parallaxY : 0 }}
        onMouseMove={handleMouseMove}
        className="relative group glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sage/20 hover:border-sage/50 h-full"
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
          style={{
            background: `radial-gradient(600px circle at var(--x, 0) var(--y, 0), rgba(255,255,255,1), transparent 40%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 hidden dark:block"
          style={{
            background: `radial-gradient(600px circle at var(--x, 0) var(--y, 0), rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center mb-6 text-sage group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <h3 className="font-serif text-2xl text-dark dark:text-night-text mb-4">{title}</h3>
          <p className="text-stone dark:text-night-muted leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [150, -150]);
  const y2 = useTransform(smoothProgress, [0, 1], [50, -50]); // Middle card moves slower
  const y3 = useTransform(smoothProgress, [0, 1], [200, -200]);

  return (
    <section id="features" ref={containerRef} style={{ position: 'relative' }} className="py-32 bg-sand dark:bg-night relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-6xl text-dark dark:text-night-text mb-6">Natural Intelligence</h2>
          <p className="text-xl text-stone dark:text-night-muted max-w-2xl mx-auto">
            Tools that work the way your mind does, not the other way around.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Staggered Diagonal Layout */}
          <FeatureCard
            title="Source Ingestion"
            description="Drop any PDF, webpage, or note. CogniZap reads, categorizes, and connects it to your existing knowledge base instantly."
            icon={<FileText size={32} strokeWidth={1.5} />}
            delay={0.1}
            parallaxY={y1}
            className="md:mt-0"
          />
          <FeatureCard
            title="AI Synthesis"
            description="Watch as neural nodes gently pulse, finding hidden connections between disparate papers and highlighting contradictions."
            icon={<BrainCircuit size={32} strokeWidth={1.5} />}
            delay={0.3}
            parallaxY={y2}
            className="md:mt-24"
          />
          <FeatureCard
            title="Citation Magic"
            description="Quotes self-assemble into proper academic formats. Never lose track of where a brilliant idea came from again."
            icon={<Quote size={32} strokeWidth={1.5} />}
            delay={0.5}
            parallaxY={y3}
            className="md:mt-48"
          />
        </div>
      </div>
    </section>
  );
}

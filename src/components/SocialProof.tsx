import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '../lib/utils';

const universities = [
  "University of Ghana",
  "Kwame Nkrumah University",
  "Accra Institute of Technology",
  "University of Cape Coast",
  "Ashesi University",
  "University of Education, Winneba"
];

const testimonials = [
  {
    quote: "CogniZap didn't just organize my papers; it revealed connections I had completely missed. It's like having a brilliant co-author.",
    author: "Dr. Elena Rostova",
    role: "Neuroscience Researcher",
    avatar: "https://picsum.photos/seed/elena/150/150"
  },
  {
    quote: "The citation magic alone saves me hours every week. But the real value is how it visualizes my thought process.",
    author: "James Chen",
    role: "PhD Candidate, AI Ethics",
    avatar: "https://picsum.photos/seed/james/150/150"
  },
  {
    quote: "Finally, a tool that understands the non-linear nature of research. It's beautiful, intuitive, and incredibly powerful.",
    author: "Prof. Sarah Jenkins",
    role: "Department of History",
    avatar: "https://picsum.photos/seed/sarah/150/150"
  }
];

function TypewriterQuote({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className="relative">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-sage ml-1 align-middle"
      />
    </span>
  );
}

export function SocialProof() {
  return (
    <section id="testimonials" className="py-32 bg-sand dark:bg-night overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-dark dark:text-night-text mb-6">Trusted By Thinkers</h2>
          <p className="text-lg text-stone dark:text-night-muted max-w-2xl mx-auto">
            Join thousands of researchers who have found their flow state.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden group mb-32">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sand dark:from-night to-transparent z-10 transition-colors duration-500" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sand dark:from-night to-transparent z-10 transition-colors duration-500" />
        
        <div className="py-12 animate-marquee whitespace-nowrap flex group-hover:[animation-play-state:paused]">
          {[...universities, ...universities].map((uni, i) => (
            <span key={i} className="text-3xl md:text-5xl font-serif text-stone/40 dark:text-night-muted/40 mx-8 uppercase tracking-widest hover:text-sage transition-colors duration-300">
              {uni}
            </span>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              {/* Avatar Orb */}
              <div className="relative mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="absolute -inset-4 rounded-full border border-sage/30 group-hover:border-sage/60 transition-colors duration-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 + 1 }}
                  className="absolute -inset-8 rounded-full border border-sage/10 group-hover:border-sage/30 transition-colors duration-500"
                />
                <img
                  src={t.avatar}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full object-cover border-4 border-cream dark:border-night-surface shadow-xl relative z-10"
                />
              </div>

              <blockquote className="font-serif text-xl md:text-2xl text-dark dark:text-night-text mb-6 min-h-[120px]">
                "<TypewriterQuote text={t.quote} delay={i * 0.2} />"
              </blockquote>
              
              <div className="mt-auto">
                <div className="font-medium text-dark dark:text-night-text">{t.author}</div>
                <div className="text-sm text-stone dark:text-night-muted">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

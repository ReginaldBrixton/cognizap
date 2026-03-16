import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brain, Zap, Search, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Product() {
  return (
    <div className="relative flex-1 flex flex-col bg-sand dark:bg-night">
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        {/* Editorial Hero */}
        <div className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-7xl md:text-[9rem] leading-[0.85] tracking-tight mb-8"
          >
            Think<br/><span className="italic text-sage">Deeper.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-stone dark:text-night-muted max-w-2xl font-light leading-relaxed"
          >
            CogniZap isn't just a tool. It's an extension of your mind, designed to process, connect, and synthesize information at the speed of thought.
          </motion.p>
        </div>
        
        {/* Split Layout Section */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl font-serif mb-6">The Architecture of Insight</h2>
            <p className="text-lg text-stone dark:text-night-muted mb-8 leading-relaxed">
              We rebuilt the research workflow from the ground up. No more scattered tabs, lost PDFs, or disconnected notes. Everything lives in a dynamic, AI-powered workspace that adapts to how you think.
            </p>
            <Link to="/early-access" className="inline-flex items-center gap-2 bg-dark text-white dark:bg-white dark:text-dark px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
              Start Building <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="space-y-8">
            {/* Feature Blocks */}
            {[
              { icon: Brain, title: "Neural Synthesis", desc: "Automatically connect related concepts across thousands of documents. Our engine identifies patterns you might have missed." },
              { icon: Database, title: "Infinite Canvas", desc: "A spatial workspace where your ideas can breathe and grow. Map out complex arguments visually." },
              { icon: Search, title: "Semantic Search", desc: "Find exactly what you're looking for, even if you don't remember the exact words. Search by meaning, not just keywords." },
              { icon: Zap, title: "Instant Citations", desc: "Generate perfectly formatted citations in APA, MLA, Chicago, and more, instantly as you write." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="p-8 border border-dark/10 dark:border-white/10 rounded-3xl bg-white/50 dark:bg-black/20 backdrop-blur-sm"
              >
                <feature.icon className="w-10 h-10 text-sage mb-6" />
                <h3 className="text-2xl font-serif mb-3">{feature.title}</h3>
                <p className="text-stone dark:text-night-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

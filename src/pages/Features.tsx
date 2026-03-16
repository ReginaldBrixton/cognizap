import React from 'react';
import { motion } from 'motion/react';

export function FeaturesPage() {
  return (
    <div className="relative flex-1 flex flex-col bg-sand dark:bg-night">
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        <div className="mb-20">
          <h1 className="font-serif text-6xl md:text-8xl mb-6">Capabilities</h1>
          <p className="text-xl text-stone dark:text-night-muted max-w-2xl">Everything you need to turn raw data into profound insights.</p>
        </div>

        {/* Brutalist / Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-10 rounded-[2rem] bg-dark text-cream dark:bg-white dark:text-dark flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="font-mono text-sm uppercase tracking-widest opacity-70 mb-4 block">01 / Core Engine</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Semantic Processing</h2>
              <p className="text-lg opacity-80 max-w-md leading-relaxed">Our AI doesn't just read your documents; it understands them. Extract themes, identify contradictions, and map relationships automatically.</p>
            </div>
          </div>
          
          <div className="p-10 rounded-[2rem] border border-dark/20 dark:border-white/20 flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="font-mono text-sm uppercase tracking-widest text-sage mb-4 block">02 / Organization</span>
              <h2 className="text-3xl font-serif mb-4">Smart Tags</h2>
              <p className="text-stone dark:text-night-muted leading-relaxed">Auto-categorize your library based on content, not just titles. Create dynamic collections that update themselves.</p>
            </div>
          </div>

          <div className="p-10 rounded-[2rem] border border-dark/20 dark:border-white/20 flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="font-mono text-sm uppercase tracking-widest text-clay mb-4 block">03 / Output</span>
              <h2 className="text-3xl font-serif mb-4">Export Anywhere</h2>
              <p className="text-stone dark:text-night-muted leading-relaxed">Push your synthesized research directly to Notion, Obsidian, Word, or LaTeX with a single click.</p>
            </div>
          </div>

          <div className="md:col-span-2 p-10 rounded-[2rem] bg-sage/10 dark:bg-sage/5 flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="font-mono text-sm uppercase tracking-widest text-sage mb-4 block">04 / Collaboration</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Multiplayer Research</h2>
              <p className="text-lg text-stone dark:text-night-muted max-w-md leading-relaxed">Work alongside your team in real-time. Share canvases, co-author notes, and build a collective knowledge base without stepping on each other's toes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const integrations = [
  { name: 'Notion', category: 'Workspace', status: 'Live', desc: 'Sync your notes and synthesized summaries directly to your Notion databases.' },
  { name: 'Obsidian', category: 'Knowledge Graph', status: 'Live', desc: 'Export markdown files with bi-directional links intact.' },
  { name: 'Zotero', category: 'Reference Manager', status: 'Live', desc: 'Import your entire library and keep citations perfectly synced.' },
  { name: 'Mendeley', category: 'Reference Manager', status: 'Beta', desc: 'Connect your Mendeley account for seamless PDF importing.' },
  { name: 'Google Drive', category: 'Storage', status: 'Live', desc: 'Automatically index and search across all your Drive documents.' },
  { name: 'Slack', category: 'Communication', status: 'Coming Soon', desc: 'Share insights and get notified about team research updates.' },
];

export function Integrations() {
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(null);

  return (
    <div className="relative flex-1 flex flex-col bg-sand dark:bg-night">
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        <div className="mb-20">
          <h1 className="font-serif text-6xl md:text-8xl mb-6">Integrations</h1>
          <p className="text-xl text-stone dark:text-night-muted max-w-2xl">Connect CogniZap with the tools you already use. No disruption, just acceleration.</p>
        </div>

        {/* Technical Data Grid Layout */}
        <div className="border-t border-dark/10 dark:border-white/10">
          {/* Header Row (Desktop Only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-dark/10 dark:border-white/10 font-mono text-xs uppercase tracking-widest text-stone dark:text-night-muted">
            <div className="col-span-3">Platform</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Data Rows */}
          {integrations.map((integration, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 py-5 md:py-8 border-b border-dark/10 dark:border-white/10 group hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer md:cursor-default"
            >
              {/* Mobile View: Accordion */}
              <div className="md:hidden flex flex-col w-full">
                <div 
                  className="flex justify-between items-center w-full cursor-pointer"
                  onClick={() => setExpandedIntegration(expandedIntegration === integration.name ? null : integration.name)}
                >
                  <div className="font-serif text-2xl">{integration.name}</div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider ${integration.status === 'Live' ? 'text-sage' : 'text-clay'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${integration.status === 'Live' ? 'bg-sage' : 'bg-clay'}`} />
                      {integration.status}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedIntegration === integration.name ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-stone dark:text-night-muted opacity-50" />
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedIntegration === integration.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-2 space-y-6">
                        <div>
                          <div className="text-[11px] font-bold tracking-widest uppercase text-[#8e8e93] mb-2">Category</div>
                          <div className="inline-block px-3 py-1.5 rounded-full border border-dark/10 dark:border-white/10 text-sm text-[#3c3c43] dark:text-white/80">
                            {integration.category}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-[11px] font-bold tracking-widest uppercase text-[#8e8e93] mb-2">Description</div>
                          <p className="text-[#3c3c43] dark:text-white/80 leading-relaxed text-base">
                            {integration.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Desktop View: Grid Columns */}
              <div className="hidden md:flex col-span-3 font-serif text-2xl items-center gap-2 cursor-pointer">
                {integration.name}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-sage" />
              </div>
              <div className="hidden md:flex col-span-3 items-center">
                <span className="px-3 py-1 rounded-full border border-dark/10 dark:border-white/10 text-sm text-dark/80 dark:text-night-text/80">
                  {integration.category}
                </span>
              </div>
              <div className="hidden md:flex col-span-4 items-center text-stone dark:text-night-muted leading-relaxed">
                {integration.desc}
              </div>
              <div className="hidden md:flex col-span-2 items-center justify-end font-mono text-sm">
                <span className={`flex items-center gap-2 ${integration.status === 'Live' ? 'text-sage' : 'text-clay'}`}>
                  <span className={`w-2 h-2 rounded-full ${integration.status === 'Live' ? 'bg-sage' : 'bg-clay'}`} />
                  {integration.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

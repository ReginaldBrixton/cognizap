import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const releases = [
  {
    version: 'v2.5.0-canary.1',
    date: 'March 14, 2026',
    channel: 'Canary',
    title: 'Experimental AI Agents',
    changes: [
      'Testing autonomous research agents that can browse the web.',
      'New experimental UI for agent task management.',
      'Warning: Highly unstable, use at your own risk.'
    ]
  },
  {
    version: 'v2.4.0',
    date: 'March 12, 2026',
    channel: 'Main',
    title: 'The Semantic Search Update',
    changes: [
      'Introduced deep semantic search across all document types.',
      'Added support for importing directly from Zotero collections.',
      'Improved PDF parsing speed by 40%.',
      'Fixed an issue where citations were occasionally misformatted in APA style.'
    ]
  },
  {
    version: 'v2.4.0-beta.2',
    date: 'March 05, 2026',
    channel: 'Beta',
    title: 'Semantic Search Release Candidate',
    changes: [
      'Refined semantic search ranking algorithm.',
      'Fixed memory leak during large PDF imports.',
      'UI polish for the search results dropdown.'
    ]
  },
  {
    version: 'v2.3.5',
    date: 'February 28, 2026',
    channel: 'Main',
    title: 'Canvas Performance Boost',
    changes: [
      'Rewrote the infinite canvas rendering engine for buttery smooth 60fps panning.',
      'Added multi-select and group operations on the canvas.',
      'New keyboard shortcuts for rapid tagging.'
    ]
  },
  {
    version: 'v2.3.0',
    date: 'February 10, 2026',
    channel: 'Main',
    title: 'Multiplayer Beta Graduation',
    changes: [
      'Launched real-time collaboration to all users.',
      'See your teammates cursors and selections on the canvas.',
      'Added comment threads to specific text highlights.'
    ]
  },
  {
    version: 'v2.2.0',
    date: 'January 15, 2026',
    channel: 'Main',
    title: 'The Knowledge Graph Update',
    changes: [
      'Visualize your notes as an interactive 3D knowledge graph.',
      'Automatic bidirectional linking based on entity recognition.',
      'Export graph data to CSV and JSON.'
    ]
  },
  {
    version: 'v2.1.0',
    date: 'December 02, 2025',
    channel: 'Main',
    title: 'Mobile App Launch',
    changes: [
      'CogniZap is now available on iOS and Android.',
      'Capture notes on the go with voice-to-text.',
      'Offline mode support for reading and basic editing.'
    ]
  },
  {
    version: 'v2.0.5',
    date: 'November 18, 2025',
    channel: 'Main',
    title: 'Security & Compliance',
    changes: [
      'Achieved SOC2 Type II compliance.',
      'Added End-to-End Encryption (E2EE) for enterprise workspaces.',
      'New audit logs for team admins.'
    ]
  },
  {
    version: 'v2.0.0',
    date: 'October 24, 2025',
    channel: 'Main',
    title: 'CogniZap 2.0: The AI Overhaul',
    changes: [
      'Completely redesigned interface with Liquid Glass UI.',
      'Upgraded underlying AI models to Gemini 3.0 Pro.',
      'Introduced "Synthesize" button for instant literature reviews.',
      'Deprecated legacy folder structures in favor of tag-based routing.'
    ]
  }
];

function NetworkNodes() {
  const group = useRef<THREE.Group>(null);
  const particlesCount = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.03;
      group.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#8e8e93"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
           <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8e8e93" transparent opacity={0.05} />
      </lineSegments>
    </group>
  );
}

const getChannelColor = (channel: string) => {
  switch(channel) {
    case 'Main': return 'bg-sage/20 text-sage dark:bg-sage/30 dark:text-sage';
    case 'Beta': return 'bg-[#007aff]/10 text-[#007aff] dark:bg-[#0a84ff]/20 dark:text-[#0a84ff]';
    case 'Canary': return 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';
    default: return 'bg-gray-500/10 text-gray-500';
  }
};

export function Changelog() {
  const [activeChannel, setActiveChannel] = useState('All');
  
  const filteredReleases = releases.filter(r => activeChannel === 'All' || r.channel === activeChannel);

  return (
    <div className="relative flex-1 flex flex-col bg-sand dark:bg-night overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <NetworkNodes />
        </Canvas>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        <div className="mb-16 text-center md:text-left">
          <h1 className="font-serif text-6xl md:text-8xl mb-6 text-dark dark:text-night-text">Changelog</h1>
          <p className="text-xl text-stone dark:text-night-muted">New updates and improvements to CogniZap.</p>
        </div>

        {/* Channel Filter */}
        <div className="flex justify-center md:justify-start mb-16">
          <div className="inline-flex p-1.5 bg-white/50 dark:bg-black/20 rounded-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm">
            {['All', 'Main', 'Beta', 'Canary'].map(channel => (
              <button
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeChannel === channel 
                    ? 'bg-white dark:bg-[#2c2c2e] text-[#3c3c43] dark:text-white shadow-sm' 
                    : 'text-[#8e8e93] hover:text-[#3c3c43] dark:hover:text-white/80'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredReleases.map((release, i) => (
              <motion.div 
                key={release.version}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline Line (Mobile) */}
                <div className="absolute left-0 top-2 bottom-[-96px] w-[1px] bg-dark/10 dark:bg-white/10 md:hidden" />
                
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="md:col-span-1 md:text-right md:pr-8 md:border-r border-dark/10 dark:border-white/10 relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-[-36px] md:right-[-5px] md:left-auto top-2 w-2.5 h-2.5 rounded-full bg-sage ring-4 ring-sand dark:ring-night" />
                    
                    <div className="flex flex-col md:items-end gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${getChannelColor(release.channel)}`}>
                        {release.channel}
                      </span>
                      <div className="font-mono text-sm text-[#3c3c43] dark:text-white/90 font-semibold">{release.version}</div>
                    </div>
                    <div className="text-[#8e8e93] text-sm">{release.date}</div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <h2 className="text-3xl font-serif mb-6 text-dark dark:text-night-text">{release.title}</h2>
                    <ul className="space-y-4">
                      {release.changes.map((change, j) => (
                        <li key={j} className="flex items-start gap-3 text-[#3c3c43] dark:text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-dark/20 dark:bg-white/20 mt-2.5 shrink-0" />
                          <span className="leading-relaxed">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

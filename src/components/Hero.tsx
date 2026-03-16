import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Mouse, Search, FileText, Share2, Plus, Network, ChevronRight, BookOpen } from 'lucide-react';

const words = "Research, Reimagined".split(" ");

export function Hero() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 20, restDelta: 0.001 });
  
  const bgY = useTransform(smoothScrollY, [0, 1000], [0, 300]);
  const mockupY = useTransform(smoothScrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(smoothScrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Generative Mesh Background */}
      <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            borderRadius: ["40% 60% 70% 30%", "30% 70% 40% 60%", "40% 60% 70% 30%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-sage/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70%", "70% 30% 60% 40%", "60% 40% 30% 70%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-sage/10 blur-[120px] rounded-full mix-blend-screen"
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
        {/* Headline */}
        <h1 className="font-serif text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[8rem] leading-none text-dark dark:text-night-text tracking-tighter mb-6 flex flex-wrap justify-center gap-x-[2vw] md:gap-x-6 py-2 transition-colors duration-500">
          {words.map((word, i) => (
            <span key={i} className="inline-flex overflow-hidden pb-2">
              {word.split("").map((letter, j) => (
                <motion.span
                  key={j}
                  initial={{ y: "120%", rotate: 15, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  whileHover={{ scale: 1.1, color: "#8B5CF6", rotate: -5 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + (i * 0.2) + (j * 0.04),
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block origin-bottom-left cursor-default transition-colors duration-300"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-base sm:text-lg md:text-xl text-stone dark:text-night-muted max-w-2xl mb-12 md:mb-16 text-balance"
        >
          A modern digital library that brings harmony to your fragmented mind.
          Ingest, synthesize, and cite with natural intelligence.
        </motion.p>

        {/* Command Center Mockup */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          className="w-full relative"
        >
          <motion.div style={{ y: mockupY }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass rounded-2xl md:rounded-[2rem] p-2 md:p-4 shadow-2xl shadow-sage/10 border border-white/40 dark:border-white/10 w-full min-h-[400px] sm:min-h-[500px] md:min-h-0 md:aspect-[21/9] overflow-hidden relative"
            >
            {/* Mockup UI Inner */}
            <div className="w-full h-full bg-[#FAFAFA] dark:bg-night-surface rounded-xl md:rounded-2xl border border-white/50 dark:border-white/5 flex flex-col overflow-hidden text-left shadow-inner">
              {/* Header */}
              <div className="h-10 md:h-12 border-b border-stone/10 dark:border-white/5 flex items-center px-3 md:px-4 justify-between bg-white/80 dark:bg-night/80 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs text-stone dark:text-night-muted font-medium bg-stone/5 dark:bg-white/5 px-2 py-1 rounded-md">
                    <FileText size={14} />
                    <span>Cognitive_Load_Theory_v2.md</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-stone dark:text-night-muted">
                  <Search size={14} className="md:w-4 md:h-4" />
                  <Share2 size={14} className="md:w-4 md:h-4" />
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-sage/20 flex items-center justify-center text-sage">
                    <Plus size={12} className="md:w-3.5 md:h-3.5" />
                  </div>
                </div>
              </div>
              
              {/* Body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 hidden md:flex flex-col border-r border-stone/10 dark:border-white/5 bg-white/40 dark:bg-night/40 p-3 gap-1">
                  <div className="text-[10px] font-bold text-stone/60 dark:text-night-muted/60 uppercase tracking-wider mb-2 px-2">Projects</div>
                  <div className="flex items-center gap-2 text-sm text-dark dark:text-night-text bg-sage/10 px-2 py-1.5 rounded-md font-medium">
                    <ChevronRight size={14} className="text-sage" />
                    <span className="truncate">Neuroplasticity</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone dark:text-night-muted px-2 py-1.5 hover:bg-stone/5 dark:hover:bg-white/5 rounded-md transition-colors">
                    <ChevronRight size={14} />
                    <span className="truncate">AI Ethics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone dark:text-night-muted px-2 py-1.5 hover:bg-stone/5 dark:hover:bg-white/5 rounded-md transition-colors">
                    <ChevronRight size={14} />
                    <span className="truncate">Quantum Computing</span>
                  </div>
                  
                  <div className="text-[10px] font-bold text-stone/60 dark:text-night-muted/60 uppercase tracking-wider mt-4 mb-2 px-2">Recent Sources</div>
                  <div className="flex items-center gap-2 text-xs text-stone dark:text-night-muted px-2 py-1">
                    <BookOpen size={12} className="text-clay dark:text-night-muted" />
                    <span className="truncate">Sweller (1988)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone dark:text-night-muted px-2 py-1">
                    <BookOpen size={12} className="text-clay dark:text-night-muted" />
                    <span className="truncate">Baddeley (1992)</span>
                  </div>
                </div>
                
                {/* Main Content Split */}
                <div className="flex-1 flex flex-col md:flex-row bg-white/60 dark:bg-night/60">
                  {/* Editor */}
                  <div className="flex-1 p-4 md:p-8 flex flex-col gap-3 md:gap-4 border-r border-stone/10 dark:border-white/5 relative overflow-hidden">
                    <h1 className="font-serif text-xl md:text-3xl text-dark dark:text-night-text mb-1 md:mb-2">The Role of Working Memory</h1>
                    <p className="text-xs md:text-sm text-stone/80 dark:text-night-muted/80 leading-relaxed">
                      Cognitive load theory relies heavily on the model of human information processing. 
                      Working memory is limited in both capacity and duration. Under these conditions, 
                      <span className="bg-sage/20 text-dark dark:text-night-text px-1 rounded mx-1">instructional design</span> 
                      must minimize extraneous cognitive load to facilitate schema acquisition.
                    </p>
                    <p className="text-xs md:text-sm text-stone/80 dark:text-night-muted/80 leading-relaxed">
                      As demonstrated by <span className="text-sage font-medium cursor-pointer hover:underline">Sweller et al. (1998)</span>, 
                      when learners are presented with poorly designed instructional materials, their working memory resources are depleted...
                    </p>
                    
                    {/* Animated Typing Cursor */}
                    <motion.div 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-0.5 h-4 md:h-5 bg-sage mt-1"
                    />
                  </div>
                  
                  {/* Knowledge Graph / Context Panel */}
                  <div className="w-full md:w-64 bg-stone/5 dark:bg-white/5 p-4 flex flex-col gap-4 hidden lg:flex">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone dark:text-night-muted uppercase tracking-wider mb-2">
                      <Network size={14} />
                      Knowledge Graph
                    </div>
                    
                    <div className="relative flex-1 bg-white/50 dark:bg-night/50 rounded-xl border border-stone/10 dark:border-white/5 p-4 flex items-center justify-center overflow-hidden">
                      {/* Graph Nodes Animation */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}>
                        <motion.line x1="50%" y1="30%" x2="30%" y2="60%" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" 
                          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        <motion.line x1="50%" y1="30%" x2="70%" y2="70%" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" 
                          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        <motion.line x1="30%" y1="60%" x2="70%" y2="70%" stroke="#9CA3AF" strokeWidth="1" opacity="0.5" />
                      </svg>
                      
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-night rounded-full border-2 border-sage shadow-md flex items-center justify-center text-[10px] font-bold text-sage z-10"
                      >
                        Core
                      </motion.div>
                      <motion.div 
                        animate={{ y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[60%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-night rounded-full border-2 border-stone/30 dark:border-stone/10 shadow-sm flex items-center justify-center text-[8px] text-stone dark:text-night-muted z-10"
                      >
                        Ref 1
                      </motion.div>
                      <motion.div 
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-[70%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-night rounded-full border-2 border-clay/50 dark:border-clay/20 shadow-sm flex items-center justify-center text-[8px] text-clay dark:text-night-muted z-10"
                      >
                        Ref 2
                      </motion.div>
                    </div>
                    
                    <div className="bg-white/60 dark:bg-night/60 rounded-lg p-3 border border-stone/10 dark:border-white/5">
                      <div className="text-xs font-medium text-dark dark:text-night-text mb-1">Suggested Connection</div>
                      <div className="text-[10px] text-stone dark:text-night-muted">Link this to your notes on "Intrinsic Load" from last week.</div>
                      <button className="mt-2 text-[10px] bg-sage text-white px-2 py-1 rounded w-full hover:bg-sage/90 transition-colors">
                        Add Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone"
      >
        <motion.div
          animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse size={24} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}

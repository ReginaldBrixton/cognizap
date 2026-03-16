import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { Folder, Search, Settings, User, X, Loader2 } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  user_id: string;
  created_at: string;
}

const Particle: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/20 rounded-full"
      initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "vw" }}
      animate={{
        opacity: [0, 1, 0],
        y: "-10vh",
        x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`,
      }}
      transition={{
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
}

export function Workspace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects(currentUser.uid);
      } else {
        setProjects([]);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProjects = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isDesktop) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const openNewModal = () => {
    if (!user) {
      alert("Please log in to create a project.");
      return;
    }
    setEditingProject(null);
    setFormData({ title: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({ title: project.title, description: project.description });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!user || !formData.title.trim() || !formData.description.trim()) return;
    
    setIsSaving(true);
    try {
      if (editingProject) {
        // Update
        const response = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          fetchProjects(user.uid);
          setIsModalOpen(false);
        }
      } else {
        // Create
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, user_id: user.uid })
        });
        if (response.ok) {
          fetchProjects(user.uid);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Failed to save project', error);
    } finally {
      setIsSaving(false);
    }
  };

  const colors = [
    { color: "bg-sage/20", border: "border-sage/30" },
    { color: "bg-blue-500/10", border: "border-blue-500/20" },
    { color: "bg-amber-500/10", border: "border-amber-500/20" },
    { color: "bg-purple-500/10", border: "border-purple-500/20" },
  ];

  return (
    <section id="workspace" className="relative min-h-screen bg-sand dark:bg-night py-32 overflow-hidden flex items-center justify-center transition-colors duration-500">
      {/* Ambient Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle key={i} delay={i * 0.5} />
      ))}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark dark:text-night-text mb-6">Your Research Garden</h2>
          <p className="text-lg md:text-xl text-stone dark:text-night-muted max-w-2xl mx-auto">
            A workspace that feels alive. Projects grow organically as you nurture them.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="w-full max-w-5xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center"
        >
          <motion.div
            style={{ 
              rotateX: isDesktop ? rotateX : 0, 
              rotateY: isDesktop ? rotateY : 0, 
              transformStyle: "preserve-3d" 
            }}
            className="w-full h-full glass dark:bg-night-surface/60 rounded-[2rem] border border-clay dark:border-night-border shadow-2xl p-3 md:p-4 flex gap-3 md:gap-4"
          >
            {/* Sidebar */}
            <div className="w-20 md:w-64 flex flex-col gap-6 bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-clay dark:border-white/5">
              <div className="flex items-center gap-3 text-dark dark:text-night-text font-serif text-xl mb-8">
                <div className="w-8 h-8 rounded-full bg-sage/80 flex items-center justify-center text-white">C</div>
                <span className="hidden md:block">CogniZap</span>
              </div>
              
              <nav className="flex flex-col gap-2">
                {[
                  { icon: <Folder size={20} />, label: "Projects", active: true },
                  { icon: <Search size={20} />, label: "Search" },
                  { icon: <Settings size={20} />, label: "Settings" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      item.active ? "bg-sage/20 text-sage" : "text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text hover:bg-white/50 dark:hover:bg-white/5"
                    )}
                  >
                    {/* Liquid Hover State */}
                    <div className="absolute inset-0 bg-sage/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                    <span className="relative z-10">{item.icon}</span>
                    <span className="relative z-10 hidden md:block">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-auto flex items-center gap-3 text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text transition-colors p-4">
                <User size={20} />
                <span className="hidden md:block">Profile</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white/50 dark:bg-white/5 rounded-2xl border border-clay dark:border-white/5 p-8 flex flex-col gap-8 overflow-hidden relative">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif text-dark dark:text-night-text">Active Gardens</h3>
                <button 
                  onClick={openNewModal}
                  className="bg-sage/20 text-sage px-4 py-2 rounded-full text-sm hover:bg-sage/30 transition-colors"
                >
                  + New Seed
                </button>
              </div>

              {/* Project Cells */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="animate-spin text-sage" size={32} />
                  </div>
                ) : !user ? (
                  <div className="flex justify-center items-center h-full text-stone dark:text-night-muted text-center">
                    Please log in to view your projects.
                  </div>
                ) : projects.length === 0 ? (
                  <div className="flex justify-center items-center h-full text-stone dark:text-night-muted text-center">
                    No projects yet. Plant a new seed!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                    {projects.map((project, i) => {
                      const colorScheme = colors[i % colors.length];
                      return (
                        <motion.div
                          key={project.id}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => openEditModal(project)}
                          className={cn(
                            "group relative aspect-square rounded-[3rem] border p-6 flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-500",
                            colorScheme.color,
                            colorScheme.border
                          )}
                        >
                          {/* Preview Shimmer */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                          
                          <div className="relative z-10">
                            <h4 className="text-dark dark:text-night-text font-medium text-lg mb-1 line-clamp-2">{project.title}</h4>
                            <p className="text-stone dark:text-night-muted text-sm line-clamp-2">{project.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-night-surface rounded-3xl p-6 w-full max-w-md shadow-2xl border border-dark/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-dark dark:text-night-text">
                  {editingProject ? 'Edit Project' : 'New Seed'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-stone hover:text-dark dark:text-night-muted dark:hover:text-night-text">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone dark:text-night-muted mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-sand/50 dark:bg-black/20 border border-dark/10 dark:border-white/10 text-dark dark:text-night-text focus:outline-none focus:ring-2 focus:ring-sage"
                    placeholder="Project Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone dark:text-night-muted mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-sand/50 dark:bg-black/20 border border-dark/10 dark:border-white/10 text-dark dark:text-night-text focus:outline-none focus:ring-2 focus:ring-sage resize-none h-32"
                    placeholder="Project Description"
                  />
                </div>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving || !formData.title.trim() || !formData.description.trim()}
                  className="w-full py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage/90 transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                  {isSaving ? <Loader2 size={20} className="animate-spin" /> : 'Save Project'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

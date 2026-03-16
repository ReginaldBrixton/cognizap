import React, { useState, Suspense } from 'react';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Confetti } from '../components/Confetti';
import { CheckCircle2, ArrowRight, Sparkles, User, Mail, Phone } from 'lucide-react';

export function EarlyAccess() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await fetch('/api/early-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitted(true);
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative flex-1 flex flex-col bg-sand dark:bg-night overflow-hidden">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
            borderRadius: ["40% 60% 70% 30%", "30% 70% 40% 60%", "40% 60% 70% 30%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-sage/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70%", "70% 30% 60% 40%", "60% 40% 30% 70%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-clay/15 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Confetti Canvas - Fixed to cover entire screen */}
      {submitted && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Suspense fallback={null}>
              <Confetti />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-20 pt-32 pb-32">
        <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left Column: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-8 border border-sage/20 shadow-sm">
              <Sparkles size={16} />
              <span>Limited Availability</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6 text-dark dark:text-night-text leading-tight">
              Study Smarter with <br className="hidden md:block" />
              <span className="italic text-sage">CogniZap.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone dark:text-night-muted mb-10 leading-relaxed">
              We're rolling out early access to researchers, developers, and students who want to study smarter, not harder, with our unified AI workspace.
            </p>
            
            <ul className="space-y-5 text-left hidden md:block">
              {[
                "Unified Multi-Provider AI Gateway",
                "Advanced Academic Research Tools",
                "Comprehensive Content Analysis",
                "Full Project & Document Management"
              ].map((benefit, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 text-dark/80 dark:text-night-text/80 text-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-sage shrink-0 shadow-[0_0_8px_rgba(var(--color-sage),0.5)]" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="backdrop-blur-2xl bg-white/70 dark:bg-black/40 border border-white/60 dark:border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
              {/* Inner subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                {!submitted ? (
                  <>
                    <div className="mb-8 text-center md:text-left">
                      <h2 className="text-3xl font-serif font-medium text-dark dark:text-night-text mb-3">Request Access</h2>
                      <p className="text-stone dark:text-night-muted text-base">Tell us a bit about yourself to secure your spot.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark/40 dark:text-white/40 group-focus-within:text-sage transition-colors">
                            <User size={20} />
                          </div>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-night/60 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage/50 transition-all placeholder:text-dark/40 dark:placeholder:text-white/40 text-dark dark:text-night-text shadow-sm"
                          />
                        </div>
                        
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark/40 dark:text-white/40 group-focus-within:text-sage transition-colors">
                            <Mail size={20} />
                          </div>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Work or University Email"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-night/60 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage/50 transition-all placeholder:text-dark/40 dark:placeholder:text-white/40 text-dark dark:text-night-text shadow-sm"
                          />
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark/40 dark:text-white/40 group-focus-within:text-sage transition-colors">
                            <Phone size={20} />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number (Optional)"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-night/60 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage/50 transition-all placeholder:text-dark/40 dark:placeholder:text-white/40 text-dark dark:text-night-text shadow-sm"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 mt-6 bg-dark text-white dark:bg-white dark:text-dark rounded-2xl font-medium hover:bg-dark/90 dark:hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-lg"
                      >
                        {isSubmitting ? 'Securing Spot...' : 'Secure My Spot'}
                        {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                      </button>
                      
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-sm text-red-500 mt-4 bg-red-50 dark:bg-red-900/20 py-2 rounded-lg border border-red-100 dark:border-red-900/30"
                        >
                          {error}
                        </motion.p>
                      )}
                      
                      <p className="text-center text-xs text-stone/70 dark:text-night-muted/70 mt-6">
                        By requesting access, you agree to our Privacy Policy.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
                      className="w-24 h-24 bg-gradient-to-br from-sage to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-sage/30"
                    >
                      <CheckCircle2 size={48} strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-4xl font-serif mb-4 text-dark dark:text-night-text">You're on the list!</h2>
                    
                    <div className="bg-white/50 dark:bg-black/40 rounded-2xl p-6 border border-dark/5 dark:border-white/5 mb-8 shadow-inner">
                      <p className="text-stone dark:text-night-muted leading-relaxed mb-3 text-lg">
                        Thank you, <span className="font-medium text-dark dark:text-white">{formData.name.split(' ')[0]}</span>.
                      </p>
                      <p className="text-stone dark:text-night-muted leading-relaxed text-sm">
                        We've reserved your spot in line. Keep an eye on <br/>
                        <strong className="text-dark dark:text-white font-medium mt-1 inline-block">{formData.email}</strong> <br/>
                        for your exclusive invitation.
                      </p>
                    </div>

                    <button 
                      onClick={() => window.location.href = '/'} 
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black/5 dark:bg-white/10 text-dark dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                    >
                      Return to Home
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

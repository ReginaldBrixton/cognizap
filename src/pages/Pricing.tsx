import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Explorer',
    price: 'Free',
    description: 'Perfect for students and casual researchers.',
    features: [
      'Up to 100 documents',
      'Basic AI synthesis',
      'Standard export formats',
      'Community support'
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Scholar',
    price: 'GH₵ 150',
    period: '/month',
    description: 'For dedicated researchers needing deeper insights.',
    features: [
      'Unlimited documents',
      'Advanced AI synthesis & citations',
      'Custom export templates',
      'Priority email support',
      'Collaboration tools'
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Institute',
    price: 'Custom',
    description: 'Enterprise-grade features for research teams.',
    features: [
      'Everything in Scholar',
      'Dedicated success manager',
      'Custom AI model fine-tuning',
      'Advanced analytics',
      'SSO & advanced security'
    ],
    cta: 'Contact Sales',
    popular: false,
  }
];

export function Pricing() {
  return (
    <div className="relative flex-1 flex flex-col">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
            borderRadius: ["40% 60% 70% 30%", "30% 70% 40% 60%", "40% 60% 70% 30%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sage/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70%", "70% 30% 60% 40%", "60% 40% 30% 70%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-clay/20 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl mb-6"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone dark:text-night-muted max-w-2xl mx-auto"
          >
            Choose the perfect plan for your research needs. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`relative group rounded-3xl p-8 backdrop-blur-2xl bg-white/40 dark:bg-black/20 border ${
                tier.popular 
                  ? 'border-sage/50 shadow-2xl shadow-sage/20 dark:shadow-sage/10' 
                  : 'border-white/50 dark:border-white/10 shadow-xl'
              } transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-black/40`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sage text-white px-4 py-1 rounded-full text-sm font-medium tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-medium mb-2">{tier.name}</h3>
                <p className="text-stone dark:text-night-muted text-sm h-10">{tier.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                {tier.period && <span className="text-stone dark:text-night-muted">{tier.period}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-sage shrink-0" />
                    <span className="text-dark/80 dark:text-night-text/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/early-access"
                className={`block w-full py-4 rounded-xl text-center font-medium transition-all duration-300 ${
                  tier.popular
                    ? 'bg-dark text-white dark:bg-white dark:text-dark hover:bg-dark/90 dark:hover:bg-white/90 shadow-lg'
                    : 'bg-white/50 dark:bg-white/5 text-dark dark:text-night-text hover:bg-white/80 dark:hover:bg-white/10 border border-dark/10 dark:border-white/10'
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

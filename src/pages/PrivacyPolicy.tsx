import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
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
          className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-sage/10 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70%", "70% 30% 60% 40%", "60% 40% 30% 70%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-clay/10 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Privacy Policy</h1>
          <p className="text-stone dark:text-night-muted text-lg">Last updated: March 14, 2026</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 prose prose-stone dark:prose-invert max-w-none"
        >
          <div className="space-y-8 text-dark/80 dark:text-night-text/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">1. Introduction</h2>
              <p>
                Welcome to CogniZap ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">2. The Data We Collect About You</h2>
              <p className="mb-4">
                Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">3. How We Use Your Personal Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">5. Your Legal Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@cognizap.com.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

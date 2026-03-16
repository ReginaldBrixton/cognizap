import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function TermsOfService() {
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
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sage/10 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70%", "70% 30% 60% 40%", "60% 40% 30% 70%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-clay/10 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 flex-1 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Terms of Service</h1>
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
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on CogniZap's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials.</li>
                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                <li>Attempt to decompile or reverse engineer any software contained on CogniZap's website.</li>
                <li>Remove any copyright or other proprietary notations from the materials.</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
              <p className="mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by CogniZap at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">3. Disclaimer</h2>
              <p>
                The materials on CogniZap's website are provided on an 'as is' basis. CogniZap makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">4. Limitations</h2>
              <p>
                In no event shall CogniZap or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CogniZap's website, even if CogniZap or a CogniZap authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on CogniZap's website could include technical, typographical, or photographic errors. CogniZap does not warrant that any of the materials on its website are accurate, complete or current. CogniZap may make changes to the materials contained on its website at any time without notice. However CogniZap does not make any commitment to update the materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">6. Links</h2>
              <p>
                CogniZap has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CogniZap of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">7. Modifications</h2>
              <p>
                CogniZap may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-dark dark:text-night-text mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

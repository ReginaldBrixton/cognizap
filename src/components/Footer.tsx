import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const links = [
  { title: "Product", items: [{ label: "Product", href: "/product" }, { label: "Features", href: "/features" }, { label: "Integrations", href: "/integrations" }, { label: "Pricing", href: "/pricing" }] },
  { title: "Resources", items: [{ label: "Documentation", href: "#" }, { label: "Blog", href: "#" }, { label: "Community", href: "#" }, { label: "Help Center", href: "#" }] },
  { title: "Company", items: [{ label: "About Us", href: "#" }, { label: "Careers", href: "#" }, { label: "Changelog", href: "/changelog" }, { label: "Contact", href: "#" }] },
];

function StrikethroughLink({ children, href }: { children: React.ReactNode, href: string }) {
  const isRouterLink = href.startsWith('/') && !href.startsWith('/#');
  
  if (isRouterLink) {
    return (
      <Link to={href} className="group relative inline-block text-[#8e8e93] hover:text-[#007aff] dark:hover:text-[#0a84ff] transition-colors duration-300 py-1 text-[14px] font-medium">
        {children}
        <span className="absolute left-0 top-1/2 h-[1px] w-0 bg-[#007aff] dark:bg-[#0a84ff] transition-all duration-300 group-hover:w-full ease-[cubic-bezier(0.4,0,0.2,1)]" />
      </Link>
    );
  }

  return (
    <a href={href} className="group relative inline-block text-[#8e8e93] hover:text-[#007aff] dark:hover:text-[#0a84ff] transition-colors duration-300 py-1 text-[14px] font-medium">
      {children}
      <span className="absolute left-0 top-1/2 h-[1px] w-0 bg-[#007aff] dark:bg-[#0a84ff] transition-all duration-300 group-hover:w-full ease-[cubic-bezier(0.4,0,0.2,1)]" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden transition-colors duration-500 bg-gradient-to-b from-[#fafafc]/88 to-[#fafafc]/75 dark:from-[#1c1c1e]/88 dark:to-[#1c1c1e]/75 backdrop-blur-[25px] saturate-[200%] border-t-[0.5px] border-white/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
      {/* Chrome Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

      {/* Inner light sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 dark:from-white/5 to-transparent pointer-events-none z-0 h-[40%]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#007aff] dark:bg-[#0a84ff] shadow-[0_2px_12px_rgba(0,122,255,0.3)]" />
              <span className="font-semibold text-xl tracking-tight text-[#3c3c43] dark:text-white/90">CogniZap</span>
            </div>
            <p className="text-[#8e8e93] text-[13px] max-w-xs leading-relaxed">
              The research renaissance is here. Organize your mind, discover new connections, and write with clarity.
            </p>
          </div>

          {links.map((section, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h4 className="font-bold text-[11px] tracking-[0.06em] uppercase text-[#8e8e93] mb-1">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <StrikethroughLink href={item.href}>{item.label}</StrikethroughLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t-[0.5px] border-[#e5e5ea] dark:border-[#3a3a3c] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#8e8e93]">
          <p>© {new Date().getFullYear()} CogniZap Inc. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex gap-6">
              <StrikethroughLink href="/privacy">Privacy Policy</StrikethroughLink>
              <StrikethroughLink href="/terms">Terms of Service</StrikethroughLink>
            </div>
            <div className="hidden md:block w-[1px] h-4 bg-[#e5e5ea] dark:bg-[#3a3a3c]"></div>
            <p className="text-[12px] tracking-wide">Designed by <span className="font-semibold text-[#3c3c43] dark:text-white/90">Reginald Brixton</span></p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

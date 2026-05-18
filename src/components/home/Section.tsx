import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Section = ({ title, subtitle, children, hasNavigation = false }: { title: string, subtitle: string, children: React.ReactNode, hasNavigation?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="font-label text-white/70 uppercase tracking-[0.3em] text-xs mb-4 block">{subtitle}</span>
          <h3 className="font-heading font-medium text-4xl md:text-6xl text-white leading-tight">{title}</h3>
        </div>
        {hasNavigation && (
          <div className="flex items-center gap-4">
            <button className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </div>
      {children}
    </motion.section>
  );
};

export default Section;

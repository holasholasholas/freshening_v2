"use client";

import { motion } from "framer-motion";
import { clientLogos } from "@/data/content";

export default function SocialProofMarquee() {
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="relative w-full py-16 md:py-20 bg-surface-white border-b border-surface-border overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block"
        >
          Trusted By Industry Leaders
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-display font-bold text-brand-navy"
        >
          Enterprise-Grade Partnerships
        </motion.h2>
      </div>

      <div className="relative w-full">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-surface-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-surface-white to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex flex-nowrap items-center w-max gap-12 md:gap-20 pr-12 md:pr-20"
        >
          {duplicatedLogos.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="w-28 h-12 md:w-36 md:h-14 flex items-center justify-center bg-surface-muted/50 rounded-xl px-4 border border-surface-border/50">
                <span className="font-display font-bold text-sm md:text-base text-text-muted tracking-tight whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

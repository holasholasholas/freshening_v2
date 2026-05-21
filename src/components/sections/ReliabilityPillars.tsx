"use client";

import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Building2,
  Award,
  HeartPulse,
  ClipboardCheck,
  Trees,
  Star,
} from "lucide-react";
import { reliabilityPillars } from "@/data/content";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  ShieldCheck,
  Building2,
  Award,
  HeartPulse,
  ClipboardCheck,
  Trees,
  Star,
};

export default function ReliabilityPillars() {
  return (
    <section id="standards" className="relative w-full py-20 md:py-28 bg-brand-navy z-10 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
            Enterprise-Grade Reliability
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Certified Excellence,<br />Uncompromising Standards
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Every product is manufactured under the strictest quality, safety, and
            environmental protocols — because your reputation depends on it.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {reliabilityPillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Shield;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mb-4 group-hover:bg-brand-teal/20 transition-colors">
                  <Icon size={24} className="text-brand-teal" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">
                  {pillar.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

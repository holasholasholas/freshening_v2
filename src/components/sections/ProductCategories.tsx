"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Baby, HeartPulse, Home, PawPrint, Utensils } from "lucide-react";
import { productCategories } from "@/data/content";

const categoryIcons: Record<string, React.ElementType> = {
  "Personal Care": Sparkles,
  "Baby & Child Care": Baby,
  "Medical Care": HeartPulse,
  "Home Care": Home,
  "Pet Care": PawPrint,
  "Foodservice": Utensils,
};

export default function ProductCategories() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-surface-white z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
              Product Ranges
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight">
              End-to-End Hygiene Solutions
            </h2>
            <p className="text-text-secondary mt-4 text-lg">
              Six specialized categories engineered for the demanding requirements
              of global industries.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {productCategories.map((cat, i) => {
            const Icon = categoryIcons[cat.name] || Sparkles;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl bg-surface-off border border-surface-border hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 to-brand-teal/0 group-hover:from-brand-teal/5 group-hover:to-brand-teal/0 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mb-5 group-hover:bg-brand-teal/20 transition-colors">
                    <Icon size={24} className="text-brand-teal" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-brand-navy mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-brand-teal text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

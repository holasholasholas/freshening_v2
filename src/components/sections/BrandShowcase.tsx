"use client";

import { motion } from "framer-motion";
import { houseBrands } from "@/data/content";

export default function BrandShowcase() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-surface-off z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight">
            House Brands
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Nine iconic brands spanning personal care, medical, foodservice, pet
            care, and home hygiene — each a market leader in its category.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {houseBrands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group p-6 md:p-8 rounded-2xl bg-white border border-surface-border hover:border-brand-teal/30 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-teal/5 flex items-center justify-center mb-4 group-hover:from-brand-teal/20 group-hover:to-brand-teal/10 transition-all">
                <span className="font-display font-bold text-xl text-brand-teal">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">
                {brand.name}
              </h3>
              <p className="text-text-muted text-sm">{brand.tagline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

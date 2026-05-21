"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Sun, Droplets, ShieldCheck, Trees, FlaskConical, Heart, Award } from "lucide-react";
import { ecosphereContent } from "@/data/content";

const ecoIcons: Record<string, React.ElementType> = {
  "100% Compostable Material": Leaf,
  "FSC Certified": Trees,
  "21-Day Biodegradation": Recycle,
  "Mono Plastic Packaging": Recycle,
  "Greener Printing": Award,
  "Plant-Based Actives": FlaskConical,
  "Natural Formulation": Leaf,
  "Food-Grade Formulation": Heart,
  "99% Pure Water": Droplets,
  "Cruelty-Free": Heart,
  "SMETA Audited": ShieldCheck,
  "ISO 14001": Award,
};

export default function EcosphereSection() {
  return (
    <section id="ecosphere" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-surface-white to-green-50/30 z-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-mono text-xs tracking-widest uppercase mb-3 block">
            Sustainability & ESG
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight">
            {ecosphereContent.title}
          </h2>
          <p className="text-emerald-700 font-medium mt-2">{ecosphereContent.subtitle}</p>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            {ecosphereContent.description}
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {ecosphereContent.highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
                {i === 0 && <FlaskConical size={24} className="text-emerald-600" />}
                {i === 1 && <Recycle size={24} className="text-emerald-600" />}
                {i === 2 && <Sun size={24} className="text-emerald-600" />}
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Green Standards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-display font-bold text-brand-navy text-center mb-10">
            Our Green Standards
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ecosphereContent.greenStandards.map((standard, i) => {
              const Icon = ecoIcons[standard.label] || Leaf;
              return (
                <motion.div
                  key={standard.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-emerald-100/50 hover:border-emerald-300/50 transition-all duration-200"
                >
                  <Icon size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-brand-navy block leading-tight">
                      {standard.label}
                    </span>
                    <span className="text-xs text-text-muted mt-0.5 block">
                      {standard.description}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-brand-navy text-center mb-10">
            Our Green Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-300 transform md:-translate-x-px" />

            <div className="space-y-8">
              {ecosphereContent.timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year badge */}
                  <div className={`flex-shrink-0 w-full md:w-1/2 flex ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="font-display font-bold text-brand-navy">{item.year}</span>
                    </div>
                  </div>

                  {/* Event */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                    <p className="text-text-secondary text-sm leading-relaxed bg-white/60 p-4 rounded-xl border border-emerald-50">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

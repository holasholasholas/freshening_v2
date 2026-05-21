"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Package, FlaskConical } from "lucide-react";
import { privateLabel, contractManufacturing, packagingConfigs } from "@/data/content";

type TabType = "private-label" | "contract-mfg";

export default function CoreCapabilities() {
  const [activeTab, setActiveTab] = useState<TabType>("private-label");

  const currentData = activeTab === "private-label" ? privateLabel : contractManufacturing;

  return (
    <section id="capabilities" className="relative w-full py-20 md:py-28 bg-surface-white z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight">
            Two Pathways to Market Leadership
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Whether you need a turnkey private label solution or a fully bespoke
            contract manufacturing partnership, our 30+ years of expertise
            delivers.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-surface-muted rounded-2xl border border-surface-border">
            <button
              onClick={() => setActiveTab("private-label")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "private-label"
                  ? "bg-brand-navy text-white shadow-lg"
                  : "text-text-secondary hover:text-brand-navy"
              }`}
            >
              <Package size={18} />
              Private Label (Turnkey)
            </button>
            <button
              onClick={() => setActiveTab("contract-mfg")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "contract-mfg"
                  ? "bg-brand-navy text-white shadow-lg"
                  : "text-text-secondary hover:text-brand-navy"
              }`}
            >
              <FlaskConical size={18} />
              Contract Manufacturing (Bespoke)
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          >
            {/* Left: Description & Benefits */}
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-3">
                {currentData.title}
              </h3>
              <p className="text-brand-teal font-medium text-sm mb-4">
                {currentData.subtitle}
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                {currentData.description}
              </p>

              <div className="space-y-3 mb-8">
                {currentData.benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-brand-teal mt-0.5 flex-shrink-0"
                    />
                    <span className="text-text-primary font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-brand-teal/20 group"
              >
                Start Your {activeTab === "private-label" ? "Private Label" : "Bespoke"} Journey
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            {/* Right: Process Steps */}
            <div className="bg-surface-off rounded-2xl p-8 border border-surface-border">
              <h4 className="font-display font-bold text-lg text-brand-navy mb-6">
                Our Proven Process
              </h4>
              <div className="space-y-0">
                {currentData.steps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4 pb-6 relative last:pb-0"
                  >
                    {/* Step number with connector line */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-brand-teal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {i < currentData.steps.length - 1 && (
                        <div className="w-px flex-1 bg-surface-border mt-1" />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <span className="text-text-primary font-medium text-sm">
                        {step}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Packaging Configurations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 pt-16 border-t border-surface-border"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-3">
              Packaging Configurations
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              From single-serve sachets to bulk liquid bottling — our production
              lines handle every format with precision.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {packagingConfigs.map((config, i) => (
              <motion.div
                key={config.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-xl bg-surface-off border border-surface-border hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-3 group-hover:bg-brand-teal/20 transition-colors">
                  <Package size={20} className="text-brand-teal" />
                </div>
                <h4 className="font-display font-semibold text-sm text-brand-navy mb-1">
                  {config.name}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {config.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

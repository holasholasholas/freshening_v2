"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { heroContent } from "@/data/content";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-brand-navy"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy z-10" />
      <div className="absolute inset-0 bg-grid-pattern-dark z-10 opacity-30" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-brand-teal-dark/10 rounded-full blur-[100px] pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
        >
          <Shield size={14} className="text-brand-teal" />
          <span className="text-xs font-medium tracking-widest uppercase text-white/70">
            {heroContent.badge}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-5xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-[1.05] mb-6">
            {heroContent.headline}{" "}
            <span className="text-gradient">{heroContent.headlineHighlight}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto mt-4 leading-relaxed">
            {heroContent.subheadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="group px-8 py-4 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(0,180,216,0.3)] hover:shadow-[0_0_50px_rgba(0,180,216,0.5)] flex items-center gap-2 w-full sm:w-auto justify-center text-base"
          >
            {heroContent.primaryCta}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#capabilities"
            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium transition-all duration-300 hover:bg-white/10 w-full sm:w-auto justify-center text-base"
          >
            {heroContent.secondaryCta}
          </a>
        </motion.div>

        {/* Enterprise trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { label: "38+ Countries", sub: "Global Reach" },
            { label: "3 Plants", sub: "World-Class" },
            { label: "30+ Years", sub: "Industry Leadership" },
            { label: "5,000+", sub: "Products Developed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-white font-display font-bold text-xl md:text-2xl">
                {stat.label}
              </div>
              <div className="text-white/40 text-xs tracking-wider uppercase mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-20 flex flex-col items-center gap-2 pb-8"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { enterpriseStats } from "@/data/content";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy tracking-tighter">
      {isInView ? (
        <CountUp end={value} duration={2} />
      ) : (
        <span>0</span>
      )}
      {suffix}
    </span>
  );
}

function CountUp({ end, duration }: { end: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <CountingNumber end={end} duration={duration} />
        </motion.span>
      ) : (
        "0"
      )}
    </span>
  );
}

function CountingNumber({ end, duration }: { end: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (!ref.current) return;
        let start = 0;
        const increment = Math.ceil(end / (duration * 60));
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            ref.current!.textContent = end.toLocaleString();
            clearInterval(timer);
          } else {
            ref.current!.textContent = start.toLocaleString();
          }
        }, 1000 / 60);
      }}
    >
      0
    </motion.span>
  );
}

export default function ImpactStatsGrid() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-surface-off z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
            A Legacy of Scale & Trust
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            For over three decades, Freshening has built an infrastructure of
            uncompromising quality, global reach, and manufacturing mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {enterpriseStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-white border border-surface-border/50 hover:border-brand-teal/30 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-300"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span className="text-text-secondary text-sm font-medium mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

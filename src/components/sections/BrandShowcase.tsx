"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { houseBrands } from "@/data/content";

const TOTAL = houseBrands.length; // 9

// ── Responsive config ────────────────────────────────────────
function useResponsiveConfig() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return {
    cardWidth: isMobile ? 260 : 380,
  };
}

// ── Clamp an index to [0, TOTAL) with wrap ───────────────────
function wrapIndex(i: number): number {
  return ((i % TOTAL) + TOTAL) % TOTAL;
}

export default function BrandShowcase() {
  const config = useResponsiveConfig();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoSpinRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Track centre index ─────────────────────────────────────
  const [centreIndex, setCentreIndex] = useState(0); // card shown front-and-centre

  // ── Drag offset (px) ───────────────────────────────────────
  const offsetX = useMotionValue(0);
  const smoothOffset = useSpring(offsetX, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  // Threshold for triggering a card change
  const THRESHOLD = config.cardWidth * 0.35;

  // ── Auto-advance ───────────────────────────────────────────
  const startAutoSpin = () => {
    if (autoSpinRef.current) return;
    autoSpinRef.current = setInterval(() => {
      setCentreIndex((prev) => wrapIndex(prev + 1));
    }, 3000);
  };

  const stopAutoSpin = () => {
    if (autoSpinRef.current) {
      clearInterval(autoSpinRef.current);
      autoSpinRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSpin();
    return () => stopAutoSpin();
  }, []);

  // ── Drag handlers ──────────────────────────────────────────
  const handleDragStart = () => {
    stopAutoSpin();
    setIsDragging(true);
    if (dragTimeout.current) clearTimeout(dragTimeout.current);
  };

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    offsetX.set(info.offset.x);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const finalOffset = info.offset.x;

    // Determine direction from final offset
    if (finalOffset < -THRESHOLD) {
      // Dragged left → next card
      setCentreIndex((prev) => wrapIndex(prev + 1));
    } else if (finalOffset > THRESHOLD) {
      // Dragged right → previous card
      setCentreIndex((prev) => wrapIndex(prev - 1));
    }

    // Reset offset to animate back to 0
    offsetX.set(0);

    // Resume auto-spin after delay
    dragTimeout.current = setTimeout(() => {
      startAutoSpin();
    }, 2000);
  };

  // ── Click ──────────────────────────────────────────────────
  const handleCardClick = (index: number) => {
    if (isDragging) return;
    setSelectedIndex(index);
  };

  const closeDrawer = () => setSelectedIndex(null);

  // ── Jump to card via dot ────────────────────────────────────
  const jumpTo = (index: number) => {
    stopAutoSpin();
    setCentreIndex(index);
    offsetX.set(0);
    if (dragTimeout.current) clearTimeout(dragTimeout.current);
    dragTimeout.current = setTimeout(() => startAutoSpin(), 2000);
  };

  // ── Compute visible cards (current ± 2) ────────────────────
  const visibleCards = [-2, -1, 0, 1, 2].map((delta) => {
    const idx = wrapIndex(centreIndex + delta);
    return { delta, idx, brand: houseBrands[idx] };
  });

  return (
    <section className="relative w-full py-20 md:py-28 bg-surface-off z-10 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-teal/3 rounded-full blur-[150px] pointer-events-none" />

      {/* ─── Header ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
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
      </div>

      {/* ─── Carousel ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full flex flex-col items-center"
      >
        {/* Drag area */}
        <motion.div
          className="relative w-full h-[360px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
          onPanStart={handleDragStart}
          onPan={handleDrag}
          onPanEnd={handleDragEnd}
          style={{ touchAction: "none" }}
        >
          {/* Cards track */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {visibleCards.map(({ delta, idx, brand }) => {
                // Cards at ±2 are barely visible, serve as "next" preview
                const absDelta = Math.abs(delta);
                const isCentre = delta === 0;

                // Base X offset: centre card at 0, neighbours shifted
                const baseX = delta * (config.cardWidth + 24); // 24px gap

                // Opacity falls off with distance
                const opacity = absDelta === 0 ? 1 : absDelta === 1 ? 0.5 : 0.15;
                const scale = absDelta === 0 ? 1 : absDelta === 1 ? 0.85 : 0.7;
                const zIndex = 10 - absDelta;

                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity,
                      scale,
                      zIndex,
                      filter: isCentre
                        ? "blur(0px)"
                        : `blur(${absDelta * 2}px)`,
                    }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      mass: 0.5,
                    }}
                    className="absolute"
                    style={{
                      width: config.cardWidth,
                      // Centre card tracks drag; neighbours stay at base positions
                      x: delta === 0 ? smoothOffset : baseX,
                    }}
                    onClick={() => !isDragging && handleCardClick(idx)}
                  >
                    <BrandCard
                      brand={brand}
                      index={idx}
                      cardWidth={config.cardWidth}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Edge fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-off to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-surface-off z-20" />
        </motion.div>

        {/* ── Nav dots ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 mt-6">
          {houseBrands.map((brand, i) => (
            <button
              key={brand.name}
              onClick={() => jumpTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === centreIndex
                  ? "bg-brand-teal w-6"
                  : "bg-surface-border hover:bg-brand-teal/50"
              }`}
              aria-label={`Go to ${brand.name}`}
            />
          ))}
        </div>

        {/* Instruction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center text-text-muted text-xs mt-4 tracking-wide"
        >
          Drag to browse &nbsp;·&nbsp; Click a brand to explore
        </motion.p>
      </motion.div>

      {/* ─── Detail Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-brand-navy/60 backdrop-blur-sm"
              onClick={closeDrawer}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                },
              }}
              exit={{
                y: "100%",
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.15)] max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              <div className="max-w-3xl mx-auto px-6 pt-8 pb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-10 h-1 rounded-full bg-surface-border" />
                </div>

                <button
                  onClick={closeDrawer}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-muted hover:bg-surface-border flex items-center justify-center transition-colors"
                  aria-label="Close detail drawer"
                >
                  <X size={18} className="text-text-secondary" />
                </button>

                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal-dark flex items-center justify-center mb-6 shadow-lg shadow-brand-teal/20">
                  <span className="font-display font-bold text-3xl text-white">
                    {houseBrands[selectedIndex].name.charAt(0)}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-navy mb-2">
                  {houseBrands[selectedIndex].name}
                </h3>
                <p className="text-brand-teal font-semibold text-sm tracking-wide mb-6">
                  {houseBrands[selectedIndex].tagline}
                </p>

                <p className="text-text-secondary leading-relaxed text-base mb-8">
                  {houseBrands[selectedIndex].bio}
                </p>

                {houseBrands[selectedIndex].linkLabel && (
                  <a
                    href={houseBrands[selectedIndex].linkHref ?? "#"}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-brand-teal/20"
                  >
                    {houseBrands[selectedIndex].linkLabel}
                    <ArrowRight size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Brand Card (flat, no 3D CSS) ────────────────────────────
function BrandCard({
  brand,
  index,
  cardWidth,
}: {
  brand: (typeof houseBrands)[number];
  index: number;
  cardWidth: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const smoothX = useSpring(spotlightX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(spotlightY, { stiffness: 150, damping: 15 });

  const hoverScale = useSpring(1, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotlightX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotlightY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const fallbackHue = (index * 40) % 360;
  const accentColor = `hsl(${fallbackHue}, 60%, 55%)`;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full rounded-2xl overflow-hidden border border-surface-border bg-white shadow-xl select-none"
      style={{ scale: hoverScale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => hoverScale.set(1.03)}
      onMouseLeave={() => {
        hoverScale.set(1);
        spotlightX.set(50);
        spotlightY.set(50);
      }}
    >
      {/* Magnetic spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(360px circle at var(--sx) var(--sy), rgba(0,180,216,0.14) 0%, transparent 55%)`,
          "--sx": smoothX,
          "--sy": smoothY,
        } as React.CSSProperties & { "--sx": typeof smoothX; "--sy": typeof smoothY }}
      />

      <div className="relative z-20 p-6 md:p-8">
        {/* Accent bar */}
        <div
          className="w-full h-1 rounded-full mb-5"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />

        {/* Initial badge */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-teal/5 flex items-center justify-center mb-5">
          <span className="font-display font-bold text-xl text-brand-teal">
            {brand.name.charAt(0)}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg md:text-xl text-brand-navy mb-2">
          {brand.name}
        </h3>
        <p className="text-text-muted text-sm leading-snug line-clamp-2">
          {brand.tagline}
        </p>
      </div>

      {/* Bottom shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />
    </motion.div>
  );
}
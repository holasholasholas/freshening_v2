"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofMarquee from "@/components/sections/SocialProofMarquee";
import ImpactStatsGrid from "@/components/sections/ImpactStatsGrid";
import CoreCapabilities from "@/components/sections/CoreCapabilities";
import ReliabilityPillars from "@/components/sections/ReliabilityPillars";
import EcosphereSection from "@/components/sections/EcosphereSection";
import BrandShowcase from "@/components/sections/BrandShowcase";
import ProductCategories from "@/components/sections/ProductCategories";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import GlobalPresenceSection from "@/components/sections/GlobalPresenceSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import Footer from "@/components/Footer";

// Dynamically import WebGL background to avoid SSR issues with canvas
const WebGLBackground = dynamic(
  () => import("@/components/WebGLBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Fixed WebGL Background */}
      <WebGLBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full relative z-10">
        <HeroSection />
        <SocialProofMarquee />
        <ImpactStatsGrid />
        <GlobalPresenceSection />
        <CoreCapabilities />
        <ReliabilityPillars />
        <BrandShowcase />
        <ProductCategories />
        <EcosphereSection />
        <TestimonialCarousel />
        <LeadFormSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

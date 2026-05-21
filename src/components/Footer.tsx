"use client";

import { ArrowRight, Mail, MapPin, Phone, Globe } from "lucide-react";
import { siteConfig, globalOffices } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-white pt-20 pb-8 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" className="font-display font-bold text-3xl tracking-tighter text-white mb-4 block">
              {siteConfig.name}
              <span className="text-brand-teal">.</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              {siteConfig.tagline}. Est. {siteConfig.founded}. Headquartered in Singapore.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">{siteConfig.headquarters}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-brand-teal flex-shrink-0" />
                <span className="text-white/60 text-sm">{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-teal flex-shrink-0" />
                <span className="text-white/60 text-sm">{siteConfig.email}</span>
              </div>
            </div>
          </div>

          {/* Global Offices */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-base mb-5 text-brand-teal">
              Global Presence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {globalOffices.map((office) => (
                <div
                  key={office.country}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={14} className="text-brand-teal" />
                    <span className="font-semibold text-sm text-white">
                      {office.country}
                    </span>
                    <span className="text-[10px] text-brand-teal/60 uppercase tracking-wider">
                      {office.type}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {office.address}
                  </p>
                  {office.tel && (
                    <p className="text-white/40 text-xs mt-1">{office.tel}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-base mb-4 text-brand-teal">
              Stay Connected
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Get the latest on product innovations, industry insights, and
              sustainability updates.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-teal transition-colors"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-1 top-1 bottom-1 w-10 bg-brand-teal rounded-full flex items-center justify-center text-white hover:bg-brand-teal-dark transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.name} Industries Pte Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

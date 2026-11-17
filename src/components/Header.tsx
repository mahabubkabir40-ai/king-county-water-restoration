"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Menu, Phone, ShieldCheck, X } from "lucide-react";
import {
  LOCATIONS,
  SERVICES,
  SITE_CONFIG,
  isLocationPageLive,
} from "@/lib/site-config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const liveLocations = LOCATIONS.filter((l) => isLocationPageLive(l.slug));
  const liveByCorridor = Array.from(
    new Set(liveLocations.map((l) => l.corridor))
  ).map((corridor) => ({
    corridor,
    items: liveLocations.filter((l) => l.corridor === corridor),
  }));

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Disclosure & Availability Utility Bar */}
      <div className="bg-navy-950 text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{SITE_CONFIG.disclosureBadge}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              Free 24/7 referral connecting callers with independent local contractors
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/images/logo.svg"
                alt="King County Water Restoration logo"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0 shadow-sm"
              />
              <div className="leading-tight whitespace-nowrap">
                <div className="font-bold text-navy-900 text-sm sm:text-lg tracking-tight">
                  King County
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-sky-700 tracking-wide uppercase">
                  Water Restoration
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
              <Link href="/" className="hover:text-navy-900 transition-colors">
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 hover:text-navy-900 py-2 transition-colors"
                >
                  Water Services
                  <ChevronDown className="w-4 h-4 text-slate-500 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full pt-2 w-80">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2">
                    {SERVICES.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="block rounded-lg px-3.5 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-navy-900">
                            {svc.shortTitle}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                            {svc.urgencyTag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-1">
                          {svc.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Areas Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 hover:text-navy-900 py-2 transition-colors"
                >
                  Service Areas
                  <ChevronDown className="w-4 h-4 text-slate-500 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full pt-2 w-80">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 space-y-3 max-h-[75vh] overflow-y-auto">
                    {liveByCorridor.map((group) => (
                      <div key={group.corridor}>
                        <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-sky-600" />
                          <span>{group.corridor}</span>
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {group.items.map((loc) => (
                            <Link
                              key={loc.slug}
                              href={`/locations/${loc.slug}`}
                              className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-navy-900 hover:bg-slate-50 transition-colors"
                            >
                              <span>{loc.displayName}</span>
                              <span className="text-[11px] text-slate-500 font-mono">
                                {loc.zips[0]}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-slate-100 pt-2">
                      <Link
                        href="/#areas-served"
                        className="block rounded-lg px-2.5 py-2 text-xs font-bold text-sky-700 hover:bg-sky-50 transition-colors"
                      >
                        View All King County Areas &amp; ZIP Checker &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/insurance-claims"
                className="hover:text-navy-900 transition-colors"
              >
                Insurance Guide
              </Link>
              <Link href="/about" className="hover:text-navy-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-navy-900 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Primary Click-to-Call CTA + Mobile Menu Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base whitespace-nowrap shadow-md shadow-emergency-600/20 transition-all active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 animate-pulse" />
                <span className="sm:hidden">Call 24/7</span>
                <span className="hidden sm:inline">
                  Call 24/7: {SITE_CONFIG.phoneDisplay}
                </span>
              </a>

              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 shrink-0"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-7.5rem)] overflow-y-auto pb-24">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2 text-sm font-semibold text-slate-800">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Home
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  <span>Water Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-sky-200 ml-3">
                    {SERVICES.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                      >
                        {svc.shortTitle}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setAreasOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  <span>Service Areas</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      areasOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {areasOpen && (
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-sky-200 ml-3">
                    {liveLocations.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50"
                      >
                        {loc.displayName}
                      </Link>
                    ))}
                    <Link
                      href="/#areas-served"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 rounded-lg text-sky-700 font-semibold hover:bg-sky-50"
                    >
                      All King County Areas &rarr;
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/insurance-claims"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Insurance Guide
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Contact &amp; ZIP Checker
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

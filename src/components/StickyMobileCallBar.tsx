import React from "react";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export function StickyMobileCallBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-navy-950/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5 shadow-2xl">
      <a
        href={SITE_CONFIG.phoneHref}
        className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-emergency-600 hover:bg-emergency-700 active:scale-[0.99] text-white font-bold py-3 px-4 text-sm sm:text-base whitespace-nowrap shadow-lg shadow-emergency-600/30"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <Phone className="w-4 h-4 shrink-0" />
        <span>24/7 Help: {SITE_CONFIG.phoneDisplay}</span>
      </a>
    </div>
  );
}

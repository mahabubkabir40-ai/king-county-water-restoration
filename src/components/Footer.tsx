import React from "react";
import Link from "next/link";
import { Droplets, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  LOCATIONS,
  SERVICES,
  SITE_CONFIG,
  isLocationPageLive,
} from "@/lib/site-config";

const CORRIDORS: Array<{
  name: string;
  items: typeof LOCATIONS;
}> = [
  {
    name: "Snoqualmie Valley & Foothills",
    items: LOCATIONS.filter((l) => l.corridor === "Snoqualmie Valley & Foothills"),
  },
  {
    name: "Southeast King County",
    items: LOCATIONS.filter((l) => l.corridor === "Southeast King County"),
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Brand & Call */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white text-base">
                  King County Water Restoration
                </div>
                <div className="text-xs text-sky-400">
                  24/7 Water &amp; Flood Referral Line
                </div>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              {SITE_CONFIG.disclosureShort}
            </p>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-4 py-2.5 text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call 24/7: {SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>

          {/* Column 2: Water Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Water Services
            </h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {svc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources & Trust */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Homeowner Guides
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  King County Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance-claims"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Insurance Claims Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  About Our Referral Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  24/7 Contact &amp; ZIP Checker
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Verify any contractor&apos;s registration via the Washington State
                Dept. of Labor &amp; Industries (L&amp;I).
              </span>
            </div>
          </div>

          {/* Column 4: King County Corridors */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400" />
              King County Suburbs
            </h3>
            <div className="space-y-3 text-xs">
              {CORRIDORS.map((corridor) => (
                <div key={corridor.name}>
                  <div className="font-semibold text-slate-200 mb-1">
                    {corridor.name}
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-slate-400">
                    {corridor.items.map((loc, idx) => (
                      <React.Fragment key={loc.slug}>
                        {isLocationPageLive(loc.slug) ? (
                          <Link
                            href={`/locations/${loc.slug}`}
                            className="hover:text-white underline decoration-slate-700 underline-offset-2"
                          >
                            {loc.cityName}
                          </Link>
                        ) : (
                          <Link
                            href="/contact#zip-checker"
                            className="hover:text-slate-200 transition-colors"
                            title={`Check ZIPs (${loc.zips.join(", ")})`}
                          >
                            {loc.cityName}
                          </Link>
                        )}
                        {idx < corridor.items.length - 1 && <span>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Legal & Referral Disclosure */}
        <div className="pt-6 text-xs text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-300">Referral Disclosure:</strong>{" "}
            King County Water Restoration ({SITE_CONFIG.hostname}) is a free
            24/7 telephone referral service that connects homeowners with
            independent third-party water damage restoration contractors serving
            King County, WA. We do not perform restoration work, provide
            licensed contracting, or act as an insurance company or public
            adjuster. Participating contractors are independent businesses;
            always verify contractor licensing/registration, insurance, and
            written work authorizations directly before authorizing work.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-slate-500">
            <span>
              &copy; {new Date().getFullYear()} King County Water Restoration.
              Serving King County Suburbs &amp; Foothills, WA.
            </span>
            <span>24/7 Line: {SITE_CONFIG.phoneDisplay}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone, Search, AlertCircle, ArrowRight } from "lucide-react";
import {
  KING_COUNTY_ZIPS,
  SITE_CONFIG,
  isLocationPageLive,
} from "@/lib/site-config";

interface ZipCoverageCheckerProps {
  variant?: "dark" | "light";
  id?: string;
}

export function ZipCoverageChecker({
  variant = "dark",
  id = "zip-checker",
}: ZipCoverageCheckerProps) {
  const [inputZip, setInputZip] = useState("");
  const [checkedZip, setCheckedZip] = useState<string | null>(null);

  const cleanZip = inputZip.replace(/\D/g, "").slice(0, 5);
  const activeEntry =
    checkedZip && checkedZip.length === 5 ? KING_COUNTY_ZIPS[checkedZip] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanZip.length === 5) {
      setCheckedZip(cleanZip);
    }
  };

  const isDark = variant === "dark";

  return (
    <div
      id={id}
      className={
        isDark
          ? "rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur"
          : "rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-lg"
      }
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
        <MapPin className={`w-4 h-4 ${isDark ? "text-sky-400" : "text-sky-600"}`} />
        <span className={isDark ? "text-sky-300" : "text-sky-700"}>
          King County ZIP Coverage Checker
        </span>
      </div>

      <h3
        className={`text-lg sm:text-xl font-bold mb-1.5 ${
          isDark ? "text-white" : "text-navy-900"
        }`}
      >
        Check If Your Neighborhood Is Covered
      </h3>
      <p
        className={`text-sm mb-4 ${
          isDark ? "text-slate-300" : "text-slate-600"
        }`}
      >
        Enter your 5-digit King County ZIP code to confirm 24/7 referral coverage.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={inputZip}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 5);
              setInputZip(val);
              if (val.length === 5) {
                setCheckedZip(val);
              } else if (checkedZip) {
                setCheckedZip(null);
              }
            }}
            placeholder="Enter 5-digit ZIP (e.g. 98019)"
            aria-label="King County 5-digit ZIP code"
            className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all ${
              isDark
                ? "bg-slate-800 text-white placeholder:text-slate-400 border border-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                : "bg-slate-50 text-navy-900 placeholder:text-slate-400 border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-600/15"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={cleanZip.length !== 5}
          className="rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 text-sm transition-colors shrink-0"
        >
          Check ZIP
        </button>
      </form>

      {/* Coverage Result */}
      {checkedZip && checkedZip.length === 5 && (
        <div className="mt-4">
          {activeEntry ? (
            <div className="rounded-xl bg-emerald-950/80 border border-emerald-500/40 p-4 text-left">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-emerald-100 text-sm sm:text-base">
                    ZIP {checkedZip} ({activeEntry.city}, WA) is covered 24/7
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
                    {activeEntry.corridor} service area. Call now to connect with an
                    independent local water damage restoration company serving{" "}
                    {activeEntry.city}. Arrival timing is confirmed directly on the
                    call.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={SITE_CONFIG.phoneHref}
                      className="inline-flex items-center gap-2 rounded-lg bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-4 py-2.5 text-sm shadow-md transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call 24/7: {SITE_CONFIG.phoneDisplay}
                    </a>
                    {activeEntry.locationSlug &&
                      isLocationPageLive(activeEntry.locationSlug) && (
                        <Link
                          href={`/locations/${activeEntry.locationSlug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-200 hover:text-white underline underline-offset-4"
                        >
                          {activeEntry.city} details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-amber-950/70 border border-amber-500/40 p-4 text-left">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-100 text-sm">
                    {checkedZip.startsWith("98")
                      ? `ZIP ${checkedZip} is outside our primary King County suburban list`
                      : `ZIP ${checkedZip} is outside Washington (King County uses 980xx–982xx)`}
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 mt-1">
                    If your property is in or near King County, WA, you can still call{" "}
                    <a
                      href={SITE_CONFIG.phoneHref}
                      className="font-bold underline text-white"
                    >
                      {SITE_CONFIG.phoneDisplay}
                    </a>{" "}
                    24/7 to check whether an independent local crew serves your
                    address.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

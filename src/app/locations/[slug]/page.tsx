import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDownRight, MapPin, Phone } from "lucide-react";
import { PageContentRenderer } from "@/components/PageContentRenderer";
import { getPageByFileName } from "@/lib/content";
import { LOCATIONS, SITE_CONFIG } from "@/lib/site-config";

export const dynamicParams = false;

const QUICK_JUMP_SERVICES = [
  { id: "water-extraction", label: "Emergency Water Extraction" },
  { id: "crawlspace-flood", label: "Crawl Space & Basement Floods" },
  { id: "burst-pipe", label: "Burst & Frozen Pipe Cleanup" },
  { id: "sewage-backup", label: "Sewage & Septic Backup Cleanup" },
  { id: "structural-drying", label: "Structural Drying" },
  { id: "moisture-mold", label: "Moisture Inspection & Mold Prevention" },
];

function getLiveLocations() {
  return LOCATIONS.filter((l) => l.wave <= SITE_CONFIG.LIVE_LOCATION_WAVE);
}

export function generateStaticParams() {
  return getLiveLocations().map((loc) => ({
    slug: loc.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const location = getLiveLocations().find((l) => l.slug === params.slug);
  if (!location) {
    return {};
  }
  const page = getPageByFileName(location.fileName);
  const url = `${SITE_CONFIG.domain}/locations/${location.slug}`;

  return {
    title: page.frontmatter.title,
    description: page.frontmatter.meta,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.frontmatter.title,
      description: page.frontmatter.meta,
      url,
    },
  };
}

export default function LocationPage({
  params,
}: {
  params: { slug: string };
}) {
  const location = getLiveLocations().find((l) => l.slug === params.slug);
  if (!location) {
    notFound();
  }

  const page = getPageByFileName(location.fileName);

  const heroAside = (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl space-y-5">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">
          <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{location.corridor}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Covered ZIP Codes in {location.cityName}
        </h2>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {location.zips.map((zip) => (
            <span
              key={zip}
              className="inline-flex items-center rounded-lg bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 text-xs font-bold text-emerald-200 font-mono"
            >
              WA {zip}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Jump to Local Services
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
          {QUICK_JUMP_SERVICES.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center justify-between rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 px-3 py-2 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              <span>{item.label}</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <a
        href={SITE_CONFIG.phoneHref}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-3.5 px-5 text-base shadow-lg shadow-emergency-600/25 transition-colors"
      >
        <Phone className="w-4 h-4 shrink-0" />
        <span>Call 24/7: {SITE_CONFIG.phoneDisplay}</span>
      </a>
    </div>
  );

  return (
    <PageContentRenderer
      page={page}
      eyebrow={`Serving ZIP ${location.zips.join(", ")} • ${location.corridor}`}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: location.displayName, href: `/locations/${location.slug}` },
      ]}
      schemaType="Service"
      areaServedName={location.displayName}
      postalCodes={location.zips}
      heroAside={heroAside}
    />
  );
}

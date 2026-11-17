import type { Metadata } from "next";
import { CheckCircle2, Clock, Droplets, ShieldCheck } from "lucide-react";
import { PageContentRenderer } from "@/components/PageContentRenderer";
import { ZipCoverageChecker } from "@/components/ZipCoverageChecker";
import { getPageByFileName } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/site-config";

const page = getPageByFileName("P01-home.md");

export const metadata: Metadata = {
  title: page.frontmatter.title,
  description: page.frontmatter.meta,
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  openGraph: {
    title: page.frontmatter.title,
    description: page.frontmatter.meta,
    url: SITE_CONFIG.domain,
  },
};

export default function HomePage() {
  return (
    <PageContentRenderer
      page={page}
      eyebrow="24/7 King County Water Referral • (425) 675-3040"
      breadcrumbs={[{ name: "Home", href: "/" }]}
      schemaType="WebSite"
      heroAside={<ZipCoverageChecker variant="dark" id="zip-checker" />}
      afterIntroSlot={
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold text-navy-900">
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3">
                <Clock className="w-5 h-5 text-emergency-600 shrink-0" />
                <span>24/7 Live Phone Connection</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3">
                <Droplets className="w-5 h-5 text-sky-600 shrink-0" />
                <span>100% Water &amp; Moisture Focused</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>60+ King County ZIPs Covered</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3">
                <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0" />
                <span>Free Referral • Zero Obligation</span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

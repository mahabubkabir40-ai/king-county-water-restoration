import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { ContentBlock, PageSection, ParsedPage } from "@/lib/content";
import {
  PAGE_IMAGES,
  type PageImageItem,
  SERVICES,
  SITE_CONFIG,
  isLocationPageLive,
} from "@/lib/site-config";
import { stripMarkdownSyntax } from "@/lib/content";

function resolveHref(href: string): { resolved: string; isExternal: boolean } {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return { resolved: href, isExternal: true };
  }
  if (href.startsWith("/locations/")) {
    const slug = href.replace("/locations/", "").split("#")[0].replace(/\/$/, "");
    if (!isLocationPageLive(slug)) {
      return { resolved: "/contact#zip-checker", isExternal: false };
    }
  }
  return { resolved: href, isExternal: false };
}

export function renderInlineMarkdown(
  text: string,
  darkSurface = false
): React.ReactNode[] {
  const tokenRegex =
    /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\(425\)\s*675-3040)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, rawHref] = linkMatch;
        const { resolved, isExternal } = resolveHref(rawHref);
        const linkClass = darkSurface
          ? "font-semibold text-sky-300 hover:text-white underline underline-offset-4"
          : "font-semibold text-sky-700 hover:text-emergency-600 underline decoration-sky-300 underline-offset-4";

        if (isExternal) {
          parts.push(
            <a
              key={keyIdx++}
              href={resolved}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {renderInlineMarkdown(label, darkSurface)}
            </a>
          );
        } else {
          parts.push(
            <Link key={keyIdx++} href={resolved} className={linkClass}>
              {renderInlineMarkdown(label, darkSurface)}
            </Link>
          );
        }
      } else {
        parts.push(token);
      }
    } else if (token.startsWith("**")) {
      const inner = token.slice(2, -2);
      if (/^\(425\)\s*675-3040$/.test(inner.trim())) {
        parts.push(
          <a
            key={keyIdx++}
            href={SITE_CONFIG.phoneHref}
            className={
              darkSurface
                ? "font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4"
                : "font-bold text-emergency-600 hover:text-emergency-700 underline underline-offset-4"
            }
          >
            {inner}
          </a>
        );
      } else {
        parts.push(
          <strong
            key={keyIdx++}
            className={
              darkSurface ? "font-bold text-white" : "font-semibold text-navy-900"
            }
          >
            {renderInlineMarkdown(inner, darkSurface)}
          </strong>
        );
      }
    } else if (token.startsWith("*")) {
      parts.push(
        <em key={keyIdx++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={keyIdx++}
          className={
            darkSurface
              ? "px-1.5 py-0.5 rounded bg-slate-800 text-sky-200 text-[0.9em] font-mono"
              : "px-1.5 py-0.5 rounded bg-slate-100 text-navy-900 text-[0.9em] font-mono border border-slate-200"
          }
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(
        <a
          key={keyIdx++}
          href={SITE_CONFIG.phoneHref}
          className={
            darkSurface
              ? "font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4"
              : "font-bold text-emergency-600 hover:text-emergency-700 underline underline-offset-4"
          }
        >
          {token}
        </a>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderBlock(block: ContentBlock, index: number, dark = false) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className={
            dark
              ? "text-slate-200 text-base sm:text-lg leading-relaxed"
              : "text-slate-700 text-base leading-relaxed"
          }
        >
          {renderInlineMarkdown(block.text, dark)}
        </p>
      );

    case "blockquote":
      return (
        <div
          key={index}
          className={
            dark
              ? "rounded-xl bg-slate-800/80 border border-sky-400/30 border-l-4 border-l-sky-400 p-4 text-sm text-slate-200 flex items-start gap-3"
              : "rounded-xl bg-sky-50 border border-sky-200 border-l-4 border-l-sky-600 p-4 text-sm text-slate-700 flex items-start gap-3"
          }
        >
          <ShieldCheck
            className={`w-5 h-5 shrink-0 mt-0.5 ${
              dark ? "text-sky-400" : "text-sky-600"
            }`}
          />
          <div>{renderInlineMarkdown(block.text, dark)}</div>
        </div>
      );

    case "ul":
      return (
        <ul key={index} className="space-y-3">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={index} className="space-y-3">
          {block.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4 text-slate-700 leading-relaxed"
            >
              <span className="w-7 h-7 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="flex-1">{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );

    case "subheading":
      return (
        <h3
          key={index}
          id={block.id}
          className="text-lg font-bold text-navy-900 pt-2"
        >
          {block.text}
        </h3>
      );
  }
}

interface SubGroup {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

function splitSectionSubGroups(blocks: ContentBlock[]): {
  leadBlocks: ContentBlock[];
  subGroups: SubGroup[];
} {
  const leadBlocks: ContentBlock[] = [];
  const subGroups: SubGroup[] = [];
  let current: SubGroup | null = null;

  for (const b of blocks) {
    if (b.type === "subheading") {
      if (current) subGroups.push(current);
      current = { id: b.id, title: b.text, blocks: [] };
    } else if (current) {
      current.blocks.push(b);
    } else {
      leadBlocks.push(b);
    }
  }
  if (current) subGroups.push(current);

  return { leadBlocks, subGroups };
}

function renderSection(section: PageSection) {
  if (section.kind === "tip") {
    return (
      <section
        key={section.id}
        id={section.id}
        className="rounded-2xl bg-amber-50 border border-amber-200 p-6 sm:p-7 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
            {section.title}
          </h2>
        </div>
        <div className="space-y-4">
          {section.blocks.map((b, i) => renderBlock(b, i))}
        </div>
      </section>
    );
  }

  if (section.kind === "faq") {
    return (
      <section
        key={section.id}
        id={section.id}
        className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-6 h-6 text-sky-600 shrink-0" />
          <h2 className="text-2xl font-bold text-navy-900">{section.title}</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {section.faqs.map((faq, idx) => (
            <div key={idx} className="py-4 first:pt-1 last:pb-1 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-navy-900">
                {faq.question}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {renderInlineMarkdown(faq.answer)}
              </p>
            </div>
          ))}
        </div>
        {section.footerNote && (
          <div className="pt-4 border-t border-slate-200 text-sm text-slate-600">
            {renderInlineMarkdown(section.footerNote)}
          </div>
        )}
      </section>
    );
  }

  const { leadBlocks, subGroups } = splitSectionSubGroups(section.blocks);

  return (
    <section
      key={section.id}
      id={section.id}
      className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
    >
      <h2 className="text-2xl font-bold text-navy-900 tracking-tight">
        {section.title}
      </h2>

      {leadBlocks.length > 0 && (
        <div className="space-y-4">
          {leadBlocks.map((b, i) => renderBlock(b, i))}
        </div>
      )}

      {subGroups.length > 0 && (
        <div
          className={`grid gap-4 ${
            subGroups.length >= 4 ? "sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {subGroups.map((sg) => (
            <div
              key={sg.id}
              id={sg.id}
              className="rounded-xl bg-slate-50 border border-slate-200/90 p-5 space-y-2.5 hover:border-sky-300 transition-colors"
            >
              <h3 className="text-lg font-bold text-navy-900">{sg.title}</h3>
              <div className="space-y-3 text-sm sm:text-base">
                {sg.blocks.map((b, i) => renderBlock(b, i))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageContentRendererProps {
  page: ParsedPage;
  eyebrow: string;
  breadcrumbs: BreadcrumbItem[];
  schemaType: "WebSite" | "Service" | "WebPage" | "AboutPage" | "ContactPage";
  areaServedName?: string;
  postalCodes?: string[];
  heroAside?: React.ReactNode;
  afterIntroSlot?: React.ReactNode;
}

function renderImageFigure(img: PageImageItem, key: string) {
  return (
    <figure
      key={key}
      className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
    >
      <img
        src={img.src}
        alt={img.alt}
        width={1200}
        height={675}
        loading="lazy"
        decoding="async"
        className="w-full h-56 sm:h-72 object-cover"
      />
      <figcaption className="px-5 py-3.5 text-sm text-slate-600 bg-slate-50 border-t border-slate-200/80 leading-relaxed">
        {img.caption}
      </figcaption>
    </figure>
  );
}

export function PageContentRenderer({
  page,
  eyebrow,
  breadcrumbs,
  schemaType,
  areaServedName,
  postalCodes,
  heroAside,
  afterIntroSlot,
}: PageContentRendererProps) {
  const pageUrl = `${SITE_CONFIG.domain}${
    page.frontmatter.slug === "/" ? "" : page.frontmatter.slug
  }`;

  const jsonLdGraph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((bc, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: bc.name,
        item: `${SITE_CONFIG.domain}${bc.href === "/" ? "" : bc.href}`,
      })),
    },
  ];

  if (schemaType === "WebSite") {
    jsonLdGraph.push(
      {
        "@type": "WebSite",
        name: SITE_CONFIG.brandName,
        url: SITE_CONFIG.domain,
      },
      {
        "@type": "Organization",
        name: SITE_CONFIG.brandName,
        url: SITE_CONFIG.domain,
        logo: `${SITE_CONFIG.domain}/images/logo.png`,
        telephone: SITE_CONFIG.phoneE164,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "King County, WA",
        },
        description: SITE_CONFIG.disclosureShort,
      }
    );
  } else if (schemaType === "Service") {
    const areaServedObj: Record<string, unknown> = areaServedName
      ? {
          "@type": "City",
          name: areaServedName,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "King County, WA",
          },
          ...(postalCodes && postalCodes.length > 0
            ? { postalCode: postalCodes }
            : {}),
        }
      : {
          "@type": "AdministrativeArea",
          name: "King County, WA",
        };

    jsonLdGraph.push({
      "@type": "Service",
      name: page.frontmatter.h1,
      description: page.frontmatter.meta,
      url: pageUrl,
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.brandName,
        telephone: SITE_CONFIG.phoneE164,
        url: SITE_CONFIG.domain,
      },
      areaServed: areaServedObj,
    });
  } else {
    jsonLdGraph.push({
      "@type": schemaType,
      name: page.frontmatter.h1,
      description: page.frontmatter.meta,
      url: pageUrl,
    });
  }

  if (page.allFaqs.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      mainEntity: page.allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: stripMarkdownSyntax(faq.answer),
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Panic-Zone Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-14">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 mb-4 sm:mb-5"
            >
              {breadcrumbs.map((bc, idx) => (
                <React.Fragment key={bc.href}>
                  {idx < breadcrumbs.length - 1 ? (
                    <Link
                      href={bc.href}
                      className="hover:text-white transition-colors"
                    >
                      {bc.name}
                    </Link>
                  ) : (
                    <span className="text-sky-300 font-medium">{bc.name}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 border border-sky-400/30 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-sky-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{eyebrow}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                {page.frontmatter.h1}
              </h1>

              <div className="space-y-3 sm:space-y-4">
                {page.introBlocks.map((b, i) => renderBlock(b, i, true))}
              </div>

              {/* Primary Hero CTAs */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-5 sm:px-6 py-3.5 sm:py-4 text-base sm:text-lg whitespace-nowrap shadow-xl shadow-emergency-600/25 transition-all active:scale-[0.99]"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>Call 24/7: {SITE_CONFIG.phoneDisplay}</span>
                </a>
                <Link
                  href="/insurance-claims"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-600 text-slate-100 font-semibold px-5 py-3.5 sm:py-4 text-sm sm:text-base transition-colors"
                >
                  <span>Insurance Claims Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Right Column */}
            <div className="lg:col-span-5">
              {heroAside ?? (
                <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>24/7 King County Referral Line</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {SITE_CONFIG.phoneDisplay}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Speak with an independent local water damage restoration company
                    serving your King County neighborhood—day or night, weekends and
                    holidays.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200 pt-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Free referral — zero obligation to hire</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Water extraction, crawl spaces, pipes &amp; sewage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>All 60+ suburban King County ZIP codes</span>
                    </li>
                  </ul>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-3.5 px-5 text-base transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Tap to Call Now</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {afterIntroSlot}

      {/* Main Content + Sticky Emergency Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Column */}
          <main className="lg:col-span-8 space-y-8">
            {(() => {
              const pageImages = PAGE_IMAGES[page.frontmatter.page_id] ?? [];
              const imageSlots =
                page.sections.length >= 5
                  ? [0, 2, 4]
                  : page.sections.length >= 3
                  ? [0, 1, 2]
                  : page.sections.length === 2
                  ? [0, 1]
                  : [0];
              return page.sections.map((section, idx) => {
                const slotIdx = imageSlots.indexOf(idx);
                const matchedImage =
                  slotIdx !== -1 ? pageImages[slotIdx] : undefined;
                return (
                  <React.Fragment key={section.id}>
                    {renderSection(section)}
                    {matchedImage &&
                      renderImageFigure(matchedImage, `${section.id}-img`)}
                  </React.Fragment>
                );
              });
            })()}
          </main>

          {/* Right Sticky Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Call Box */}
            <div className="rounded-2xl bg-navy-900 text-white p-6 shadow-lg border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open 24/7
                </span>
                <span className="text-xs text-slate-400">King County, WA</span>
              </div>
              <h2 className="text-xl font-bold leading-snug">
                Need Local Water Damage Help Now?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Call our free 24/7 referral line to reach an independent local
                restoration company serving your ZIP code.
              </p>
              <a
                href={SITE_CONFIG.phoneHref}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-3.5 px-4 text-base shadow-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {SITE_CONFIG.disclosureShort}
              </p>
            </div>

            {/* Quick Jump */}
            {page.sections.length > 0 && (
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  On This Page
                </h3>
                <ul className="space-y-2 text-sm">
                  {page.sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="flex items-start gap-2 text-slate-700 hover:text-sky-700 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{sec.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Services Nav */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Water Mitigation Services
              </h3>
              <ul className="space-y-2 text-sm">
                {SERVICES.map((svc) => {
                  const isCurrent =
                    page.frontmatter.slug === `/services/${svc.slug}`;
                  return (
                    <li key={svc.slug}>
                      <Link
                        href={`/services/${svc.slug}`}
                        className={`block rounded-lg px-3 py-2 transition-colors ${
                          isCurrent
                            ? "bg-sky-50 text-sky-800 font-semibold border border-sky-200"
                            : "text-slate-700 hover:bg-slate-50 hover:text-navy-900"
                        }`}
                      >
                        {svc.shortTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

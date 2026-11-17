import type { Metadata } from "next";
import { PageContentRenderer } from "@/components/PageContentRenderer";
import { getPageByFileName } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/site-config";

const page = getPageByFileName("P29-about.md");
const url = `${SITE_CONFIG.domain}/about`;

export const metadata: Metadata = {
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

export default function AboutPage() {
  return (
    <PageContentRenderer
      page={page}
      eyebrow="About Our 24/7 Referral Service"
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
      ]}
      schemaType="AboutPage"
    />
  );
}

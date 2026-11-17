import type { Metadata } from "next";
import { PageContentRenderer } from "@/components/PageContentRenderer";
import { getPageByFileName } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/site-config";

const page = getPageByFileName("P28-insurance-claims.md");
const url = `${SITE_CONFIG.domain}/insurance-claims`;

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

export default function InsuranceClaimsPage() {
  return (
    <PageContentRenderer
      page={page}
      eyebrow="Washington Homeowner Claims Guide"
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Insurance Claims", href: "/insurance-claims" },
      ]}
      schemaType="WebPage"
    />
  );
}

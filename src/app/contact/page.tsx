import type { Metadata } from "next";
import { PageContentRenderer } from "@/components/PageContentRenderer";
import { ZipCoverageChecker } from "@/components/ZipCoverageChecker";
import { getPageByFileName } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/site-config";

const page = getPageByFileName("P30-contact.md");
const url = `${SITE_CONFIG.domain}/contact`;

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

export default function ContactPage() {
  return (
    <PageContentRenderer
      page={page}
      eyebrow="24/7 King County Referral Line • (425) 675-3040"
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" },
      ]}
      schemaType="ContactPage"
      heroAside={<ZipCoverageChecker variant="dark" id="zip-checker" />}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContentRenderer } from "@/components/PageContentRenderer";
import { getPageByFileName } from "@/lib/content";
import { SERVICES, SITE_CONFIG } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((svc) => ({
    slug: svc.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    return {};
  }
  const page = getPageByFileName(service.fileName);
  const url = `${SITE_CONFIG.domain}/services/${service.slug}`;

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

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  const page = getPageByFileName(service.fileName);

  return (
    <PageContentRenderer
      page={page}
      eyebrow={`Water Mitigation Service • ${service.urgencyTag}`}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: service.shortTitle, href: `/services/${service.slug}` },
      ]}
      schemaType="Service"
    />
  );
}

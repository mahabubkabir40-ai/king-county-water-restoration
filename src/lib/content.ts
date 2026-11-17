import fs from "fs";
import path from "path";

export interface PageFrontmatter {
  page_id: string;
  slug: string;
  title: string;
  meta: string;
  h1: string;
  primary_keyword: string;
  cta: string;
}

export interface ListItem {
  text: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "subheading"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageSection {
  id: string;
  title: string;
  kind: "standard" | "tip" | "faq" | "areas" | "steps";
  blocks: ContentBlock[];
  faqs: FaqItem[];
  footerNote?: string;
}

export interface ParsedPage {
  frontmatter: PageFrontmatter;
  introBlocks: ContentBlock[];
  sections: PageSection[];
  allFaqs: FaqItem[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\{#[^}]+\}/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseHeadingWithAnchor(rawText: string): { title: string; id: string } {
  const anchorMatch = rawText.match(/\{#([a-zA-Z0-9_-]+)\}\s*$/);
  if (anchorMatch) {
    const title = rawText.replace(/\{#[a-zA-Z0-9_-]+\}\s*$/, "").trim();
    return { title, id: anchorMatch[1] };
  }
  const title = rawText.trim();
  return { title, id: slugifyHeading(title) };
}

function parseBlocks(lines: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const { title, id } = parseHeadingWithAnchor(line.slice(4));
      blocks.push({ type: "subheading", id, text: title });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("### ") &&
      !lines[i].trim().startsWith("## ") &&
      !lines[i].trim().startsWith("> ") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

function parseFaqSection(lines: string[]): {
  faqs: FaqItem[];
  footerNote?: string;
} {
  const blocks = parseBlocks(lines);
  const faqs: FaqItem[] = [];
  let footerNote: string | undefined;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "paragraph") {
      if (
        b.text.startsWith("**Related:**") ||
        b.text.startsWith("**Nearby:**")
      ) {
        footerNote = b.text;
        continue;
      }
      const qMatch = b.text.match(/^\*\*(.+?\?)\*\*\s*(.*)$/);
      if (qMatch) {
        const question = qMatch[1].trim();
        let answer = qMatch[2].trim();
        if (!answer && i + 1 < blocks.length && blocks[i + 1].type === "paragraph") {
          const nextPara = blocks[i + 1] as { type: "paragraph"; text: string };
          if (
            !nextPara.text.startsWith("**Related:**") &&
            !nextPara.text.startsWith("**Nearby:**")
          ) {
            answer = nextPara.text;
            i++;
          }
        }
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  return { faqs, footerNote };
}

function classifySectionKind(title: string, blocks: ContentBlock[]): PageSection["kind"] {
  const lower = title.toLowerCase();
  if (lower.includes("frequently asked questions")) return "faq";
  if (lower.includes("tip:")) return "tip";
  if (lower.startsWith("areas served")) return "areas";
  if (blocks.some((b) => b.type === "ol")) return "steps";
  return "standard";
}

export function getPageByFileName(fileName: string): ParsedPage {
  const fullPath = path.join(CONTENT_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf-8");

  const fmMatch = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    throw new Error(`Missing YAML frontmatter in ${fileName}`);
  }

  const fmRaw = fmMatch[1];
  const bodyRaw = fmMatch[2].trim();

  const fmObj: Record<string, string> = {};
  for (const line of fmRaw.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^"(.*)"$/, "$1");
      fmObj[key] = val;
    }
  }

  const frontmatter: PageFrontmatter = {
    page_id: fmObj.page_id ?? "",
    slug: fmObj.slug ?? "/",
    title: fmObj.title ?? "",
    meta: fmObj.meta ?? "",
    h1: fmObj.h1 ?? "",
    primary_keyword: fmObj.primary_keyword ?? "",
    cta: fmObj.cta ?? "",
  };

  // Remove the top `# H1` line since hero renders frontmatter.h1
  const bodyLines = bodyRaw.split(/\r?\n/);
  const filteredLines =
    bodyLines[0]?.trim().startsWith("# ") ? bodyLines.slice(1) : bodyLines;

  // Split by `## `
  const introLines: string[] = [];
  const rawSections: { rawTitle: string; lines: string[] }[] = [];
  let currentSection: { rawTitle: string; lines: string[] } | null = null;

  for (const line of filteredLines) {
    if (line.trim().startsWith("## ")) {
      if (currentSection) {
        rawSections.push(currentSection);
      }
      currentSection = {
        rawTitle: line.trim().slice(3).trim(),
        lines: [],
      };
    } else if (currentSection) {
      currentSection.lines.push(line);
    } else {
      introLines.push(line);
    }
  }
  if (currentSection) {
    rawSections.push(currentSection);
  }

  const introBlocks = parseBlocks(introLines);
  const sections: PageSection[] = [];
  const allFaqs: FaqItem[] = [];

  for (const sec of rawSections) {
    const { title, id } = parseHeadingWithAnchor(sec.rawTitle);
    const blocks = parseBlocks(sec.lines);
    const kind = classifySectionKind(title, blocks);

    if (kind === "faq") {
      const { faqs, footerNote } = parseFaqSection(sec.lines);
      allFaqs.push(...faqs);
      sections.push({
        id,
        title,
        kind,
        blocks,
        faqs,
        footerNote,
      });
    } else {
      sections.push({
        id,
        title,
        kind,
        blocks,
        faqs: [],
      });
    }
  }

  return {
    frontmatter,
    introBlocks,
    sections,
    allFaqs,
  };
}

export function stripMarkdownSyntax(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

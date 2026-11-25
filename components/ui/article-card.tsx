import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/content/writing";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function ArticleCard({ article, headingLevel = "h3" }: { article: Article; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="reveal group relative rounded border border-border bg-surface p-6 shadow-sm transition-shadow duration-150 hover:shadow-md">
      <p className="font-mono text-[0.8125rem] text-text-muted">
        <time dateTime={article.date}>{fmt(article.date)}</time> · {article.readTime} · {article.platform}
      </p>
      <Heading className="mt-2 text-h3 text-text">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0 after:rounded group-hover:text-primary"
        >
          {article.title}
          <ArrowUpRight aria-hidden className="ml-1 inline h-4 w-4 align-[-2px]" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Heading>
      <p className="mt-2 max-w-prose text-text-muted">{article.excerpt}</p>
    </article>
  );
}

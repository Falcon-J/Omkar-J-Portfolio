import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/content/writing";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/section";
import { ArticleCard } from "@/components/ui/article-card";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles by Omkar Jawalikar on AI, reinforcement learning and software engineering.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Writing" description="Notes on AI, agents and the engineering behind them." />
      <Container className="py-10">
        <div className="grid gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.url} article={a} headingLevel="h2" />
          ))}
        </div>
        <p className="mt-8 text-text-muted">
          More on{" "}
          <a
            href={profile.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
          >
            Medium <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </Container>
    </>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional "see all" link rendered next to the title. */
  more?: { href: string; label: string };
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, description, more, className, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-20 py-12 md:py-16", className)}>
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
            )}
            <h2 id={headingId} className="text-h2 text-text">
              {title}
            </h2>
            {description && <p className="mt-2 max-w-prose text-text-muted">{description}</p>}
          </div>
          {more && (
            <Link
              href={more.href}
              className="group inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              {more.label}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}

/** Page-level header: one h1 per page. */
export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <Container className="pb-4 pt-14 md:pt-20">
      <h1 className="text-h1 text-text">{title}</h1>
      {description && <p className="mt-3 max-w-prose text-lg text-text-muted">{description}</p>}
    </Container>
  );
}

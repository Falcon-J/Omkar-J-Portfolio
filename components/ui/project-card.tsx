import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/projects";
import { TagList } from "./tag";

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        fill
        sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }
  // Generated cover: a terminal-style card, consistent across projects.
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col justify-between bg-primary p-5 text-primary-fg">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary-fg/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-fg/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-fg/30" />
      </div>
      <div>
        <p className="font-mono text-xs opacity-80">~/{project.slug}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{project.title}</p>
        <p className="mt-2 font-mono text-xs opacity-80">{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
    </div>
  );
}

const linkCls =
  "inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline underline-offset-4";

export function ProjectCard({
  project,
  detailed = false,
  headingLevel = "h3",
}: {
  project: Project;
  detailed?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="reveal flex h-full flex-col overflow-hidden rounded border border-border bg-surface shadow-sm transition-shadow duration-150 hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Cover project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <Heading className="text-h3 text-text">{project.title}</Heading>
          <p className="mt-1.5 text-text-muted">{project.summary}</p>
        </div>
        <p className="text-sm font-medium text-text">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent" aria-hidden />
          {project.impact}
        </p>
        {detailed && (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-text-muted marker:text-border">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <TagList items={project.stack} label={`${project.title} tech stack`} />
        <div className="mt-auto flex flex-wrap gap-x-5 pt-1">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
            <Github aria-hidden className="h-4 w-4" /> Code
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <ExternalLink aria-hidden className="h-4 w-4" /> Live demo
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

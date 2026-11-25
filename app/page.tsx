import Image from "next/image";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { work } from "@/content/experience";
import { articles } from "@/content/writing";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { Timeline } from "@/components/ui/timeline-item";
import { SocialLinks } from "@/components/ui/social-links";
import { ArticleCard } from "@/components/ui/article-card";

export default function HomePage() {
  const latest = articles[0];
  return (
    <>
      {/* Hero */}
      <Container className="grid items-center gap-10 pb-10 pt-14 md:grid-cols-[1fr_auto] md:pb-16 md:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            {profile.current.title} at {profile.current.company}
          </p>
          <h1 className="text-display text-text">{profile.name}</h1>
          <p className="mt-3 text-xl font-medium text-primary md:text-2xl">
            {profile.role} · {profile.tagline}
          </p>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-text-muted">{profile.pitch}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              View projects <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
            <SocialLinks className="ml-1" />
          </div>
        </div>
        <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-surface shadow-md sm:h-52 sm:w-52 md:order-none md:h-64 md:w-64">
          <Image
            src={profile.avatar}
            alt={`Illustrated portrait of ${profile.name} with a cat`}
            fill
            priority
            sizes="(min-width: 768px) 256px, (min-width: 640px) 208px, 160px"
            className="object-cover"
          />
        </div>
      </Container>

      <Section
        id="projects"
        eyebrow="Selected work"
        title="Featured projects"
        description="Backend-heavy systems with real load, real failure modes and measurable results."
        more={{ href: "/projects", label: "All projects" }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        eyebrow="Where I've worked"
        title="Experience"
        more={{ href: "/experience", label: "Full experience" }}
      >
        <Timeline roles={work.slice(0, 2)} compact />
      </Section>

      {latest && (
        <Section id="writing" eyebrow="Writing" title="Latest article" more={{ href: "/blog", label: "All writing" }}>
          <ArticleCard article={latest} />
        </Section>
      )}

      <Container className="py-14 md:py-20">
        <div className="reveal rounded border border-border bg-surface p-8 text-center shadow-sm md:p-12">
          <h2 className="text-h2 text-text">Building something with AI or distributed systems?</h2>
          <p className="mx-auto mt-3 max-w-prose text-text-muted">
            I&apos;m always happy to talk about backend architecture, agent orchestration or a role on your team.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail aria-hidden className="h-4 w-4" /> Email me
            </ButtonLink>
            <ButtonLink href={profile.resume} external variant="secondary">
              <FileText aria-hidden className="h-4 w-4" /> Read my résumé
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}

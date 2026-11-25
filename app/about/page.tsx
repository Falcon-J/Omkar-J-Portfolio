import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { certifications, education, interests, principles } from "@/content/about";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { TagList } from "@/components/ui/tag";
import { SkillGroups } from "@/components/ui/skill-group";
import { SocialLinks } from "@/components/ui/social-links";

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills, education, certifications and engineering approach of Omkar Jawalikar.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="grid gap-10 pb-6 pt-14 md:grid-cols-[1fr_280px] md:pt-20">
        <div>
          <h1 className="text-h1 text-text">About me</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-text">{profile.pitch}</p>
          <p className="mt-4 max-w-prose leading-relaxed text-text-muted">{profile.pitchLong}</p>
          <p className="mt-4 max-w-prose leading-relaxed text-text-muted">
            At VIT I spent over two years in the Entrepreneurship Cell, finishing as Director of Operations and leading a
            20-person team through 15+ events. It taught me as much about shipping as any codebase.
          </p>
          <SocialLinks showLabels className="-ml-2.5 mt-6" />
        </div>
        <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded border border-border shadow-sm md:w-full">
          <Image
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 768px) 280px, 224px"
            className="object-cover"
          />
        </div>
      </Container>

      <Section id="skills" eyebrow="Toolbox" title="Tech I use">
        <SkillGroups groups={skillGroups} />
      </Section>

      <Section id="approach" title="How I work">
        <ul className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <Card as="li" key={p.title} className="reveal">
              <h3 className="text-h3 text-text">{p.title}</h3>
              <p className="mt-1.5 text-text-muted">{p.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <Card className="reveal">
          <div className="flex items-start gap-3">
            <GraduationCap aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-h3 text-text">{education.degree}</h3>
                <p className="font-mono text-[0.8125rem] text-text-muted">
                  {education.period} · {education.grade}
                </p>
              </div>
              <p className="mt-1 text-text-muted">{education.school}</p>
              <div className="mt-4">
                <TagList items={education.coursework} label="Relevant coursework" />
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section id="certifications" title="Certifications">
        <ul className="divide-y divide-border rounded border border-border bg-surface">
          {certifications.map((c) => (
            <li key={c.title} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-4">
              <div>
                <p className="font-medium text-text">{c.title}</p>
                <p className="text-sm text-text-muted">
                  {c.issuer}
                  {c.date && <> · {c.date}</>}
                </p>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Verify <ArrowUpRight aria-hidden className="h-4 w-4" />
                  <span className="sr-only"> {c.title} (opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="interests" title="Off the clock">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {interests.map((i) => (
            <li key={i.title} className="rounded border border-border bg-surface px-4 py-3">
              <p className="font-medium text-text">{i.title}</p>
              <p className="text-sm text-text-muted">{i.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Award } from "lucide-react";
import { awards, leadership, work } from "@/content/experience";
import { PageHeader, Section } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline-item";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Experience",
  description: "Software engineering roles, internships, leadership and awards of Omkar Jawalikar.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Experience"
        description="Backend and AI engineering in production, plus the leadership work that taught me how teams ship."
      />
      <Section id="work" title="Work">
        <Timeline roles={work} />
        <div className="mt-10">
          <ButtonLink href={profile.resume} external variant="secondary" size="sm">
            Download full résumé
          </ButtonLink>
        </div>
      </Section>
      <Section id="leadership" title="Leadership">
        <Timeline roles={leadership} />
      </Section>
      <Section id="awards" title="Awards">
        <ul className="grid gap-4 md:grid-cols-2">
          {awards.map((a) => (
            <Card as="li" key={a.title} className="reveal">
              <div className="flex items-start gap-3">
                <Award aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <h3 className="text-h3 text-text">{a.title}</h3>
                  <p className="mt-1 font-mono text-[0.8125rem] text-text-muted">
                    {a.event} · {a.year}
                  </p>
                  <p className="mt-2 text-text-muted">{a.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </ul>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Backend, AI and full-stack projects built by Omkar Jawalikar, with source code and live demos.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Systems I've designed and built end to end: distributed payments, multi-agent orchestration and real-time collaboration."
      />
      <Container className="py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} detailed headingLevel="h2" />
          ))}
        </div>
      </Container>
    </>
  );
}

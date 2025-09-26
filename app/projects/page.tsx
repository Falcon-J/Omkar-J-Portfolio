"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  github: string;
  live: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <div className="relative">
    <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-portfolio-navy rounded-full flex items-center justify-center text-portfolio-cream font-bold z-10">
      <span>0{index + 1}</span>
    </div>
    <div className="pl-16 md:pl-24">
      <Card className="border-portfolio-beige hover:shadow-md transition-all duration-300 bg-portfolio-surface">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-portfolio-almost-black text-2xl">
                {project.title}
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-portfolio-navy text-portfolio-navy"
                  >
                    {tag}
                  </Badge>
                ))}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-portfolio-navy hover:bg-portfolio-beige hover:text-portfolio-navy"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-portfolio-navy hover:bg-portfolio-beige hover:text-portfolio-navy"
                asChild
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-portfolio-almost-black/80 mb-6">
            {project.description}
          </p>
          <ul className="space-y-3">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="flex gap-3 group">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-portfolio-navy flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="text-portfolio-almost-black/80 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: 1,
      title: "DocuMind",
      description:
        "Document intelligence platform combining OCR, semantic search, and summarization to accelerate reporting.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Python", "FastAPI", "Next.js", "LangChain", "OCR"],
      features: [
        "Developed a semantic search system using LangChain & OCR achieving 80%+ query relevance.",
        "Generated cross-document summaries from 50+ documents, speeding up report creation by 60%.",
        "Designed a Next.js dashboard for real-time query, keyword extraction, and results, enabling 30% faster user decisions.",
      ],
      github: "https://github.com/Falcon-J/DocuMind",
      live: "#",
    },
    {
      id: 2,
      title: "Saathi",
      description:
        "A collaborative task manager with real-time synchronization using Redis Streams and Server-Sent Events for low-latency updates.",
      image: "/placeholder.svg?height=200&width=400",
      tags: [
        "Next.js",
        "TypeScript",
        "Upstash Redis",
        "Server-Sent Events",
        "Server Actions",
      ],
      features: [
        "Built a task manager with real-time synchronization using Redis Streams, supporting 200+ users without lag.",
        "Applied Server-Sent Events to reduce update latency by 70%, improving collaboration.",
        "Implemented serverless workflows with Next.js Server Actions, simplifying backend code by 40% and enabling on-demand scaling.",
      ],
      github: "https://github.com/Falcon-J/Saathi",
      live: "#",
    },
    {
      id: 3,
      title: "Platz",
      description:
        "Serverless booking system delivering transaction-safe reservations and real-time availability across events.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Go", "Fiber", "CockroachDB", "React"],
      features: [
        "Optimized booking workflow with transaction-safe reservations and wallet payments, eliminating conflicts.",
        "Orchestrated a CockroachDB cluster, boosting uptime by 40% and fault tolerance under load.",
        "Created a React frontend for real-time conference search and reservations, supporting 200+ concurrent users.",
      ],
      github: "#",
      live: "#",
    },
  ];

  return (
    <PageWrapper backgroundVariant="animated">
      <section className="py-20">
        <div className="container max-w-5xl">
          <FadeIn>
            <h1 className="text-5xl font-bold mb-8 text-center text-portfolio-almost-black">
              Projects
            </h1>
            <p className="text-center text-portfolio-almost-black/80 text-lg mb-16 max-w-2xl mx-auto">
              A showcase of my technical projects and development work across
              various technologies.
            </p>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-navy via-portfolio-beige to-portfolio-navy"></div>
            <div className="space-y-16">
              {projects.map((project, index) => (
                <FadeIn key={project.id} delay={0.2 + index * 0.1}>
                  <ProjectCard project={project} index={index} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

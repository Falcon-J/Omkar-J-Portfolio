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
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
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
  const projects = [
    {
      id: 1,
      title: "MemoJar",
      description:
        "A comprehensive journaling web application that allows users to create, edit, and delete entries in real-time, supporting over 100+ entries per user.",
      image: "/screenshots/Memojar_hero.png",
      tags: [
        "React",
        "JavaScript",
        "Firebase",
        "Tailwind CSS",
        "Framer Motion",
      ],
      features: [
        "Conceptualized and built a journaling web application that allows users to create, edit, and delete entries in real-time, supporting over 100+ entries per user.",
        "Leveraged Firestore for storage, user management, and real-time syncing to ensure sub-100ms update latency across sessions.",
        "Integrated secure user authentication, tag-based memory filtering, dark mode, and mobile-first design.",
      ],
      github: "https://github.com/Falcon-J/MemoJar.git",
      live: "https://memo-jar.vercel.app/",
    },
    {
      id: 2,
      title: "House Price Predictor",
      description:
        "A Flask-based machine learning application using Ridge Regression to predict Bangalore house prices with an R² score of 0.83.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Python", "Flask", "Scikit-Learn", "Pandas", "Render", "MLflow"],
      features: [
        "Developed a Flask-based ML app using Ridge Regression to predict Bangalore house prices with an R² score of 0.83.",
        "Implemented continuous deployment of the Flask API using Render and Gunicorn, supporting real-time ML predictions.",
        "Preprocessed 13,000+ real estate records, engineered features and serialized the model using pandas, scikit-learn, and pickle for real-time predictions.",
      ],
      github: "https://github.com/Falcon-J/bangalore-house-price-predictor",
      live: "#",
    },
    {
      id: 3,
      title: "TravelTrouve",
      description:
        "A full-stack travel photo-sharing platform with secure user authentication, image uploads, and group collaboration features.",
      image: "/placeholder.svg?height=200&width=400",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
        "Framer Motion",
      ],
      features: [
        "Built a full-stack travel photo-sharing platform with secure user authentication and image uploads via Firestore.",
        "Designed a scalable architecture with 15+ modular components, real-time listeners, and protected routes for user roles.",
        "Engineered group collaboration through unique join codes, role-based access, and live photo sharing.",
      ],
      github: "https://github.com/Falcon-J/TravelTrouve",
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

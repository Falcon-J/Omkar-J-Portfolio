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
      title: "PriceSight",
      description:
        "An advanced machine learning application with ensemble regression models trained on 13K+ Bangalore housing records, achieving an R² Score of 0.85.",
      image: "/placeholder.svg?height=200&width=400",
      tags: [
        "Python",
        "Streamlit",
        "Scikit-Learn",
        "MLflow",
        "SHAP",
        "Pandas",
        "Render",
      ],
      features: [
        "Trained ensemble regression models on 13K+ Bangalore housing records, achieving an R² Score of 0.85.",
        "Launched Streamlit app with 3 core tools: EMI calculator, risk score visualizer and SHAP explanations.",
        "Reduced model evaluation latency to 500ms and improved price prediction accuracy by 25% after tuning hyperparameters.",
      ],
      github: "https://github.com/Falcon-J/bangalore-house-price-predictor",
      live: "#",
    },
    {
      id: 2,
      title: "MemoJar",
      description:
        "An encrypted journaling app with Firestore sync and offline-first support, featuring AI-based sentiment analysis and emotional insights.",
      image: "/screenshots/Memojar_hero.png",
      tags: [
        "React.js",
        "JavaScript",
        "Firebase",
        "Tailwind CSS",
        "Framer Motion",
        "Flask",
      ],
      features: [
        "Built an encrypted journaling app with Firestore sync and offline-first support, enabling 100+ entries/user.",
        "Enhanced user experience with 5+ responsive components, tag filters, and dark mode raising session time by 40%.",
        "Integrated an AI-based sentiment analyzer to offer emotional insights and tag suggestions for each journal entry boosting return engagement by 35%.",
      ],
      github: "https://github.com/Falcon-J/MemoJar.git",
      live: "https://memo-jar.vercel.app/",
    },
    {
      id: 3,
      title: "TravelTrouve",
      description:
        "A scalable photo-sharing app supporting 50+ users and 100+ uploads per trip with secure Firebase authentication and real-time synchronization.",
      image: "/placeholder.svg?height=200&width=400",
      tags: [
        "Next.js",
        "TypeScript",
        "Firebase",
        "Tailwind CSS",
        "Framer Motion",
      ],
      features: [
        "Built a scalable photo-sharing app supporting 50+ users, 100+ uploads/trip and secure access via Firebase Auth.",
        "Achieved 100ms sync time across devices using real-time Firestore listeners and optimized subscription logic.",
        "Designed a chronological 'Story View' with smooth transitions, enhancing user recall and boosting engagement by 60%.",
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

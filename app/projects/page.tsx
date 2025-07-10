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
import { useEffect, useRef } from "react";

// Helper function to draw hexagons
const drawHexagon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) => {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const xPoint = x + size * Math.cos(angle);
    const yPoint = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(xPoint, yPoint);
    else ctx.lineTo(xPoint, yPoint);
  }
  ctx.closePath();
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <div className="relative">
    <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10">
      <span>0{index + 1}</span>
    </div>
    <div className="pl-16 md:pl-24">
      <Card className="border-beige hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-navy text-2xl">
                {project.title}
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-navy text-navy"
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
                className="h-8 w-8 text-navy hover:bg-beige hover:text-navy"
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
                className="h-8 w-8 text-navy hover:bg-beige hover:text-navy"
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
          <p className="text-navy/80 mb-6">{project.description}</p>
          <ul className="space-y-3">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="flex gap-3 group">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-navy flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="text-navy/80 leading-relaxed">{feature}</span>
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.001;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hexSize = 20;
      const cols = Math.ceil(canvas.width / (hexSize * 2)) + 2;
      const rows = Math.ceil(canvas.height / (hexSize * 1.7)) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * hexSize * 2 + (j % 2 === 0 ? 0 : hexSize);
          const y = j * hexSize * 1.7;

          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
              Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );

          const opacity = Math.sin(time + distanceFromCenter * 5) * 0.03 + 0.03;

          ctx.strokeStyle = `rgba(2, 32, 71, ${opacity})`;
          ctx.lineWidth = 1;

          drawHexagon(ctx, x, y, hexSize);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <PageWrapper>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ opacity: 1 }}
      />
      <section className="py-20">
        <div className="container max-w-5xl">
          <FadeIn>
            <h1 className="text-5xl font-bold mb-8 text-center text-navy">
              Projects
            </h1>
            <p className="text-center text-navy/70 text-lg mb-16 max-w-2xl mx-auto">
              A showcase of my technical projects and development work across
              various technologies.
            </p>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy via-beige to-navy"></div>
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

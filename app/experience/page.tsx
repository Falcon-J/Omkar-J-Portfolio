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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// Define interfaces for type safety
interface Experience {
  year: number;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

// Professional experience data
const professionalExperiences: Experience[] = [
  {
    year: 2025,
    title: "AI/ML Intern",
    company: "Forgeahead Solutions",
    duration: "June 2025 - Present",
    responsibilities: [
      "Building AI-powered solutions by developing and evaluating machine learning models for production environments.",
      "Tracked and compared ML experiments using MLflow to ensure reproducibility and performance monitoring.",
      "Utilized DagsHub for version control of datasets and models in a collaborative development workflow.",
    ],
  },
  {
    year: 2025,
    title: "Financial Research Intern",
    company: "Wall Street Global Institute",
    duration: "May 2025 - June 2025",
    responsibilities: [
      "Conducted in-depth research and analysis on the annual reports of Infosys and Asian Paints.",
      "Extracted key financial data and insights to support research and industry comparisons.",
    ],
  },
  {
    year: 2024,
    title: "Director of Operations",
    company: "Entrepreneurship Cell, VIT",
    duration: "July 2024 - June 2025",
    responsibilities: [
      "Driving operational strategy to scale the Entrepreneurship Cell, VIT, optimizing workflows and maximizing impact.",
      "Mentoring a dynamic team, cultivating an entrepreneurial mindset for innovation and high-impact execution.",
      "Optimized decision-making, increasing event efficiency and resource allocation by 30%.",
    ],
  },
];

// Extracurricular experience data
const extracurricularExperiences: Experience[] = [
  {
    year: 2024,
    title: "Organizing Committee - Volunteer",
    company: "AGAAZ 7.0",
    duration: "February 2024",
    responsibilities: [
      "Spearheaded the organization of Riviera's largest comedy show, collaborating with 4 renowned Indian performers.",
      "Facilitated a seamless experience for 1000+ attendees, ensuring smooth event execution and high audience engagement.",
    ],
  },
  {
    year: 2023,
    title: "Core Committee",
    company: "Entrepreneurship Cell, VIT",
    duration: "February 2023 - July 2024",
    responsibilities: [
      "Managed cross-functional coordination across 8 departments and 77 core members to organize flagship events.",
      "Led operational planning, ensuring timely execution of tasks, fostering collaboration, and driving organizational growth.",
      "Developed targeted engagement strategies, boosting member participation by 40% and enhancing overall community involvement.",
    ],
  },
  {
    year: 2023,
    title: "Event Coordinator - Volunteer",
    company: "ICETITE'24",
    duration: "June 2023 - March 2024",
    responsibilities: [
      "Led the planning and execution of TECHNEXT, a prominent event at the ic-ETITE'24 Conference.",
      "Implemented digital marketing campaigns on Instagram and Twitter, increasing event registrations by 40%.",
      "Collaborated with India's leading venture capitalists and startup innovators to mentor students, helping them convert technology concepts into practical solutions.",
    ],
  },
];

// Updated ExperienceCard component
const ExperienceCard = ({ experience }: { experience: Experience }) => (
  <div className="group relative">
    <div className="absolute left-0 top-0 w-16 h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10 transform group-hover:scale-110 transition-transform duration-300">
      <span className="text-xl">{experience.year}</span>
    </div>
    <div className="pl-24">
      <Card className="border-2 border-beige bg-white/80 backdrop-blur-sm hover:border-navy transition-all duration-300 transform group-hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-navy">
                  {experience.title}
                </CardTitle>
                <CardDescription className="text-lg text-navy/70 mt-1">
                  {experience.company}
                </CardDescription>
              </div>
              <span className="text-sm font-medium px-4 py-1 rounded-full bg-navy/10 text-navy">
                {experience.duration}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-3 group/item">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-navy flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                <span className="text-navy/80 leading-relaxed">
                  {responsibility}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Updated ExperienceSection component
const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => (
  <div className="relative">
    <div className="absolute left-[31px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-navy via-beige to-navy"></div>
    <div className="space-y-16">
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
    </div>
  </div>
);

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

export default function ExperiencePage() {
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

          ctx.strokeStyle = `rgba(2, 32, 71, ${opacity})`; // navy color with dynamic opacity
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
        style={{ opacity: 1}}
      />

      <section className="py-20">
        <div className="container max-w-5xl">
          <FadeIn>
            <h1 className="text-5xl font-bold mb-8 text-center text-navy">
              Experience
            </h1>
            <p className="text-center text-navy/70 text-lg mb-16 max-w-2xl mx-auto">
              A chronicle of my professional journey and contributions across
              various roles and organizations.
            </p>
          </FadeIn>

          <Tabs defaultValue="professional" className="w-full">
            <FadeIn delay={0.2}>
              <TabsList className="w-full max-w-xs mx-auto grid grid-cols-2 mb-16 bg-cream/50 p-1 rounded-full">
                <TabsTrigger
                  value="professional"
                  className="rounded-full px-8 py-2 data-[state=active]:bg-navy data-[state=active]:text-cream transition-all duration-300"
                >
                  Professional
                </TabsTrigger>
                <TabsTrigger
                  value="extracurricular"
                  className="rounded-full px-8 py-2 data-[state=active]:bg-navy data-[state=active]:text-cream transition-all duration-300"
                >
                  Extracurricular
                </TabsTrigger>
              </TabsList>
            </FadeIn>

            <TabsContent value="professional" className="space-y-8">
              <FadeIn delay={0.3}>
                <ExperienceSection experiences={professionalExperiences} />
              </FadeIn>
            </TabsContent>

            <TabsContent value="extracurricular" className="space-y-8">
              <FadeIn delay={0.3}>
                <ExperienceSection experiences={extracurricularExperiences} />
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageWrapper>
  );
}

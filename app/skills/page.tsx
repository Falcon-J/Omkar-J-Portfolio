"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import {
  Code,
  Database,
  Layers,
  Wrench,
  Brain,
  Cloud,
  Lock,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SkillsPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % skillCategories.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) =>
        prev === 0 ? skillCategories.length - 1 : prev - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const skillCategories = [
    {
      id: 1,
      title: "Programming Languages",
      icon: Terminal,
      description: "Core programming languages and scripting",
      skills: [
        "Python",
        "Java",
        "TypeScript",
        "JavaScript",
        "SQL",
        "R",
        "C",
        "C++",
      ],
    },
    {
      id: 2,
      title: "Web Development",
      icon: Code,
      description: "Frontend and backend web development technologies",
      skills: [
        "React.js",
        "Next.js",
        "Node.js",
        "WebSockets",
        "Tailwind CSS",
        "FastAPI",
        "REST APIs",
      ],
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      icon: Brain,
      description: "Machine learning frameworks and data science tools",
      skills: [
        "Scikit-Learn",
        "LangChain",
        "MLflow",
        "DagsHub",
        "NumPy",
        "Pandas",
        "SHAP",
      ],
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      icon: Cloud,
      description: "Cloud platforms, deployment, and version control",
      skills: ["GCP", "AWS", "Git", "GitHub", "Firebase", "Vercel", "Figma"],
    },
    {
      id: 5,
      title: "Databases & Tools",
      icon: Database,
      description: "Database management and development tools",
      skills: [
        "MongoDB",
        "Redis",
        "Firebase",
        "Firestore",
        "Postman",
        "VS Code",
      ],
    },
    {
      id: 6,
      title: "Core Concepts",
      icon: Layers,
      description: "Fundamental computer science and engineering concepts",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Distributed Systems",
        "Cloud Computing",
        "AI/ML",
        "Networks",
      ],
    },
  ];

  const normalizeIndex = (index: number) => {
    const length = skillCategories.length;
    return ((index % length) + length) % length;
  };

  const getPositionX = (index: number, currentIndex: number) => {
    const diff = index - currentIndex;
    const normalizedDiff =
      diff < -skillCategories.length / 2
        ? diff + skillCategories.length
        : diff > skillCategories.length / 2
        ? diff - skillCategories.length
        : diff;
    // Adjust spacing based on screen size
    return (
      normalizedDiff *
      (typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 120)
    );
  };

  return (
    <PageWrapper backgroundVariant="animated">
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-center text-portfolio-almost-black">
              Technical Stack
            </h1>
            <p className="text-center text-portfolio-almost-black/80 text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto px-4">
              A detailed breakdown of my technical expertise across different
              domains
            </p>
          </FadeIn>

          <div className="relative">
            <div className="relative h-[450px] sm:h-[400px] w-full overflow-hidden">
              {/* Updated Left Button */}
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="absolute left-0 md:left-[20%] lg:left-[30%] top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 
                bg-portfolio-surface/80 backdrop-blur-md border border-portfolio-beige/30 rounded-full
                hover:bg-portfolio-surface disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all duration-300 group"
                aria-label="Previous skill"
              >
                <motion.span
                  className="text-portfolio-navy block text-lg md:text-xl"
                  whileHover={{ x: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ←
                </motion.span>
              </button>

              {/* Updated Right Button */}
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="absolute right-0 md:right-[20%] lg:right-[30%] top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 
                bg-portfolio-surface/80 backdrop-blur-md border border-portfolio-beige/30 rounded-full
                hover:bg-portfolio-surface disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all duration-300 group"
                aria-label="Next skill"
              >
                <motion.span
                  className="text-portfolio-navy block text-lg md:text-xl"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </button>

              <div className="absolute inset-0 flex items-center">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="absolute w-[90%] md:w-full max-w-[300px] md:max-w-sm left-1/2"
                    initial={{ x: "-50%" }}
                    animate={{
                      x: `calc(-50% + ${getPositionX(index, currentIndex)}%)`,
                      scale:
                        normalizeIndex(index - currentIndex) === 0 ? 1 : 0.8,
                      opacity:
                        Math.abs(
                          getPositionX(index, currentIndex) /
                            (typeof window !== "undefined" &&
                            window.innerWidth < 768
                              ? 100
                              : 120)
                        ) <= 2
                          ? 1
                          : 0,
                      zIndex:
                        5 -
                        Math.abs(
                          getPositionX(index, currentIndex) /
                            (typeof window !== "undefined" &&
                            window.innerWidth < 768
                              ? 100
                              : 120)
                        ),
                      filter:
                        normalizeIndex(index - currentIndex) === 0
                          ? "blur(0)"
                          : "blur(2px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl border border-portfolio-beige/30 
                      bg-portfolio-surface/80 backdrop-blur-md p-4 md:p-6 transition-all duration-500
                      ${
                        normalizeIndex(index - currentIndex) === 0
                          ? "hover:shadow-xl"
                          : "pointer-events-none"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-surface/10 to-transparent pointer-events-none" />

                      <div className="relative">
                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                          <div className="p-2.5 md:p-3.5 rounded-xl bg-portfolio-navy text-portfolio-cream ring-1 ring-portfolio-beige/20 shadow-lg">
                            {React.createElement(category.icon, {
                              size:
                                typeof window !== "undefined" &&
                                window.innerWidth < 768
                                  ? 20
                                  : 24,
                            })}
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-bold text-portfolio-almost-black">
                              {category.title}
                            </h2>
                            <p className="text-xs md:text-sm text-portfolio-almost-black/70">
                              {category.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 md:px-3 py-1 md:py-1.5 bg-portfolio-navy/10 text-portfolio-almost-black rounded-lg 
                              text-xs md:text-sm font-medium backdrop-blur-sm hover:bg-portfolio-navy hover:text-portfolio-cream 
                              ring-1 ring-portfolio-navy/20 transition-all duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
              {skillCategories.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-5 md:w-6 bg-portfolio-navy"
                      : "w-1.5 md:w-2 bg-portfolio-navy/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 md:mt-16 p-4 md:p-6 bg-portfolio-surface/80 backdrop-blur-md border border-portfolio-beige/30 rounded-2xl text-center">
              <p className="text-sm md:text-base text-portfolio-almost-black/80 max-w-2xl mx-auto leading-relaxed">
                Navigate through my technical expertise using the arrows
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}

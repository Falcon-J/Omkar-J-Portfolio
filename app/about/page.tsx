"use client";

import { useState, useRef, useEffect } from "react";
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
import Image from "next/image";
import { Book, Brain, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

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

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("education");
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
      {/* Replace the existing animated background with canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ opacity: 0.7 }}
      />

      <section className="py-12 lg:py-20">
        <div className="container px-4 lg:px-6">
          <FadeIn>
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 lg:mb-16 text-center text-[var(--color-secondary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Profile Section - Stacked on mobile, 1/3 width on desktop */}
            <FadeIn delay={0.2}>
              <motion.div
                className="space-y-4 lg:space-y-6"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-[280px] sm:h-[320px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl mx-auto max-w-sm lg:max-w-none">
                  <Image
                    src="/pfp_side.jpg"
                    alt="Omkar Jawalikar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-xl lg:text-2xl font-bold text-navy mb-3 lg:mb-4">
                    Who I Am
                  </h2>
                  <p className="text-navy/80 leading-relaxed text-sm lg:text-base">
                    I'm a builder at heart, driven by curiosity, shaped by
                    discipline, and focused on crafting meaningful tech. Whether
                    it's developing intelligent AI tools, designing immersive
                    frontend experiences, or optimizing systems end-to-end, I
                    thrive at the intersection of innovation and execution. I
                    value clean architecture, user-centric design, and teamwork
                    that scales impact. Always learning, always shipping.
                  </p>
                </div>

                {/* Download Resume Button */}
                <div className="flex justify-center lg:justify-center mt-4 lg:mt-6">
                  <motion.a
                    href="/lastest_resume.pdf"
                    download="Omkar_Jawalikar_Resume.pdf"
                    className="inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-navy text-cream rounded-lg font-medium hover:bg-navy/90 transition-colors duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Resume
                  </motion.a>
                </div>

                <div className="flex justify-center lg:justify-start space-x-4 mt-4 lg:mt-6">
                  <motion.a
                    href="https://github.com/Falcon-J"
                    target="_blank"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#333] text-white p-3 rounded-full hover:bg-[#24292e] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/omkar-jawalikar"
                    target="_blank"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0077B5] text-white p-3 rounded-full hover:bg-[#0069a6] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:omkarjawalikar04@gmail.com"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#EA4335] text-white p-3 rounded-full hover:bg-[#d33426] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </FadeIn>

            {/* Main Content - Stacked on mobile, 2/3 width on desktop */}
            <div className="lg:col-span-2 mt-8 lg:mt-0">
              <FadeIn delay={0.4}>
                {/* Interactive Tabs */}
                <div className="mb-6 lg:mb-8 flex border-b border-beige/30 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("education")}
                    className={`px-3 lg:px-4 py-2 lg:py-3 font-medium transition-colors relative whitespace-nowrap text-sm lg:text-base ${
                      activeTab === "education"
                        ? "text-navy"
                        : "text-navy/50 hover:text-navy/70"
                    }`}
                  >
                    <span className="flex items-center gap-1 lg:gap-2">
                      <Book size={16} className="lg:w-[18px] lg:h-[18px]" />
                      Education
                    </span>
                    {activeTab === "education" && (
                      <motion.div
                        layoutId="activeBorder"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("certifications")}
                    className={`px-3 lg:px-4 py-2 lg:py-3 font-medium transition-colors relative whitespace-nowrap text-sm lg:text-base ${
                      activeTab === "certifications"
                        ? "text-navy"
                        : "text-navy/50 hover:text-navy/70"
                    }`}
                  >
                    <span className="flex items-center gap-1 lg:gap-2">
                      <Zap size={16} className="lg:w-[18px] lg:h-[18px]" />
                      Certifications
                    </span>
                    {activeTab === "certifications" && (
                      <motion.div
                        layoutId="activeBorder"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("approach")}
                    className={`px-3 lg:px-4 py-2 lg:py-3 font-medium transition-colors relative whitespace-nowrap text-sm lg:text-base ${
                      activeTab === "approach"
                        ? "text-navy"
                        : "text-navy/50 hover:text-navy/70"
                    }`}
                  >
                    <span className="flex items-center gap-1 lg:gap-2">
                      <Brain size={16} className="lg:w-[18px] lg:h-[18px]" />
                      My Approach
                    </span>
                    {activeTab === "approach" && (
                      <motion.div
                        layoutId="activeBorder"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                </div>

                {/* Education Content */}
                {activeTab === "education" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 lg:space-y-8"
                  >
                    <Card className="border-beige shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-primary to-blue-600"></div>
                      <CardHeader className="pb-3 lg:pb-4">
                        <CardTitle className="text-lg lg:text-xl leading-tight">
                          Bachelor of Technology - Computer Science and
                          Engineering
                        </CardTitle>
                        <CardDescription className="text-sm lg:text-base">
                          Vellore Institute of Technology, Vellore
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-4">
                          <p className="text-xs lg:text-sm text-navy/70">
                            Expected Graduation: August 2026
                          </p>
                          <p className="font-medium text-navy bg-cream/70 py-1 px-2 lg:px-3 rounded-full text-xs lg:text-sm w-fit">
                            CGPA: 8.27
                          </p>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-xs lg:text-sm font-semibold mb-3">
                            Relevant Coursework:
                          </h4>
                          <div className="flex flex-wrap gap-1.5 lg:gap-2">
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy text-xs lg:text-sm px-2 lg:px-3 py-1"
                              >
                                Data Structures & Algorithms
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy text-xs lg:text-sm px-2 lg:px-3 py-1"
                              >
                                Software Engineering
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Machine Learning
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Database Management Systems
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Artificial Intelligence
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Web Technologies
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Computer Networks
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Operating Systems
                              </Badge>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-navy mb-4">
                        Leadership Experience
                      </h3>
                      <Card className="border-beige shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                        <CardHeader>
                          <CardTitle>Director of Operations</CardTitle>
                          <CardDescription>
                            VIT Entrepreneurship Cell
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-navy/80 leading-relaxed">
                            As the Director of Operations at VIT's
                            Entrepreneurship Cell, I've developed leadership
                            skills and a strategic mindset. I enjoy tackling
                            complex problems and turning ideas into reality
                            through code and collaboration.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* Certifications Content */}
                {activeTab === "certifications" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <p className="text-navy/80 leading-relaxed mb-8">
                      These certifications demonstrate my commitment to
                      continuous learning and expertise in emerging
                      technologies.
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                      {/* McKinsey Forward Program */}
                      <Card className="border-beige shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>McKinsey Forward Program</span>
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-700 bg-green-50"
                            >
                              Current
                            </Badge>
                          </CardTitle>
                          <CardDescription>McKinsey & Company</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-navy/70">
                              <strong>Issued:</strong> 2025
                            </p>
                          </div>
                          <div className="mb-4">
                            <a
                              href="https://www.credly.com/badges/f4530a79-ae37-4ea2-b2a5-9df37f41ddc2/linked_in?t=sz0nx1"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                              View Credential →
                            </a>
                          </div>
                          <p className="text-navy/80 leading-relaxed mb-4">
                            A comprehensive business skills program designed to
                            accelerate professional development through
                            McKinsey's proven methodologies and frameworks for
                            problem-solving and leadership.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-blue-500 text-blue-700"
                              >
                                Business Strategy
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-blue-500 text-blue-700"
                              >
                                Problem Solving
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-blue-500 text-blue-700"
                              >
                                Leadership
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-blue-500 text-blue-700"
                              >
                                Strategic Thinking
                              </Badge>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Oracle Cloud Infrastructure Generative AI Professional */}
                      <Card className="border-beige shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-red-500 to-orange-600"></div>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>
                              Oracle Cloud Infrastructure Generative AI
                              Professional
                            </span>
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-700 bg-green-50"
                            >
                              Current
                            </Badge>
                          </CardTitle>
                          <CardDescription>Oracle Corporation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-navy/70">
                              <strong>Issued:</strong> 2025
                            </p>
                          </div>
                          <div className="mb-4">
                            <a
                              href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=4EAA05D1470DF9F2F3EAB04361CF6120A4E409A32C80B248D9B742B79CBC1C06"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                              View Credential →
                            </a>
                          </div>
                          <p className="text-navy/80 leading-relaxed mb-4">
                            Professional-level certification demonstrating
                            expertise in Oracle Cloud Infrastructure's
                            Generative AI services, including large language
                            models, AI model deployment, and responsible AI
                            practices.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-red-500 text-red-700"
                              >
                                Generative AI
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-red-500 text-red-700"
                              >
                                Oracle Cloud
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-red-500 text-red-700"
                              >
                                Large Language Models
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-red-500 text-red-700"
                              >
                                AI Model Deployment
                              </Badge>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Oracle Cloud Infrastructure AI Foundations Associate */}
                      <Card className="border-beige shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>
                              Oracle Cloud Infrastructure AI Foundations
                              Associate
                            </span>
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-700 bg-green-50"
                            >
                              Current
                            </Badge>
                          </CardTitle>
                          <CardDescription>Oracle Corporation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-navy/70">
                              <strong>Issued:</strong> 2025
                            </p>
                          </div>
                          <div className="mb-4">
                            <a
                              href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=E74803FFF1D0B12D8BDBCC9C80E573ECA8C1A73BFBA31AA733EA960E1EF23517"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                              View Credential →
                            </a>
                          </div>
                          <p className="text-navy/80 leading-relaxed mb-4">
                            Associate-level certification validating
                            foundational knowledge of AI concepts, Oracle Cloud
                            Infrastructure AI services, and machine learning
                            fundamentals for cloud-based AI solutions.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-orange-500 text-orange-700"
                              >
                                AI Foundations
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-orange-500 text-orange-700"
                              >
                                Oracle Cloud AI
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-orange-500 text-orange-700"
                              >
                                Machine Learning
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-orange-500 text-orange-700"
                              >
                                Cloud AI Services
                              </Badge>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* My Approach Content */}
                {activeTab === "approach" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-navy/80 leading-relaxed mb-8">
                      My approach to both technology and problem-solving is
                      guided by these core principles that define how I work and
                      collaborate with others.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Card className="border-beige bg-gradient-to-br from-white to-cream hover:shadow-md transition-all duration-300 h-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-navy text-lg flex items-center gap-2">
                              <Brain className="h-5 w-5 text-primary" />
                              Problem Solver
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-navy/80">
                              I approach challenges with analytical thinking and
                              creative problem-solving skills, breaking down
                              complex problems into manageable components to
                              find efficient solutions.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Card className="border-beige bg-gradient-to-br from-white to-cream hover:shadow-md transition-all duration-300 h-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-navy text-lg flex items-center gap-2">
                              <Book className="h-5 w-5 text-primary" />
                              Continuous Learner
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-navy/80">
                              I'm committed to staying updated with the latest
                              technologies and industry trends, constantly
                              expanding my skill set through self-study,
                              courses, and hands-on projects.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Card className="border-beige bg-gradient-to-br from-white to-cream hover:shadow-md transition-all duration-300 h-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-navy text-lg flex items-center gap-2">
                              <Users className="h-5 w-5 text-primary" />
                              Team Player
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-navy/80">
                              I thrive in collaborative environments and value
                              diverse perspectives, believing that the best
                              solutions come from combining different viewpoints
                              and expertise.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Card className="border-beige bg-gradient-to-br from-white to-cream hover:shadow-md transition-all duration-300 h-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-navy text-lg flex items-center gap-2">
                              <Zap className="h-5 w-5 text-primary" />
                              Detail-Oriented
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-navy/80">
                              I pay close attention to details while keeping the
                              big picture in mind, ensuring the quality and
                              coherence of every project I undertake from
                              planning to execution.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

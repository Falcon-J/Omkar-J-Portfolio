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

      <section className="py-20">
        <div className="container">
          <FadeIn>
            <motion.h1
              className="text-5xl font-bold mb-16 text-center text-[var(--color-secondary)] "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h1>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Profile Section - Now in left column (1/3 width) */}
            <FadeIn delay={0.2}>
              <motion.div
                className="space-y-6"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/pfp_side.jpg"
                    alt="Omkar Jawalikar"
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold text-navy">Who I Am</h2>
                <p className="text-navy/80 leading-relaxed">
                  I'm a Computer Science and Engineering student at Vellore
                  Institute of Technology, passionate about technology and
                  entrepreneurship. I strive to create impactful digital
                  experiences.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
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

            {/* Main Content - Now in right column (2/3 width) */}
            <div className="md:col-span-2">
              <FadeIn delay={0.4}>
                {/* Interactive Tabs */}
                <div className="mb-8 flex border-b border-beige/30">
                  <button
                    onClick={() => setActiveTab("education")}
                    className={`px-4 py-3 font-medium transition-colors relative ${
                      activeTab === "education"
                        ? "text-navy"
                        : "text-navy/50 hover:text-navy/70"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Book size={18} />
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
                    onClick={() => setActiveTab("approach")}
                    className={`px-4 py-3 font-medium transition-colors relative ${
                      activeTab === "approach"
                        ? "text-navy"
                        : "text-navy/50 hover:text-navy/70"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Brain size={18} />
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
                    className="space-y-8"
                  >
                    <Card className="border-beige shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-primary to-blue-600"></div>
                      <CardHeader>
                        <CardTitle>
                          Bachelor of Technology - Computer Science and
                          Engineering
                        </CardTitle>
                        <CardDescription className="text-base">
                          Vellore Institute of Technology, Vellore
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm text-navy/70">
                            Graduation: August 2026
                          </p>
                          <p className="font-medium text-navy bg-cream/70 py-1 px-3 rounded-full text-sm">
                            CGPA: 8.27
                          </p>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold mb-3">
                            Relevant Coursework:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Data Structures
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Software Methodology
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Algorithms Analysis
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Database Management
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
                                Internet Technology
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Systems Programming
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                className="border-navy text-navy"
                              >
                                Computer Architecture
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

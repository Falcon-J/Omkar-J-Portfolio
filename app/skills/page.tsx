"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Layers, Wrench } from "lucide-react";
import { motion } from "framer-motion";

export default function SkillsPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const skillCategories = [
    {
      id: 1,
      title: "Languages",
      icon: <Code className="h-5 w-5 text-navy" />,
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "C",
        "C++",
        "R",
        "SQL",
      ],
      color: "bg-gradient-to-br from-indigo-600 to-blue-800",
    },
    {
      id: 2,
      title: "Frameworks & Libraries",
      icon: <Layers className="h-5 w-5 text-navy" />,
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Scikit-learn",
        "TensorFlow",
      ],
      color: "bg-gradient-to-br from-purple-600 to-indigo-800",
    },
    {
      id: 3,
      title: "Databases",
      icon: <Database className="h-5 w-5 text-navy" />,
      skills: ["MongoDB", "Firestore", "MySQL"],
      color: "bg-gradient-to-br from-blue-600 to-cyan-800",
    },
    {
      id: 4,
      title: "Tools & Platforms",
      icon: <Wrench className="h-5 w-5 text-navy" />,
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "Figma",
        "AWS",
        "Firebase",
        "Vercel",
      ],
      color: "bg-gradient-to-br from-cyan-600 to-teal-800",
    },
  ];

  return (
    <PageWrapper>
      {/* Creative animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="skill-grid h-full w-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="skill-dot"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <section className="py-24">
        <div className="container">
          <FadeIn>
            <motion.h1
              className="text-5xl font-bold mb-20 text-center text-[var(--color-primary)]"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Technical Skills
            </motion.h1>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillCategories.map((category, index) => (
              <FadeIn key={category.id} delay={0.2 + index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setActiveCard(
                      activeCard === category.id ? null : category.id
                    )
                  }
                  className="cursor-pointer"
                >
                  <Card
                    className={`border-beige overflow-hidden transition-all duration-300 ${
                      activeCard === category.id ? "shadow-xl" : "shadow-md"
                    }`}
                  >
                    <div className={`h-2 ${category.color}`}></div>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-navy text-xl">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${category.color} bg-opacity-20`}
                        >
                          {category.icon}
                        </div>
                        {category.title}
                      </CardTitle>
                      <motion.div
                        animate={{
                          rotate: activeCard === category.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-6 h-6 text-navy flex items-center justify-center">
                          {activeCard === category.id ? "−" : "+"}
                        </div>
                      </motion.div>
                    </CardHeader>
                    <motion.div
                      animate={{
                        height: activeCard === category.id ? "auto" : "0px",
                        opacity: activeCard === category.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`overflow-hidden`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <motion.div
                              key={skill}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                className={`${category.color} hover:opacity-90 text-white px-3 py-1 text-sm`}
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-navy/70 max-w-2xl mx-auto">
              Continuously expanding my knowledge and staying current with the
              latest technologies to deliver cutting-edge solutions.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import { Code, Database, Layers, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const PRIMARY_COLOR = "bg-[var(--color-primary)]";
const SECONDARY_COLOR = "bg-[var(--color-secondary)]";
const PRIMARY_TEXT = "text-[var(--color-primary)]";
const SECONDARY_TEXT = "text-[var(--color-secondary)]";

export default function SkillsPage() {
  const skillCategories = [
    {
      id: 1,
      title: "Programming Languages",
      icon: <Code className="h-5 w-5" />,
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
    },
    {
      id: 2,
      title: "Frameworks & Libraries",
      icon: <Layers className="h-5 w-5" />,
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Scikit-learn",
        "TensorFlow",
      ],
    },
    {
      id: 3,
      title: "Databases",
      icon: <Database className="h-5 w-5" />,
      skills: ["MongoDB", "Firestore", "MySQL"],
    },
    {
      id: 4,
      title: "Tools, Platforms & DevOps",
      icon: <Wrench className="h-5 w-5" />,
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "Figma",
        "AWS",
        "Firebase",
        "Vercel",
      ],
    },
  ];

  return (
    <PageWrapper>
      <section className="py-24">
        <FadeIn>
          <motion.h1
            className="text-5xl font-bold mb-16 text-center text-[var(--color-secondary)] "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Skills
          </motion.h1>
        </FadeIn>
        <div className="container flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-8xl">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                className="rounded-xl shadow-lg p-8 flex flex-col items-center bg-white border "
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex flex-row items-center gap-4">
                  <h2
                    className={`text-3xl font-bold mb-4 ${
                      i % 2 === 0 ? PRIMARY_TEXT : SECONDARY_TEXT
                    }`}
                  >
                    {cat.title}
                  </h2>
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      i % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR
                    }`}
                  >
                    {cat.icon}
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2 justify-center">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`px-3 py-1 rounded-full text-md font-semibold shadow ${
                        i % 2 === 0
                          ? "bg-[var(--color-primary)/10] text-[var(--color-primary)]"
                          : "bg-[var(--color-secondary)/10] text-[var(--color-secondary)]"
                      }`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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

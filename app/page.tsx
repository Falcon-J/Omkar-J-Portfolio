"use client";

import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  Code,
  Briefcase,
  Star,
  Music,
  Car,
  Laptop,
  BookOpen,
  Award,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import { FlipCard } from "@/components/flip-card";
import { IconReveal } from "@/components/icon-reveal";
import Folder from "@/components/folder";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [interestsOpen, setInterestsOpen] = useState(false);

  return (
    <PageWrapper>
      {/* Animated Squares Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden"></div>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-transparent relative mb-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.4}>
              <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 group">
                {/* Animated glow background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-secondary)] via-transparent to-[var(--color-primary)] opacity-35 group-hover:opacity-80 blur-md transition-all animate-[spin_7s_linear_infinite]"></div>

                {/* Profile image container */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-[var(--color-light)]/60 group-hover:border-2 transition-all duration-500 z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/0 to-[var(--color-secondary)]/0 group-hover:from-[var(--color-primary)]/10 group-hover:to-[var(--color-secondary)]/30 transition-all duration-500 z-20"></div>
                  <Image
                    src="/stella.jpg"
                    alt="Omkar Jawalikar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Rotating border accent */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-transparent animate-[spin_15s_linear_infinite] group-hover:border-[var(--color-primary)]/30 transition-all duration-700 group-hover:animate-none"></div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-[var(--color-primary)]">
                  Hi, I'm{" "}
                  <span className="text-[var(--color-secondary)]">
                    Omkar Jawalikar
                  </span>
                </h1>
                <p className="text-xl max-w-xl text-[var(--color-secondary)]">
                  Computer Science student at VIT with expertise in full-stack
                  development, passionate about building innovative solutions
                  and entrepreneurship.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-light)]"
                    asChild
                  >
                    <Link href="/contact">
                      Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[var(--color-light)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-light)]"
                    asChild
                  >
                    <Link href="/projects">View Projects</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <hr></hr>

      {/* Quick Stats Section */}

      {/* Personal Interests Section */}
      <section className="py-16 bg-transparent relative">
        <div className="container">
          <FadeIn delay={0.3}>
            <div className="flex justify-center">
              <div className="text-center mt-20">
                <Folder
                  color="#6366f1"
                  size={2}
                  items={[
                    // Tech Card
                    <div
                      key="tech-card"
                      className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-md rounded-lg"
                    >
                      <div className="bg-indigo-100 p-2 rounded-full mb-2">
                        <Laptop className="h-6 w-6 text-indigo-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-indigo-700">
                        Tech
                      </h3>
                      <p className="text-xs text-indigo-600/80 mt-1">
                        Exploring new technologies
                      </p>
                    </div>,

                    // Music Card
                    <div
                      key="music-card"
                      className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 shadow-md rounded-lg"
                    >
                      <div className="bg-pink-100 p-2 rounded-full mb-2">
                        <Music className="h-6 w-6 text-pink-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-pink-700">
                        Music
                      </h3>
                      <p className="text-xs text-pink-600/80 mt-1">
                        Discovering diverse genres
                      </p>
                    </div>,

                    // Cars Card
                    <div
                      key="cars-card"
                      className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 shadow-md rounded-lg"
                    >
                      <div className="bg-orange-100 p-2 rounded-full mb-2">
                        <Car className="h-6 w-6 text-orange-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-orange-700">
                        Cars
                      </h3>
                      <p className="text-xs text-orange-600/80 mt-1">
                        Automotive design & engineering
                      </p>
                    </div>,

                    // Badminton Card
                    <div
                      key="badminton-card"
                      className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 shadow-md rounded-lg"
                    >
                      <div className="bg-green-100 p-2 rounded-full mb-2">
                        <Award className="h-6 w-6 text-green-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-green-700">
                        Badminton
                      </h3>
                      <p className="text-xs text-green-600/80 mt-1">
                        Competitive matches
                      </p>
                    </div>,

                    // Stories Card
                    <div
                      key="stories-card"
                      className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-lg"
                    >
                      <div className="bg-blue-100 p-2 rounded-full mb-2">
                        <BookOpen className="h-6 w-6 text-blue-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-blue-700">
                        Stories
                      </h3>
                      <p className="text-xs text-blue-600/80 mt-1">
                        Books, films & narratives
                      </p>
                    </div>,
                  ]}
                />
              </div>
            </div>

            <div className="text-center mt-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] inline-flex items-center gap-2"
                
                whileTap={{ scale: 0.95 }}
              >
                Things I{" "}
                <span className="text-[var(--color-secondary)]">Love</span>
              </motion.h2>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}

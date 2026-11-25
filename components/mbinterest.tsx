"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Music, Car, Award, BookOpen } from "lucide-react";

interface InterestItem {
  icon: React.ReactElement;
  title: string;
  desc: string;
  color: keyof typeof colorClasses;
}

const colorClasses = {
  indigo: {
    bg: "from-indigo-50 to-indigo-100 dark:from-indigo-950/60 dark:to-indigo-900/40",
    icon: "bg-indigo-100 dark:bg-indigo-900/60",
    title: "text-indigo-700 dark:text-indigo-200",
    desc: "text-indigo-600/80 dark:text-indigo-300/80",
  },
  pink: {
    bg: "from-pink-50 to-pink-100 dark:from-pink-950/60 dark:to-pink-900/40",
    icon: "bg-pink-100 dark:bg-pink-900/60",
    title: "text-pink-700 dark:text-pink-200",
    desc: "text-pink-600/80 dark:text-pink-300/80",
  },
  orange: {
    bg: "from-orange-50 to-orange-100 dark:from-orange-950/60 dark:to-orange-900/40",
    icon: "bg-orange-100 dark:bg-orange-900/60",
    title: "text-orange-700 dark:text-orange-200",
    desc: "text-orange-600/80 dark:text-orange-300/80",
  },
  green: {
    bg: "from-green-50 to-green-100 dark:from-green-950/60 dark:to-green-900/40",
    icon: "bg-green-100 dark:bg-green-900/60",
    title: "text-green-700 dark:text-green-200",
    desc: "text-green-600/80 dark:text-green-300/80",
  },
  blue: {
    bg: "from-blue-50 to-blue-100 dark:from-blue-950/60 dark:to-blue-900/40",
    icon: "bg-blue-100 dark:bg-blue-900/60",
    title: "text-blue-700 dark:text-blue-200",
    desc: "text-blue-600/80 dark:text-blue-300/80",
  },
};

const interests: InterestItem[] = [
  {
    icon: <Laptop className="h-6 w-6 text-indigo-500" />,
    title: "Tech",
    desc: "Exploring new technologies",
    color: "indigo",
  },
  {
    icon: <Music className="h-6 w-6 text-pink-500" />,
    title: "Music",
    desc: "Discovering diverse genres",
    color: "pink",
  },
  {
    icon: <Car className="h-6 w-6 text-orange-500" />,
    title: "Cars",
    desc: "Automotive design & engineering",
    color: "orange",
  },
  {
    icon: <Award className="h-6 w-6 text-green-500" />,
    title: "Badminton",
    desc: "Competitive matches",
    color: "green",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    title: "Stories",
    desc: "Books, films & narratives",
    color: "blue",
  },
];

export default function Mbinterest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (currentIndex === interests.length) {
        containerRef.current.scrollTo({ left: 0, behavior: "auto" });
        setCurrentIndex(0);
      } else {
        containerRef.current.scrollTo({
          left: width * currentIndex,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  return (
    <section className="py-8 bg-transparent relative md:hidden">
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          style={{ pointerEvents: "auto" }}
        >
          <div className="container max-w-screen-sm px-4">
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center">
              My Interests
            </h2>

            <motion.div
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[...interests, interests[0]].map((item, idx) => (
                <div
                  key={idx}
                  className={`snap-start shrink-0 w-full flex justify-center items-center gap-4 p-6 rounded-xl bg-gradient-to-r ${
                    colorClasses[item.color].bg
                  } shadow`}
                >
                  <span
                    className={`${
                      colorClasses[item.color].icon
                    } p-2 rounded-full`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3
                      className={`font-semibold ${
                        colorClasses[item.color].title
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-sm ${colorClasses[item.color].desc}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>
    </section>
  );
}

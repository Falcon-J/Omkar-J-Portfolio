"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Music, Car, Award, BookOpen } from "lucide-react";
// import
interface InterestItem {
  icon: React.ReactElement;
  title: string;
  desc: string;
  color: string;
}

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
      // If we are at the cloned last slide (index = interests.length), jump back instantly without smooth
      if (currentIndex === interests.length) {
        // Scroll instantly to start (0)
        containerRef.current.scrollTo({ left: 0, behavior: "auto" });
        setCurrentIndex(0);
      } else {
        // Scroll smoothly to current index
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
          <div className="container max-w-screen-sm px-20  ">
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center ">
              My Interests
            </h2>

            <motion.div
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory srollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[...interests, interests[0]].map((item, idx) => (
                <div
                  key={idx}
                  className={`snap-start shrink-0 w-full flex justify-center items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 shadow mx-2`}
                >
                  <span className={`bg-${item.color}-100 p-2 rounded-full`}>
                    {item.icon}
                  </span>
                  <div>
                    <h3 className={`font-semibold text-${item.color}-700`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm text-${item.color}-600/80`}>
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

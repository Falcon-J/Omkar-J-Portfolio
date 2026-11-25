"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Laptop, Music, Car, Award, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import Folder from "@/components/folder";
const colorClasses: Record<string, { card: string; icon: string; title: string; desc: string }> = {
  indigo: { card: "from-indigo-50 to-indigo-100", icon: "bg-indigo-100", title: "text-indigo-700", desc: "text-indigo-600/80" },
  pink: { card: "from-pink-50 to-pink-100", icon: "bg-pink-100", title: "text-pink-700", desc: "text-pink-600/80" },
  orange: { card: "from-orange-50 to-orange-100", icon: "bg-orange-100", title: "text-orange-700", desc: "text-orange-600/80" },
  green: { card: "from-green-50 to-green-100", icon: "bg-green-100", title: "text-green-700", desc: "text-green-600/80" },
  blue: { card: "from-blue-50 to-blue-100", icon: "bg-blue-100", title: "text-blue-700", desc: "text-blue-600/80" },
};

const Interestssection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const items = [
    {
      key: "tech",
      color: "indigo",
      icon: <Laptop className="h-6 w-6 text-indigo-500" />,
      title: "Tech",
      desc: "Exploring new technologies",
    },
    {
      key: "music",
      color: "pink",
      icon: <Music className="h-6 w-6 text-pink-500" />,
      title: "Music",
      desc: "Discovering diverse genres",
    },
    {
      key: "cars",
      color: "orange",
      icon: <Car className="h-6 w-6 text-orange-500" />,
      title: "Cars",
      desc: "Automotive design & engineering",
    },
    {
      key: "badminton",
      color: "green",
      icon: <Award className="h-6 w-6 text-green-500" />,
      title: "Badminton",
      desc: "Competitive matches",
    },
    {
      key: "stories",
      color: "blue",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Stories",
      desc: "Books, films & narratives",
    },
  ];

  return (
    <section className="foldercard py-16 bg-transparent relative hidden md:block">
      <div className="container">
        <FadeIn delay={0.3}>
          <div className="flex justify-center">
            <div className="text-center mt-20 gap-4">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Folder
                  color="#6366f1"
                  size={2}
                  items={items.map((item) => (
                    <div
                      key={item.key}
                      className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${colorClasses[item.color].card} shadow-md rounded-lg`}
                    >
                      <div
                        className={`${colorClasses[item.color].icon} p-2 rounded-full mb-2`}
                      >
                        {item.icon}
                      </div>
                      <h3
                        className={`text-sm font-semibold ${colorClasses[item.color].title}`}
                      >
                        {item.title}
                      </h3>
                      <p className={`text-xs ${colorClasses[item.color].desc} mt-1`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                />
              </div>
            </div>
          </div>

          <ul className="sr-only">
            {items.map((item) => (
              <li key={item.key}>
                {item.title}: {item.desc}
              </li>
            ))}
          </ul>

          <div className="text-center mt-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] inline-flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              {isHovered ? "Click to open" : "My interests"}{" "}
              <span className="text-[var(--color-secondary)]">
                {isHovered ? "" : ":)"}
              </span>
            </motion.h2>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Interestssection;

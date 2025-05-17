import { useState } from "react";
import { motion } from "framer-motion";
import { Laptop, Music, Car, Award, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import Folder from "@/components/folder";
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
                      className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 shadow-md rounded-lg`}
                    >
                      <div
                        className={`bg-${item.color}-100 p-2 rounded-full mb-2`}
                      >
                        {item.icon}
                      </div>
                      <h3
                        className={`text-sm font-semibold text-${item.color}-700`}
                      >
                        {item.title}
                      </h3>
                      <p className={`text-xs text-${item.color}-600/80 mt-1`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] inline-flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              {isHovered ? "Click Now" : "Hover"}{" "}
              <span className="text-[var(--color-secondary)]">
                {isHovered ? "" : " :)"}
              </span>
            </motion.h2>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Interestssection;

"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Define interfaces for type safety
interface Experience {
  year: number;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

// Awards/Achievements interface
interface Achievement {
  year: number;
  title: string;
  event: string;
  location: string;
  description?: string;
}

// Professional experience data
const professionalExperiences: Experience[] = [
  {
    year: 2025,
    title: "AI/ML Intern",
    company: "ForgeAhead Solutions",
    duration: "June 2025 - August 2025",
    responsibilities: [
      "Building an agentic AI pipeline using OpenRouter API to parse job data, enabling real-time scoring with over 80% accuracy.",
      "Integrated S-BERT embeddings and OCR pipelines to extract keywords, improving semantic matching by 15%.",
      "Managed and tracked multiple ML dataset and model versions using MLflow and DagsHub across a 4-person team.",
    ],
  },
  {
    year: 2025,
    title: "Financial Research Intern",
    company: "Wall Street Global Institute",
    duration: "May 2025 - June 2025",
    responsibilities: [
      "Validated financial data from Indian and U.S. annual reports, increasing reporting accuracy by 85% and contributing to an ISB edition book.",
      "Compared disclosures across 8 chapters, highlighting key differences between Indian reports and Microsoft's SEC 10-K filings.",
      "Reviewed 20+ sections from Infosys and Asian Paints annual reports, covering ESG, MD&A, and consolidated financial statements for insights.",
    ],
  },
  {
    year: 2024,
    title: "Director of Operations",
    company: "Entrepreneurship Cell, VIT",
    duration: "July 2024 - June 2025",
    responsibilities: [
      "Optimized internal workflows using Google Workspace, reducing coordination time by 30%.",
      "Coordinated across 8 departments to standardize processes, enabling faster event execution and improved collaboration.",
      "Led a 20-member team to successfully execute 15+ campus-wide events with 1000+ cumulative attendees.",
    ],
  },
];

// Extracurricular experience data
const extracurricularExperiences: Experience[] = [
  {
    year: 2024,
    title: "Organizing Committee - Volunteer",
    company: "AGAAZ 7.0",
    duration: "February 2024",
    responsibilities: [
      "Spearheaded the organization of Riviera's largest comedy show, collaborating with 4 renowned Indian performers.",
      "Facilitated a seamless experience for 1000+ attendees, ensuring smooth event execution and high audience engagement.",
      "Coordinated logistics, vendor management, and technical requirements for a high-profile entertainment event.",
    ],
  },
  {
    year: 2024,
    title: "Person of Contact",
    company:
      "International Conference on Emerging Trends in Information Technology and Engineering",
    duration: "June 2023 - March 2024",
    responsibilities: [
      "Organized Technext, a technology exhibition, showcasing cutting-edge innovations and emerging trends in IT and engineering.",
      "Coordinated with multiple stakeholders, speakers, and participants to ensure successful execution of the technology exhibition.",
      "Facilitated knowledge exchange and networking opportunities for attendees from academia and industry during the conference.",
    ],
  },
  {
    year: 2023,
    title: "Core Committee Member",
    company: "Entrepreneurship Cell, VIT",
    duration: "February 2023 - July 2024",
    responsibilities: [
      "Managed cross-functional coordination across 8 departments and 77 core members to organize flagship events.",
      "Led operational planning, ensuring timely execution of tasks, fostering collaboration, and driving organizational growth.",
      "Developed targeted engagement strategies, boosting member participation by 40% and enhancing overall community involvement.",
    ],
  },
];

// Awards and achievements data
const achievements: Achievement[] = [
  
  {
    year: 2023,
    title: "Best UI/UX Award – Game Development Track",
    event: "Hackstory Hackathon – VIT",
    location: "Vellore, IN",
    description:
      "Developed 'Mental Quest', an RPG-based mental health awareness game using RPG Maker and Ruby scripting with intuitive design and engaging UX. Presented a full business proposal including monetization strategy and scalability plan.",
  },
  {
    year: 2023,
    title: "2nd Runner up Cryptic Hunt 2.0",
    event: "Cryptographic Puzzle Solving Competition - (ACM-VIT Chapter)",
    location: "Vellore, IN",
    description:
      "Placed 3rd among university-wide participants in ACM-VIT's cryptographic puzzle competition during graVITas 2023, demonstrating strong problem-solving and analytical thinking skills.",
  },
];

// Updated ExperienceCard component with theme support
const ExperienceCard = ({
  experience,
  theme = "professional",
}: {
  experience: Experience;
  theme?: "professional" | "extracurricular";
}) => {
  const themeConfig = {
    professional: {
      yearBg: "bg-portfolio-navy",
      yearHoverBg: "hover:bg-portfolio-navy/90",
      cardBorder: "border-portfolio-beige",
      cardBg: "bg-portfolio-surface",
      cardHoverBorder: "hover:border-portfolio-navy/50",
      titleColor: "text-portfolio-almost-black",
      descriptionColor: "text-portfolio-almost-black/80",
      durationBg: "bg-portfolio-surface-elevated",
      durationColor: "text-portfolio-almost-black",
      bulletBg: "bg-portfolio-navy",
      textColor: "text-portfolio-almost-black/80",
      timelineBg: "from-portfolio-navy via-portfolio-beige to-portfolio-navy",
    },
    extracurricular: {
      yearBg: "bg-green-600",
      yearHoverBg: "hover:bg-green-700",
      cardBorder: "border-portfolio-beige",
      cardBg: "bg-portfolio-surface",
      cardHoverBorder: "hover:border-green-400",
      titleColor: "text-portfolio-almost-black",
      descriptionColor: "text-portfolio-almost-black/80",
      durationBg: "bg-green-100",
      durationColor: "text-green-800",
      bulletBg: "bg-green-600",
      textColor: "text-portfolio-almost-black/80",
      timelineBg: "from-green-600 via-green-300 to-green-600",
    },
  };

  const config = themeConfig[theme];

  return (
    <div className="group relative">
      <div
        className={`absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 ${config.yearBg} ${config.yearHoverBg} rounded-full flex items-center justify-center text-portfolio-cream font-bold z-10 transform group-hover:scale-110 transition-all duration-300`}
      >
        <span className="text-sm md:text-xl">{experience.year}</span>
      </div>
      <div className="pl-16 md:pl-24">
        <Card
          className={`border-2 ${config.cardBorder} ${config.cardBg} backdrop-blur-sm ${config.cardHoverBorder} transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg`}
        >
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle
                    className={`text-lg sm:text-xl md:text-2xl font-bold ${config.titleColor} leading-tight`}
                  >
                    {experience.title}
                  </CardTitle>
                  <CardDescription
                    className={`text-sm md:text-base ${config.descriptionColor} mt-1 break-words font-medium`}
                  >
                    {experience.company}
                  </CardDescription>
                </div>
                <span
                  className={`self-start sm:self-auto text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg ${config.durationBg} ${config.durationColor} whitespace-nowrap flex-shrink-0`}
                >
                  {experience.duration}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {experience.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 md:gap-3 group/item"
                >
                  <div
                    className={`mt-1.5 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${config.bulletBg} flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300`}
                  ></div>
                  <span
                    className={`text-sm md:text-base ${config.textColor} leading-relaxed`}
                  >
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Achievement Card component
const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
  <div className="group relative">
    <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold z-10 transform group-hover:scale-110 transition-transform duration-300">
      <span className="text-lg md:text-2xl">🏆</span>
    </div>
    <div className="pl-16 md:pl-24">
      <Card className="border-2 border-portfolio-beige bg-portfolio-surface hover:border-yellow-400 transition-all duration-300 transform group-hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-portfolio-almost-black leading-tight">
                  {achievement.title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base text-portfolio-almost-black/80 mt-1 break-words font-medium">
                  {achievement.event}
                </CardDescription>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="text-xs sm:text-sm font-medium px-2 py-1 rounded-lg bg-yellow-200 text-yellow-800 whitespace-nowrap">
                  {achievement.location}
                </span>
                <span className="text-xs sm:text-sm font-bold text-yellow-600">
                  {achievement.year}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        {achievement.description && (
          <CardContent>
            <p className="text-sm md:text-base text-portfolio-almost-black/80 leading-relaxed">
              {achievement.description}
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  </div>
);

// Achievement Section component
const AchievementSection = ({
  achievements,
}: {
  achievements: Achievement[];
}) => (
  <div className="relative">
    {/* Desktop timeline */}
    <div className="hidden md:block absolute left-[31px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-500 via-orange-400 to-yellow-500"></div>
    {/* Mobile timeline */}
    <div className="md:hidden absolute left-[23px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-500 via-orange-400 to-yellow-500"></div>
    <div className="space-y-8 md:space-y-16">
      {achievements.map((achievement, index) => (
        <AchievementCard key={index} achievement={achievement} />
      ))}
    </div>
  </div>
);

// Updated ExperienceSection component with theme support
const ExperienceSection = ({
  experiences,
  theme = "professional",
}: {
  experiences: Experience[];
  theme?: "professional" | "extracurricular";
}) => {
  const timelineConfig = {
    professional: "from-portfolio-navy via-portfolio-beige to-portfolio-navy",
    extracurricular: "from-green-600 via-green-300 to-green-600",
  };

  return (
    <div className="relative">
      {/* Desktop timeline */}
      <div
        className={`hidden md:block absolute left-[31px] top-8 bottom-8 w-0.5 bg-gradient-to-b ${timelineConfig[theme]}`}
      ></div>
      {/* Mobile timeline */}
      <div
        className={`md:hidden absolute left-[23px] top-8 bottom-8 w-0.5 bg-gradient-to-b ${timelineConfig[theme]}`}
      ></div>
      <div className="space-y-8 md:space-y-16">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default function ExperiencePage() {
  return (
    <PageWrapper backgroundVariant="animated">
      <section className="py-12 md:py-20">
        <div className="container max-w-5xl px-4 md:px-6">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center text-portfolio-almost-black">
              Experience
            </h1>
            <p className="text-center text-portfolio-almost-black/80 text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto px-4">
              A chronicle of my professional journey and contributions across
              various roles and organizations.
            </p>
          </FadeIn>

          <Tabs defaultValue="professional" className="w-full">
            <FadeIn delay={0.2}>
              <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 mb-12 md:mb-16 bg-portfolio-surface/50 p-1 rounded-full">
                <TabsTrigger
                  value="professional"
                  className="rounded-full px-2 md:px-6 py-2 text-xs md:text-sm data-[state=active]:bg-portfolio-navy data-[state=active]:text-portfolio-cream transition-all duration-300 text-center flex items-center justify-center"
                >
                  <span className="hidden sm:inline">Professional</span>
                  <span className="sm:hidden">Work</span>
                </TabsTrigger>
                <TabsTrigger
                  value="extracurricular"
                  className="rounded-full px-2 md:px-6 py-2 text-xs md:text-sm data-[state=active]:bg-portfolio-navy data-[state=active]:text-portfolio-cream transition-all duration-300 text-center flex items-center justify-center"
                >
                  <span className="hidden sm:inline">Extracurricular</span>
                  <span className="sm:hidden">Activities</span>
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="rounded-full px-2 md:px-6 py-2 text-xs md:text-sm data-[state=active]:bg-portfolio-navy data-[state=active]:text-portfolio-cream transition-all duration-300 text-center flex items-center justify-center"
                >
                  <span className="hidden sm:inline">Achievements</span>
                  <span className="sm:hidden">Awards</span>
                </TabsTrigger>
              </TabsList>
            </FadeIn>

            <TabsContent value="professional" className="space-y-8">
              <FadeIn delay={0.3}>
                <ExperienceSection
                  experiences={professionalExperiences}
                  theme="professional"
                />
              </FadeIn>
            </TabsContent>

            <TabsContent value="extracurricular" className="space-y-8">
              <FadeIn delay={0.3}>
                <ExperienceSection
                  experiences={extracurricularExperiences}
                  theme="extracurricular"
                />
              </FadeIn>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <FadeIn delay={0.3}>
                <AchievementSection achievements={achievements} />
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageWrapper>
  );
}

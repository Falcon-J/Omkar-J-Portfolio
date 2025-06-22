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

// Define interfaces for type safety
interface Experience {
  year: number;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

// Professional experience data
const professionalExperiences: Experience[] = [
  {
    year: 2025,
    title: "AI/ML Intern",
    company: "Forgeahead Solutions",
    duration: "June 2025 - Present",
    responsibilities: [
      "Building AI-powered solutions by developing and evaluating machine learning models for production environments.",
      "Tracked and compared ML experiments using MLflow to ensure reproducibility and performance monitoring.",
      "Utilized DagsHub for version control of datasets and models in a collaborative development workflow.",
    ],
  },
  {
    year: 2025,
    title: "Financial Research Intern",
    company: "Wall Street Global Institute",
    duration: "May 2025 - June 2025",
    responsibilities: [
      "Conducted in-depth research and analysis on the annual reports of Infosys and Asian Paints.",
      "Extracted key financial data and insights to support research and industry comparisons.",
    ],
  },
  {
    year: 2024,
    title: "Director of Operations",
    company: "Entrepreneurship Cell, VIT",
    duration: "July 2024 - June 2025",
    responsibilities: [
      "Driving operational strategy to scale the Entrepreneurship Cell, VIT, optimizing workflows and maximizing impact.",
      "Mentoring a dynamic team, cultivating an entrepreneurial mindset for innovation and high-impact execution.",
      "Optimized decision-making, increasing event efficiency and resource allocation by 30%.",
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
    ],
  },
  {
    year: 2023,
    title: "Core Committee",
    company: "Entrepreneurship Cell, VIT",
    duration: "February 2023 - July 2024",
    responsibilities: [
      "Managed cross-functional coordination across 8 departments and 77 core members to organize flagship events.",
      "Led operational planning, ensuring timely execution of tasks, fostering collaboration, and driving organizational growth.",
      "Developed targeted engagement strategies, boosting member participation by 40% and enhancing overall community involvement.",
    ],
  },
  {
    year: 2023,
    title: "Event Coordinator - Volunteer",
    company: "ICETITE'24",
    duration: "June 2023 - March 2024",
    responsibilities: [
      "Led the planning and execution of TECHNEXT, a prominent event at the ic-ETITE'24 Conference.",
      "Implemented digital marketing campaigns on Instagram and Twitter, increasing event registrations by 40%.",
      "Collaborated with India's leading venture capitalists and startup innovators to mentor students, helping them convert technology concepts into practical solutions.",
    ],
  },
];

// Component to render experience card
const ExperienceCard = ({ experience }: { experience: Experience }) => (
  <div className="relative">
    <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10">
      <span>{experience.year}</span>
    </div>
    <div className="pl-16 md:pl-24">
      <Card className="border-beige hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-navy">{experience.title}</CardTitle>
              <CardDescription>{experience.company}</CardDescription>
            </div>
            <div className="text-sm text-navy/70">{experience.duration}</div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-navy/80">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-navy flex-shrink-0"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Experience section component
const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => (
  <div className="relative">
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-beige ml-6 md:ml-8"></div>
    <div className="space-y-12">
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
    </div>
  </div>
);

export default function ExperiencePage() {
  return (
    <PageWrapper>
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
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-16 text-center text-[var(--color-secondary)]">
              Experience
            </h1>
          </FadeIn>

          <Tabs defaultValue="professional" className="w-full">
            <FadeIn delay={0.2}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger
                  value="professional"
                  className="data-[state=active]:bg-navy data-[state=active]:text-cream"
                >
                  Professional
                </TabsTrigger>
                <TabsTrigger
                  value="extracurricular"
                  className="data-[state=active]:bg-navy data-[state=active]:text-cream"
                >
                  Extracurricular
                </TabsTrigger>
              </TabsList>
            </FadeIn>

            <TabsContent value="professional" className="space-y-8">
              <FadeIn delay={0.3}>
                <ExperienceSection experiences={professionalExperiences} />
              </FadeIn>
            </TabsContent>

            <TabsContent value="extracurricular" className="space-y-8">
              <FadeIn delay={0.3}>
                <ExperienceSection experiences={extracurricularExperiences} />
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageWrapper>
  );
}

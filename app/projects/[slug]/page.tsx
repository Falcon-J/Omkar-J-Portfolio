import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// This would typically come from a database or CMS
const getProjectData = (slug: string) => {
  const projects = {
    "portfolio-website": {
      title: "Portfolio Website",
      description:
        "A high-performance personal portfolio website showcasing my skills, projects, and experience. Built with React, Tailwind CSS, and Redux to create a responsive and engaging user experience.",
      image: "/screenshots/homepage.jpg",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "Firebase", "Redux"],
      features: [
        "Developed a high-performance personal portfolio, improving load times by 40% and boosting user engagement.",
        "Enhanced UI/UX with Tailwind CSS, reducing development time by 20% and ensuring responsiveness across devices.",
        "Implemented Redux for efficient state management across 50+ components, improving data consistency.",
        "Optimized image loading and rendering for better performance on mobile devices.",
        "Implemented SEO best practices to improve search engine visibility.",
      ],
      challenges: [
        "Balancing aesthetic design with performance optimization",
        "Creating a responsive layout that works well on all device sizes",
        "Implementing smooth animations without affecting performance",
      ],
      solutions: [
        "Used code splitting and lazy loading to improve initial load times",
        "Implemented a mobile-first design approach with responsive breakpoints",
        "Utilized CSS transitions and Intersection Observer API for performant animations",
      ],
      technologies: {
        frontend: ["React", "Redux", "Tailwind CSS", "Framer Motion"],
        tools: ["Git", "Figma", "Lighthouse", "Webpack"],
        deployment: ["Vercel", "GitHub Actions"],
      },
      github: "https://github.com/Falcon-J/Portfolio_2.0",
      live: "https://portfolio-2-0-seven-theta.vercel.app/",
    },
    "travel-trouve": {
      title: "TravelTrouve",
      description:
        "A cross-platform travel photo-sharing platform with real-time categorization and geotagging. TravelTrouve helps travelers discover new destinations and share their experiences with a community of like-minded explorers.",
      image: "/placeholder.svg?height=600&width=1200",
      tags: ["ReactJS", "Node.js", "Firebase", "Firestore", "Agile (Scrum)"],
      features: [
        "Built TravelTrouve, a cross-platform travel photo-sharing platform.",
        "Integrated real-time photo categorization and geotagging, improving content organization efficiency by 60%.",
        "Engineered a collaborative trip-planning feature, allowing users to share itineraries and recommendations, increasing engagement by 35%.",
        "Implemented user authentication and profile management system.",
        "Created a recommendation engine based on user preferences and past interactions.",
      ],
      challenges: [
        "Handling large image uploads and processing efficiently",
        "Implementing accurate location-based services across different devices",
        "Creating a scalable database structure for user-generated content",
      ],
      solutions: [
        "Used cloud functions for image processing and optimization",
        "Implemented a hybrid geolocation system using device GPS and IP-based fallback",
        "Designed a NoSQL database schema optimized for read-heavy operations",
      ],
      technologies: {
        frontend: ["React", "Redux", "Material UI", "Mapbox"],
        backend: ["Node.js", "Express", "Firebase Auth", "Firestore"],
        tools: ["Git", "Jira", "Figma", "Firebase Analytics"],
      },
      github: "https://github.com/omkarjawalikar/traveltrouve",
      live: "https://traveltrouve.vercel.app",
    },
    "url-shortener": {
      title: "URL Shortener",
      description:
        "A URL shortener built with Node.js and Express, featuring a user-friendly interface and analytics.",
      image: "/placeholder.svg?height=600&width=1200",
      tags: ["Node.js", "Express", "Next.js", "MongoDB", "Analytics"],
      features: [
        "Developed a URL shortener using Node.js and Express, reducing link length by 70% on average.",
        "Implemented a user-friendly interface with React, enhancing user experience and engagement.",
        "Integrated analytics to track link performance, providing users with insights on click rates and demographics.",
      ],
      challenges: [
        "Ensuring reliable and unique short URL generation",
        "Handling high traffic and concurrent requests efficiently",
        "Providing real-time analytics without impacting performance",
      ],
      solutions: [
        "Used hash algorithms and collision checks for unique short URLs",
        "Implemented caching and optimized database queries for scalability",
        "Leveraged asynchronous logging and aggregation for analytics",
      ],
      technologies: {
        frontend: ["Next.js", "Tailwind CSS"],
        backend: ["Node.js", "Express", "MongoDB"],
        tools: ["Git", "Postman", "Figma"],
        deployment: ["Vercel"],
      },
      github: "https://github.com/Falcon-J/urlshortner",
      live: "https://url-shortner.vercel.app",
    },
    memojar: {
      title: "MemoJar",
      description:
        "A memory journaling app with secure authentication, real-time database syncing, and a sleek interactive UI.",
      image: "/screenshots/memojar.jpg",
      tags: [
        "React",
        "Firebase",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
      ],
      features: [
        "Built a full-featured journaling app allowing users to create, edit, filter, and delete memories in real time.",
        "Integrated Firebase Authentication for secure sign-in and route protection.",
        "Designed a dynamic UI with a mouse-following gradient and smooth animations using Framer Motion.",
        "Implemented toast notifications and responsive layouts for optimal user experience across devices.",
      ],
      challenges: [
        "Implementing real-time data updates while maintaining UI performance",
        "Designing an engaging UI/UX that feels responsive and modern",
        "Securing user data and managing authentication flow properly",
      ],
      solutions: [
        "Leveraged Firebase Realtime Database to push updates instantly across components",
        "Used Tailwind CSS and Framer Motion for highly responsive and interactive UI",
        "Utilized Firebase Authentication with protected routes to ensure data integrity",
      ],
      technologies: {
        frontend: ["React", "Tailwind CSS", "Framer Motion", "React Router"],
        backend: ["Firebase (Realtime Database & Auth)"],
        tools: ["Git", "VS Code", "Figma"],
        deployment: ["Vercel"], // Update if hosted elsewhere
      },
      github: "https://github.com/Falcon-J/MemoJar.git",
      live: "https://memo-jar.vercel.app/"
    },
  };

  return projects[slug as keyof typeof projects];
};

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectData(params.slug);

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <p className="mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageWrapper>
      <section className="py-20">
        <div className="container">
          <div className="mb-8">
            <Button variant="ghost" className="group" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <FadeIn>
            <h1 className="text-4xl font-bold mb-6 text-navy">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <Badge key={tag} className="bg-navy text-cream">
                  {tag}
                </Badge>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.3} className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-navy">
                    Overview
                  </h2>
                  <p className="text-navy/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-navy">
                    Key Features
                  </h2>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 text-navy/80">
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
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Tabs defaultValue="challenges" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    <TabsTrigger value="solutions">Solutions</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="challenges"
                    className="p-4 border rounded-md mt-2 border-beige"
                  >
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, i) => (
                        <li key={i} className="flex gap-2 text-navy/80">
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
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" x2="12" y1="8" y2="12"></line>
                            <line x1="12" x2="12.01" y1="16" y2="16"></line>
                          </svg>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent
                    value="solutions"
                    className="p-4 border rounded-md mt-2 border-beige"
                  >
                    <ul className="space-y-2">
                      {project.solutions.map((solution, i) => (
                        <li key={i} className="flex gap-2 text-navy/80">
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
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-6">
                <Card className="border-beige">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-navy/70">Role</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy/70">Timeline</span>
                      </div>
                      <div className="pt-4 space-y-2">
                        <Button
                          className="w-full bg-navy text-cream hover:bg-navy/90"
                          asChild
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                        </Button>
                        <Button className="w-full" variant="outline" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" /> View Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-navy">
                    Technologies Used
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-navy mb-2">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.frontend.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-navy text-navy"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-navy mb-2">
                        Tools & Deployment
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies.tools || []).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-navy text-navy"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
    id: 1,
    title: "MemoJar",
    slug: "memojar",
    description:
      "A beautiful and interactive memory journaling app with Firebase integration, secure auth, and real-time updates.",
    image: "/screenshots/memojar.jpg",
    tags: ["React", "Firebase", "Tailwind CSS", "Framer Motion", "React Router"],
    features: [
      "Built a responsive memory journaling app with secure Firebase authentication and real-time database functionality.",
      "Implemented an interactive UI with mouse-following gradients and smooth animations using Framer Motion.",
      "Enabled full CRUD operations on user-generated memories with real-time syncing and tag-based filtering.",
    ],
    github: "https://github.com/Falcon-J/MemoJar.git",
    live: "https://memo-jar.vercel.app/",
},


    {
      id: 2,
      title: "URL Shortener",
      slug: "url-shortener",
      description:
        "A URL shortener built with Node.js and Express, featuring a user-friendly interface and analytics.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Node.js", "Express", "MongoDB", "REST API"],

      features: [
        "Developed a URL shortener using Node.js and Express, reducing link length by 70% on average.",
        "Implemented a user-friendly interface with React, enhancing user experience and engagement.",
        "Integrated analytics to track link performance, providing users with insights on click rates and demographics.",
      ],
      github: "https://github.com/Falcon-J/urlshortner",
      live: "https://url-shortner.vercel.app",
    },
    {
      id: 3,
      title: "TravelTrouve",
      slug: "travel-trouve",
      description:
        "A cross-platform travel photo-sharing platform with real-time categorization and geotagging.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["ReactJS", "Node.js", "Firebase", "Firestore", "Agile (Scrum)"],
      features: [
        "Built TravelTrouve, a cross-platform travel photo-sharing platform.",
        "Integrated real-time photo categorization and geotagging, improving content organization efficiency by 60%.",
        "Engineered a collaborative trip-planning feature, allowing users to share itineraries and recommendations, increasing engagement by 35%.",
      ],
      github: "https://github.com/omkarjawalikar/traveltrouve",
      live: "https://traveltrouve.vercel.app",
    },
  ];

  return (
    <PageWrapper>
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-16 text-center text-[var(--color-secondary)]">
              Projects
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-rows-2 gap-8">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={0.2 + index * 0.1}>
                <Card className="overflow-hidden border-beige hover:shadow-xl transition-all duration-300 group">
                  {/* <div className="h-48 bg-beige relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"></div>
                  </div> */}
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-navy">
                        {project.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-navy hover:bg-beige hover:text-navy"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-navy hover:bg-beige hover:text-navy"
                          asChild
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-navy text-navy"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy/80 mb-4">{project.description}</p>
                    <ul className="space-y-2 text-md text-navy/80">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-2">
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
                    <div className="mt-6">
                      <Button
                        className="w-full bg-navy text-cream hover:bg-navy/90"
                        asChild
                      >
                        <Link href={`/projects/${project.slug}`}>
                          View Project Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

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
import { ArrowRight, BookOpen, Clock } from "lucide-react";

// Data structure for blog articles
interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  link: string;
  platform: string;
  featured: boolean;
}

// Blog data store
const blogData = {
  articles: [
    {
      id: "digital-pet-rl",
      title: "Meet Your Digital Pet: Born with RL",
      category: "AI & Machine Learning",
      date: "8 June 2025",
      readTime: "13 min read",
      excerpt:
        "Explore the fascinating world of AI-powered digital pets and how Reinforcement Learning enables intelligent virtual companions. This article discusses the concepts, challenges, and future possibilities in this emerging field.",
      link: "https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef",
      platform: "Medium",
      featured: true,
    },
  ],
  upcomingTopics: [
    {
      title: "AI & ML Development",
      description: "Building scalable AI solutions and working with LLMs",
    },
    {
      title: "Leadership & Management",
      description: "From core member to director: lessons in team leadership",
    },
    {
      title: "Research & Analytics",
      description: "Financial research and data analysis methodologies",
    },
  ],
};

// Helper functions
const getFeaturedArticle = (): Article | null => {
  return blogData.articles.find((article) => article.featured) || null;
};

const getAllArticles = (): Article[] => {
  return blogData.articles;
};

export default function BlogPage() {
  const featuredArticle = getFeaturedArticle();

  return (
    <PageWrapper backgroundVariant="default">
      <section className="py-20">
        <div className="container max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-portfolio-almost-black">
                Thoughts & Insights
              </h1>
              <p className="text-lg text-portfolio-almost-black/80 max-w-3xl mx-auto">
                Sharing my journey in AI, machine learning, and technology. From
                hands-on projects to leadership experiences, here's where I
                document learnings, insights, and the stories behind the code.
              </p>
            </div>
          </FadeIn>

          {/* Featured Article */}
          {featuredArticle && (
            <FadeIn delay={0.2}>
              <div className="mb-16">
                
                <Card className="overflow-hidden border-portfolio-beige hover:shadow-2xl transition-all duration-500 group max-w-4xl mx-auto bg-portfolio-surface">
                  <div className="p-6 md:p-8 lg:p-12">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-portfolio-navy text-portfolio-cream text-sm px-3 py-1">
                          {featuredArticle.category}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {featuredArticle.platform}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-portfolio-almost-black group-hover:text-portfolio-almost-black/80 transition-colors mb-4">
                        {featuredArticle.title}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-4 text-base text-portfolio-almost-black/70">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredArticle.readTime}
                        </span>
                        <span>{featuredArticle.date}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mb-8">
                      <p className="text-portfolio-almost-black/80 leading-relaxed text-base md:text-lg">
                        {featuredArticle.excerpt}
                      </p>
                    </CardContent>
                    <Button
                      className="w-full sm:w-auto bg-portfolio-navy text-portfolio-cream hover:bg-portfolio-navy/90 transition-all duration-300 transform hover:scale-105 px-8 py-3"
                      asChild
                    >
                      <a
                        href={featuredArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read on {featuredArticle.platform}{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </FadeIn>
          )}

          {/* More Coming Soon Section */}
          <FadeIn delay={0.4}>
            <div className="text-center py-12 md:py-16">
              <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                  <BookOpen className="h-12 w-12 md:h-16 md:w-16 text-portfolio-almost-black/30 mx-auto mb-4" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-portfolio-almost-black mb-4">
                    More Articles Coming Soon
                  </h3>
                  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                  {blogData.upcomingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="p-4 md:p-6 rounded-lg bg-portfolio-surface border border-portfolio-beige"
                    >
                      <h4 className="font-semibold text-portfolio-almost-black mb-2 text-sm md:text-base">
                        {topic.title}
                      </h4>
                      <p className="text-xs md:text-sm text-portfolio-almost-black/70">
                        {topic.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}

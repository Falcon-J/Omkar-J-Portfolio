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

export default function BlogPage() {
const featuredArticle = {
    title: "Meet Your Digital Pet: Born with RL",
    category: "AI & Machine Learning",
    date: "December 2024",
    readTime: "8 min read",
    excerpt:
        "Explore the fascinating world of AI-powered digital pets and how Reinforcement Learning enables intelligent virtual companions. This article discusses the concepts, challenges, and future possibilities in this emerging field.",
    link: "https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef",
};

  return (
    <PageWrapper>
      <section className="py-20">
        <div className="container max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Articles & Insights
              </h1>
              <p className="text-lg text-navy/80 max-w-3xl mx-auto">
                Sharing my journey in AI, machine learning, and technology. From
                hands-on projects to leadership experiences, here's where I
                document learnings, insights, and the stories behind the code.
              </p>
            </div>
          </FadeIn>

          {/* Featured Article */}
          <FadeIn delay={0.2}>
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-navy mb-8 text-center">
                Latest Article
              </h2>
              <Card className="overflow-hidden border-beige hover:shadow-2xl transition-all duration-500 group max-w-4xl mx-auto">
                <div className="p-6 md:p-8 lg:p-12">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-navy text-cream text-sm px-3 py-1">
                        {featuredArticle.category}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Medium
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy group-hover:text-navy/80 transition-colors mb-4">
                      {featuredArticle.title}
                    </CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-4 text-base">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredArticle.readTime}
                      </span>
                      <span>{featuredArticle.date}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 mb-8">
                    <p className="text-navy/80 leading-relaxed text-base md:text-lg">
                      {featuredArticle.excerpt}
                    </p>
                  </CardContent>
                  <Button
                    className="w-full sm:w-auto bg-navy text-cream hover:bg-navy/90 transition-all duration-300 transform hover:scale-105 px-8 py-3"
                    asChild
                  >
                    <a
                      href={featuredArticle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read on Medium <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </FadeIn>

          {/* More Coming Soon Section */}
          <FadeIn delay={0.4}>
            <div className="text-center py-12 md:py-16">
              <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                  <BookOpen className="h-12 w-12 md:h-16 md:w-16 text-navy/30 mx-auto mb-4" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy mb-4">
                    More Articles Coming Soon
                  </h3>
                  <p className="text-base md:text-lg text-navy/70 leading-relaxed max-w-3xl mx-auto">
                    I'm working on more in-depth articles covering my
                    experiences in AI development, financial research,
                    leadership, game development, and event management. Stay
                    tuned for insights from my journey at ForgeAhead Solutions,
                    VIT's Entrepreneurship Cell, and various hackathons.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                  <div className="p-4 md:p-6 rounded-lg bg-cream/30 border border-beige">
                    <h4 className="font-semibold text-navy mb-2 text-sm md:text-base">
                      AI & ML Development
                    </h4>
                    <p className="text-xs md:text-sm text-navy/70">
                      Building scalable AI solutions and working with LLMs
                    </p>
                  </div>
                  <div className="p-4 md:p-6 rounded-lg bg-cream/30 border border-beige">
                    <h4 className="font-semibold text-navy mb-2 text-sm md:text-base">
                      Leadership & Management
                    </h4>
                    <p className="text-xs md:text-sm text-navy/70">
                      From core member to director: lessons in team leadership
                    </p>
                  </div>
                  <div className="p-4 md:p-6 rounded-lg bg-cream/30 border border-beige">
                    <h4 className="font-semibold text-navy mb-2 text-sm md:text-base">
                      Research & Analytics
                    </h4>
                    <p className="text-xs md:text-sm text-navy/70">
                      Financial research and data analysis methodologies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}

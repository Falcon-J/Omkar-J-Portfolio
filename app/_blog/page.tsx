import { PageWrapper } from "@/components/page-wrapper"
import { FadeIn } from "@/components/fade-in"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Building Responsive UIs with Tailwind CSS",
      slug: "building-responsive-uis-with-tailwind",
      category: "Web Development",
      date: "April 15, 2024",
      readTime: "5 min read",
      excerpt:
        "Learn how to create beautiful, responsive user interfaces using Tailwind CSS. This guide covers best practices and advanced techniques.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Getting Started with TensorFlow for Image Recognition",
      slug: "getting-started-with-tensorflow",
      category: "AI",
      date: "March 22, 2024",
      readTime: "8 min read",
      excerpt:
        "A comprehensive guide to implementing image recognition using TensorFlow. Perfect for beginners looking to dive into AI.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "From Idea to Startup: A Student's Journey",
      slug: "from-idea-to-startup",
      category: "Entrepreneurship",
      date: "February 10, 2024",
      readTime: "6 min read",
      excerpt:
        "My personal experience navigating the startup ecosystem as a student. Learn about the challenges, opportunities, and lessons learned.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Optimizing React Applications for Performance",
      slug: "optimizing-react-applications",
      category: "Web Development",
      date: "January 28, 2024",
      readTime: "7 min read",
      excerpt:
        "Discover techniques to improve the performance of your React applications. From code splitting to memoization, this post covers it all.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "The Future of AI in Education",
      slug: "future-of-ai-in-education",
      category: "AI",
      date: "January 5, 2024",
      readTime: "6 min read",
      excerpt:
        "Exploring how artificial intelligence is transforming education systems worldwide. Learn about the benefits, challenges, and ethical considerations.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Building a Personal Brand as a Developer",
      slug: "personal-brand-as-developer",
      category: "Career",
      date: "December 12, 2023",
      readTime: "5 min read",
      excerpt:
        "Tips and strategies for building a strong personal brand in the tech industry. Stand out from the crowd and attract better opportunities.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <PageWrapper>
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-16 text-center text-navy">Blog</h1>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <FadeIn key={post.id} delay={0.2 + index * 0.1}>
                <Card className="overflow-hidden border-beige hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="h-48 bg-beige relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-navy text-cream">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-navy group-hover:text-navy/80 transition-colors">{post.title}</CardTitle>
                    <CardDescription>
                      {post.date} • {post.readTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-navy/80 line-clamp-3 mb-6">{post.excerpt}</p>
                  </CardContent>
                  <div className="px-6 pb-6 mt-auto">
                    <Button className="w-full bg-navy text-cream hover:bg-navy/90" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

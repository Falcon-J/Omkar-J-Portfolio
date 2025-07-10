"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Handle the specific Medium article
    if (params.slug === "meet-your-digital-pet-born-with-rl") {
      window.open(
        "https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef",
        "_blank"
      );
      router.push("/blog");
    }
  }, [params.slug, router]);

  return (
    <PageWrapper>
      <section className="py-20">
        <div className="container max-w-4xl">
          <FadeIn>
            <div className="mb-8">
              <Button variant="ghost" className="mb-4" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>
            </div>

            <div className="text-center py-20">
              <h1 className="text-3xl font-bold mb-4 text-navy">
                Redirecting...
              </h1>
              <p className="text-navy/70 mb-8">
                You're being redirected to the article on Medium.
              </p>
              <Button asChild>
                <a
                  href="https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Article on Medium
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}

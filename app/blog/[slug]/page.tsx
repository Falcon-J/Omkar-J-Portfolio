import { notFound } from "next/navigation";
import Link from "next/link";
import { ChapterHeading } from "@/components/portfolio/chapter";
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (
    slug !== "meet-your-digital-pet-born-with-rl" &&
    slug !== "digital-pet-rl"
  )
    notFound();
  return (
    <div className="chapter">
      <ChapterHeading
        number="05"
        eyebrow="Writing · 8 June 2025"
        title={
          <>
            Meet Your Digital Pet:
            <br />
            <em>Born with RL.</em>
          </>
        }
      >
        <p>
          Reinforcement learning, virtual companions, and the possibilities of a
          digital pet that learns.
        </p>
      </ChapterHeading>
      <a
        className="button primary"
        href="https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read the original on Medium ↗
      </a>
      <Link className="text-button article-back" href="/#now">
        ← Back to Now
      </Link>
    </div>
  );
}

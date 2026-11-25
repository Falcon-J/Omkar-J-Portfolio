import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Companion } from "@/components/portfolio/companion";
export function HomeSection() {
  return (
    <section tabIndex={-1} id="home" data-chapter="home" aria-labelledby="home-heading" className="landing chapter">
      <div className="landing-copy">
        <h1 id="home-heading" className="accent-heading">
          Hi,
          <br className="mobile-only" /> I&apos;m Omkar.
        </h1>
        <p className="landing-subtitle">
          Software engineer at Anarock. I build product interfaces,
          APIs, and systems that recover when things go wrong.
        </p>
        <div className="landing-actions">
          <Link className="button primary" href="/#projects">
            See my work <ArrowRight size={20} />
          </Link>
          <Link className="button secondary" href="/#contact">
            Get in touch
          </Link>
        </div>
      </div>
      <div className="landing-landscape" aria-hidden="true" />
      <Companion className="landing-guide" cat />
    </section>
  );
}

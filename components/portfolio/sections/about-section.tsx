import Image from "next/image";
import { Music2, Car, CircleDot, BookOpen, ArrowRight } from "lucide-react";
import { Companion, Treat } from "@/components/portfolio/companion";
const interests = [
  {
    title: "Music & dance",
    Icon: Music2,
    text: "Martin Garrix and Arijit Singh. Send me a playlist when we talk.",
  },
  {
    title: "Cars",
    Icon: Car,
    text: "Another conversation we can have: cars and the engineering behind them.",
  },
  {
    title: "Sports",
    Icon: CircleDot,
    text: "Badminton, cricket, football. Always up for a game.",
  },
  {
    title: "Stories",
    Icon: BookOpen,
    text: "Fiction and non-fiction. What are you reading?",
  },
];
export function AboutSection() {
  return (
    <section tabIndex={-1} id="about" data-chapter="about" aria-labelledby="about-heading" className="chapter about-chapter">
      <div className="about-intro">
        <div>
          <h2 id="about-heading" className="accent-heading">
            Off the clock.
          </h2>
          <p>
            Based in Bengaluru. Away from code, you&apos;ll find music, dance,
            a game of badminton, or a book. And Stella, keeping me company.
          </p>
        </div>
        <Image
          className="jacket-portrait"
          src="/omkar-jacket.webp"
          width={1000}
          height={750}
          sizes="(max-width: 700px) 200px, 320px"
          alt="Illustrated portrait of Omkar in a black jacket"
        />
      </div>
      <div className="about-interests">
        {interests.map(({ title, Icon, text }) => (
          <details className="interest-card" key={title}>
            <summary>
              <span className="interest-icon">
                <Icon size={34} />
              </span>
              <strong>{title}</strong>
              <ArrowRight size={18} />
            </summary>
            <p>{text}</p>
          </details>
        ))}
      </div>
      <div className="about-bottom">
        <Treat id="about" />
        <Companion className="about-guide" rest="sit" arrival={false} />
      </div>
    </section>
  );
}

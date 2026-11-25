import { Journey } from "@/components/portfolio/journey";
import { Treat } from "@/components/portfolio/companion";
export function JourneySection() {
  return (
    <section tabIndex={-1} id="journey" data-chapter="journey" aria-labelledby="journey-heading" className="chapter journey-chapter">
      <header className="chapter-heading">
        <h2 id="journey-heading" className="accent-heading">
          How I got here.
        </h2>
      </header>
      <Journey />
      <div className="chapter-treat">
        <Treat id="journey" />
      </div>
    </section>
  );
}

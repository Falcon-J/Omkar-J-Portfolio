import Link from "next/link";
import { Workshop } from "@/components/portfolio/workshop";
export default function WorkshopPage() {
  return (
    <section className="chapter workshop-chapter">
      <Link className="back-link" href="/#projects">
        ← Back to projects
      </Link>
      <h1 className="accent-heading">What happens if…?</h1>
      <Workshop />
      <p className="workshop-context">
        A small illustration of idempotency, one of the ideas explored in{" "}
        <a
          href="https://github.com/Falcon-J/AtlasPay"
          target="_blank"
          rel="noopener noreferrer"
        >
          AtlasPay ↗
        </a>
        . This simulation is independent of the project implementation.
      </p>
    </section>
  );
}

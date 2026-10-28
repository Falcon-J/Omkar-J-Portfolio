import { FileText, ArrowRight } from "lucide-react";
import { Treat } from "@/components/portfolio/companion";
export function NowSection() {
  return (
    <section tabIndex={-1} id="now" data-chapter="now" aria-labelledby="now-heading" className="chapter now-chapter">
      <h2 id="now-heading" className="accent-heading">From my notebook.</h2>
      <div className="attention-grid">
        <a className="attention-card lavender" href="https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef" target="_blank" rel="noopener noreferrer">
          <FileText size={28} />
          <span><strong>Meet your digital pet, born with RL</strong><small>Reinforcement learning experiment · 8 June 2025 · Medium</small></span>
          <ArrowRight size={20} />
        </a>
      </div>
      <div className="now-meta"><Treat id="now" /></div>
    </section>
  );
}

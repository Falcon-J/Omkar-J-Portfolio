import type { Metadata } from "next";
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { JournalLoader } from "./journal-loader";
import styles from "./journal.module.css";

export const metadata: Metadata = {
  title: "Omkar Jawalikar | Systems, AI & Everything In Between",
  description: "Software engineer at Anarock. A personal journal of backend systems, AI applications, and the work behind them.",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.journal}>
    <JournalLoader />
    <a href="#journal-content" className={styles.skipLink}>Skip to content</a>
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/design#journal-content" className={styles.brand} aria-label="Omkar Jawalikar home">OJ<span>.</span></a>
        <nav aria-label="Journal navigation" className={styles.navigation}>
          <a href="/design#journal-content">Home</a><a href="/design#selected-work">Work</a><a href="/design#writing">Writing</a><a href="/design#about">About</a>
          <a className={styles.resumeLink} href="/Omkar-Jawalikar-Resume.pdf" download>Résumé <ArrowDownToLine size={14} aria-hidden="true" /></a><ThemeToggle />
        </nav>
      </header>
      <main id="journal-content">{children}</main>
      <footer id="contact" className={styles.footer}>
        <div><p className={styles.kicker}>Let&apos;s connect</p><h2 className={styles.footerTitle}>Have something<br />interesting in mind?</h2></div>
        <div><p className={styles.footerNote}>Open to opportunities, collaborations,<br />and interesting conversations.</p><div className={styles.footerLinks}><a href="mailto:omkarjawalikar04@gmail.com"><Mail size={16} aria-hidden="true" /> Email <ArrowUpRight size={12} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/omkar-jawalikar/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a><a href="https://github.com/Falcon-J" target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a></div></div>
        <p className={styles.handNote}>Build.<br />Learn. Repeat.</p>
      </footer>
      <div className={styles.footerNote}>© {new Date().getFullYear()} Omkar Jawalikar <a href="#journal-content" aria-label="Back to top">↑</a></div>
    </div>
  </div>;
}

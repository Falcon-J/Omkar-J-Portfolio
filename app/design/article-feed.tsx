import Image from "next/image";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { getMediumArticles } from "./medium-feed";
import { ScrollRow } from "./scroll-row";
import styles from "./journal.module.css";

export async function ArticleFeed() {
  const { articles, live } = await getMediumArticles();
  return <>
    <ScrollRow className={styles.articleGrid} label="Articles and posts">
      {articles.map(article => <a className={styles.noteCard} href={article.url} target="_blank" rel="noopener noreferrer" key={article.url}>
        <div className={`${styles.articleCover} ${styles.mediumCover}`} aria-hidden="true">{article.image ? <Image src={article.image} alt="" width={600} height={360} unoptimized /> : <span>M<span>.</span></span>}<span className={styles.platformBadge}>Medium</span></div>
        <div className={styles.noteBody}><p className={styles.kicker}>Medium {article.date && `· ${article.date}`}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span className={styles.textLink}>Read article <ArrowUpRight size={14} aria-hidden="true" /></span></div>
      </a>)}
      <a className={styles.noteCard} href="https://www.linkedin.com/in/omkar-jawalikar/recent-activity/all/" target="_blank" rel="noopener noreferrer">
        <div className={`${styles.articleCover} ${styles.linkedinCover}`} aria-hidden="true"><Linkedin size={46} strokeWidth={1.3} /><span className={styles.platformBadge}>LinkedIn</span></div>
        <div className={styles.noteBody}><p className={styles.kicker}>LinkedIn · Recent activity</p><h3>Latest on LinkedIn</h3><p>Posts, engineering lessons, and conversations. See what I&apos;m sharing now.</p><span className={styles.textLink}>View latest posts <ArrowUpRight size={14} aria-hidden="true" /></span></div>
      </a>
    </ScrollRow>
    <p className={styles.feedStatus}>{live ? "Medium feed refreshes hourly." : "Featured Medium article · "}<a href="https://medium.com/@omkarjawalikar04" target="_blank" rel="noopener noreferrer">{live ? "All stories on Medium ↗" : "See the latest on Medium ↗"}</a></p>
  </>;
}

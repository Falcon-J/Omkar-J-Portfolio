export type MediumArticle = { title: string; url: string; excerpt: string; date: string; image?: string };

export const mediumFallback: MediumArticle = {
  title: "Meet Your Digital Pet: Born with RL",
  url: "https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef",
  excerpt: "Exploring how reinforcement learning can bring a virtual companion to life.",
  date: "8 June 2025",
};

function text(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, entity: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " })[entity] ?? "")
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, code: string) => {
      const point = code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code);
      return point <= 0x10ffff ? String.fromCodePoint(point) : "";
    }).replace(/\s+/g, " ").trim();
}

// Only extract flat fields from Medium's RSS; never render feed HTML or resolve XML entities.
export function parseMediumFeed(xml: string): MediumArticle[] {
  const articles: MediumArticle[] = [];
  for (const item of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/g)) {
    const field = (tag: string) => item[1].match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`))?.[1] ?? "";
    const title = text(field("title"));
    const url = text(field("link"));
    try {
      if (new URL(url).origin !== "https://medium.com" || !title) continue;
    } catch { continue; }
    const content = field("content:encoded") || field("description");
    const paragraph = [...content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(match => text(match[1])).find(value => value.length > 40) || text(content);
    const excerpt = paragraph.length > 180 ? `${paragraph.slice(0, 180).replace(/\s+\S*$/, "")}…` : paragraph;
    const rawImage = content.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1];
    let image: string | undefined;
    if (rawImage) {
      try {
        const parsed = new URL(text(rawImage));
        if (parsed.protocol === "https:" && (parsed.hostname === "miro.medium.com" || /^cdn-images-\d+\.medium\.com$/.test(parsed.hostname))) image = parsed.href;
      } catch { /* The card works without a cover image. */ }
    }
    const published = new Date(text(field("pubDate")));
    const date = Number.isNaN(published.getTime()) ? "" : published.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    articles.push({ title, url, excerpt, date, ...(image ? { image } : {}) });
    if (articles.length === 3) break;
  }
  return articles;
}

export async function getMediumArticles(): Promise<{ articles: MediumArticle[]; live: boolean }> {
  try {
    const response = await fetch("https://medium.com/feed/@omkarjawalikar04", {
      next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error("Medium feed unavailable");
    const articles = parseMediumFeed((await response.text()).slice(0, 1_000_000));
    if (articles.length) return { articles, live: true };
  } catch { /* Keep a real article available when Medium cannot be reached. */ }
  return { articles: [mediumFallback], live: false };
}

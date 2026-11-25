export const site = {
  name: "Omkar Jawalikar",
  title: "Omkar Jawalikar | Software Engineer",
  description:
    "Software engineer focused on backend systems and production AI. I build backend-heavy AI products, agentic systems, and full-stack prototypes for real-world workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://omkar-j-portfolio.vercel.app",
  github: "https://github.com/Falcon-J",
  linkedin: "https://www.linkedin.com/in/omkar-jawalikar/",
  medium: "https://medium.com/@omkarjawalikar04",
} as const;

export const routes = ["", "/about", "/skills", "/projects", "/experience", "/blog", "/contact"] as const;

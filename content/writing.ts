export type Article = {
  title: string;
  url: string;
  date: string;
  readTime: string;
  platform: string;
  excerpt: string;
};

export const articles: Article[] = [
  {
    title: "Meet Your Digital Pet: Born with RL",
    url: "https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef",
    date: "2025-06-08",
    readTime: "13 min read",
    platform: "Medium",
    excerpt:
      "How reinforcement learning can give a virtual pet believable behaviour: the concepts, the training loop, the challenges, and where AI companions could go next.",
  },
];

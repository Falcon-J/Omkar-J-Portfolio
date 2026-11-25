import type { Metadata } from "next";
import SkillsPage from "@/components/pages/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Languages, frameworks, AI tooling, cloud and databases Omkar Jawalikar works with.",
  alternates: { canonical: "/skills" },
};

export default function Page() {
  return <SkillsPage />;
}

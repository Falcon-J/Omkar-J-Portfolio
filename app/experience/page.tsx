import type { Metadata } from "next";
import ExperiencePage from "@/components/pages/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Software engineering internships, leadership roles and work history of Omkar Jawalikar.",
  alternates: { canonical: "/experience" },
};

export default function Page() {
  return <ExperiencePage />;
}

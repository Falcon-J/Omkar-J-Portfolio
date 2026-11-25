import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Backend, AI and full-stack projects built by Omkar Jawalikar, with source code and live demos.",
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return <ProjectsPage />;
}

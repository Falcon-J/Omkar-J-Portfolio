import type { Metadata } from "next";
import AboutPage from "@/components/pages/about";

export const metadata: Metadata = {
  title: "About",
  description: "Background, education, certifications and engineering approach of Omkar Jawalikar.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}

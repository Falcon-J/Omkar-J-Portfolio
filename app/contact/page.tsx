import type { Metadata } from "next";
import ContactPage from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Omkar Jawalikar about roles, projects or collaboration.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}

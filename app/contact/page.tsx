import type { Metadata } from "next";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Omkar Jawalikar about roles, projects or collaboration.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/omkar-jawalikar", href: profile.links.linkedin },
  { icon: Github, label: "GitHub", value: "Falcon-J", href: profile.links.github },
  { icon: FileText, label: "Résumé", value: "View PDF", href: profile.resume },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        description="Roles, collaborations or a question about something I've built. Send a note and I'll get back to you."
      />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_320px]">
        <Card className="relative p-6 md:p-8">
          <h2 className="mb-6 text-h2 text-text">Send a message</h2>
          <ContactForm />
        </Card>
        <aside aria-labelledby="channels-title">
          <h2 id="channels-title" className="mb-4 text-h3 text-text">
            Or reach me directly
          </h2>
          <ul className="space-y-2">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-14 items-center gap-3 rounded border border-border bg-surface px-4 py-2 transition-colors hover:border-primary/50"
                  >
                    <Icon aria-hidden className="h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-xs text-text-muted">{label}</span>
                      <span className="block truncate text-sm font-medium text-text">{value}</span>
                    </span>
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      </Container>
    </>
  );
}

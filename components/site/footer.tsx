import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { profile } from "@/content/profile";

const updated = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-3 py-8 text-sm text-text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · Updated {updated}
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}

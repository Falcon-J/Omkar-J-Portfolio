import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-h1 text-text">This page doesn&apos;t exist</h1>
      <p className="mx-auto mt-3 max-w-prose text-text-muted">The link may be old, or the page has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          See projects
        </ButtonLink>
      </div>
    </Container>
  );
}

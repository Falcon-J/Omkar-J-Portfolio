import Link from "next/link";
export function ChapterSwitch({
  current,
}: {
  current: "journey" | "projects";
}) {
  return (
    <nav className="chapter-switch" aria-label="Journey and projects">
      <Link
        href="/#journey"
        aria-current={current === "journey" ? "page" : undefined}
      >
        Journey
      </Link>
      <Link
        href="/#projects"
        aria-current={current === "projects" ? "page" : undefined}
      >
        Projects
      </Link>
    </nav>
  );
}

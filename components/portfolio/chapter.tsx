import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function ChapterHeading({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="chapter-heading">
      <p className="eyebrow">
        <span>{number} / 06</span>
        {eyebrow}
      </p>
      <h1>{title}</h1>
      {children && <div className="chapter-intro">{children}</div>}
    </header>
  );
}
export function NextChapter({
  href,
  title,
  label = "Up next",
}: {
  href: string;
  title: string;
  label?: string;
}) {
  return (
    <Link className="next-chapter" href={href}>
      <span>{label}</span>
      <strong>{title}</strong>
      <ArrowUpRight size={30} />
    </Link>
  );
}

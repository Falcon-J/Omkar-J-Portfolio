import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary/90 shadow-sm",
  secondary: "border border-border bg-surface text-text hover:border-primary/50 hover:text-primary",
  ghost: "text-text hover:bg-surface-muted",
};
const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

/** Renders a link styled as a button. External links open in a new tab and say so to screen readers. */
export function ButtonLink({
  href,
  external,
  variant,
  size,
  className,
  children,
}: CommonProps & { href: string; external?: boolean }) {
  const cls = buttonClass(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

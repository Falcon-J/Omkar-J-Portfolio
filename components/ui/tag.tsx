import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-surface-muted px-2 py-1 font-mono text-[0.8125rem] leading-none tracking-[0.02em] text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

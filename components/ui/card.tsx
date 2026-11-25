import { cn } from "@/lib/utils";

export function Card({ className, children, as: Tag = "div" }: { className?: string; children: React.ReactNode; as?: "div" | "article" | "li" }) {
  return (
    <Tag
      className={cn(
        "rounded border border-border bg-surface p-6 shadow-sm transition-[box-shadow,border-color] duration-150 ease-out",
        className
      )}
    >
      {children}
    </Tag>
  );
}

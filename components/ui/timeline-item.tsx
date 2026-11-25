import type { Role } from "@/content/experience";

export function Timeline({ roles, compact = false }: { roles: Role[]; compact?: boolean }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6 md:pl-8">
      {roles.map((role, i) => (
        <li key={`${role.org}-${role.title}`} className="reveal relative">
          <span
            aria-hidden
            className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-bg md:-left-[39px] ${
              i === 0 && role.end === "Present" ? "bg-accent" : "bg-primary"
            }`}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-h3 text-text">
              {role.title} <span className="font-normal text-text-muted">· {role.org}</span>
            </h3>
            <p className="font-mono text-[0.8125rem] text-text-muted">
              <time>{role.start}</time> – <time>{role.end}</time>
            </p>
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-text-muted marker:text-border">
            {(compact ? role.bullets.slice(0, 2) : role.bullets).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

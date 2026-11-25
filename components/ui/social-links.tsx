import { Github, Linkedin, Mail, PenLine } from "lucide-react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const items = [
  { label: "GitHub", href: profile.links.github, icon: Github },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "Medium", href: profile.links.medium, icon: PenLine },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function SocialLinks({ showLabels = false, className }: { showLabels?: boolean; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {items.map(({ label, href, icon: Icon }) => {
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={showLabels ? undefined : `${label}${external ? " (opens in a new tab)" : ""}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded px-2.5 text-sm text-text-muted transition-colors hover:bg-surface-muted hover:text-primary"
            >
              <Icon aria-hidden className="h-5 w-5" />
              {showLabels && <span>{label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

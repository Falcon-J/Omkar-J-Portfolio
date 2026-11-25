"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "./theme-toggle";
import { nav } from "./nav";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center rounded px-3 text-sm font-medium transition-colors",
      active ? "text-primary" : "text-text-muted hover:text-text"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-h-11 items-center rounded font-semibold tracking-tight text-text">
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={linkCls(active)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("secondary", "sm", "hidden sm:inline-flex")}
          >
            <FileText aria-hidden className="h-4 w-4" /> Résumé
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded text-text md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-bg md:hidden">
          <Container className="py-3">
            <ul className="grid gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center rounded px-3 text-base font-medium",
                        active ? "bg-primary/10 text-primary" : "text-text hover:bg-surface-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-2 rounded px-3 text-base font-medium text-text hover:bg-surface-muted"
                >
                  <FileText aria-hidden className="h-4 w-4" /> Résumé
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}

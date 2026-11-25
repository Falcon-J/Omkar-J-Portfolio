"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SimpleThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
] as const;

function isActivePath(pathname: string, path: string) {
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

function DesktopNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative rounded-lg px-3 py-2 text-base transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        active
          ? "font-bold text-[var(--color-secondary)]"
          : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 transition-all duration-300",
          active
            ? "w-4/5 bg-[var(--color-secondary)]"
            : "w-0 bg-[var(--color-primary)] group-hover:w-4/5"
        )}
      />
    </Link>
  );
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nextVisible = !(currentScrollY > lastScrollY.current && currentScrollY > 50);
      lastScrollY.current = currentScrollY;
      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transform transition-transform duration-300 ease-in-out",
        isVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        "backdrop-blur-md bg-white/30 dark:bg-neutral-900/30 shadow-md border-b border-white/20 dark:border-neutral-800"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-[var(--color-secondary)] md:hidden">
          Omkar Jawalikar
        </Link>

        <nav aria-label="Main" className="hidden md:flex gap-2 mx-auto">
          {navItems.map((item) => (
            <DesktopNavLink key={item.path} href={item.path} active={isActivePath(pathname, item.path)}>
              {item.name}
            </DesktopNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SimpleThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[var(--color-secondary)]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="absolute left-0 top-full z-50 w-full bg-white dark:bg-neutral-900 shadow-lg md:hidden">
          <nav
            aria-label="Mobile"
            className="container flex flex-wrap justify-center gap-4 border-b border-white/20 py-4 dark:border-neutral-700"
          >
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg border-2 px-4 py-2 text-base font-medium transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                    active
                      ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 font-semibold text-[var(--color-secondary)] dark:bg-[var(--color-primary)]/20"
                      : "border-transparent text-[var(--color-text)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] dark:hover:bg-[var(--color-primary)]/20"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

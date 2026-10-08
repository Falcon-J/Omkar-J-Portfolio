"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SimpleThemeToggle } from "@/components/theme-toggle";

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "About", href: "/about" },
  { name: "Writing", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e7ec] bg-[#fafaf8]/95 text-[#172033] backdrop-blur-xl dark:border-[#293342] dark:bg-[#0d121b]/95 dark:text-[#f2f4fa]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-6 md:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="text-lg font-bold tracking-[-0.045em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416ad5]">
          Omkar<span className="text-[#416ad5]">.</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}
              className={"text-sm font-medium transition-colors hover:text-[#416ad5] " + (pathname === link.href ? "text-[#3458ac] dark:text-[#a1baff]" : "text-[#606c7f] dark:text-[#aeb9c9]")}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SimpleThemeToggle />
          <Link href="/contact" className="hidden min-h-10 items-center gap-1.5 rounded-full border border-[#cdd2da] px-4 text-sm font-semibold transition-colors hover:border-[#416ad5] dark:border-[#475264] dark:hover:border-[#8eaffd] sm:inline-flex">
            Contact <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d5dae3] dark:border-[#475264] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#e5e7ec] px-6 pb-5 pt-3 dark:border-[#293342] md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-[#e9edf5] dark:hover:bg-[#253146]">
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#3458ac] dark:text-[#a1baff]">Contact ↗</Link>
        </nav>
      )}
    </header>
  );
}

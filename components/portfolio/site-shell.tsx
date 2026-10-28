"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Cat,
  Menu,
  X,
  Moon,
  Sun,
  ArrowUpRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useVisit } from "./visit-provider";
import { SurpriseControl } from "./surprise";
const chapters = [
  ["home", "Home"],
  ["about", "About"],
  ["journey", "Journey"],
  ["projects", "Projects"],
  ["now", "Notebook"],
  ["contact", "Contact"],
];
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { state, dispatch } = useVisit();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const pendingAnchor = useRef<string | null>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setMenu(false);
    const id = pendingAnchor.current;
    const target = id ? document.getElementById(id) : null;
    if (target) {
      pendingAnchor.current = null;
      target.focus({ preventScroll: true });
    }
  }, [pathname]);
  if (pathname === "/" || pathname.startsWith("/design")) return <>{children}</>;
  const links = chapters.map(([id, title], index) => (
    <Link
      key={id}
      href={`/#${id}`}
      aria-current={
        (id === "projects" && pathname.startsWith("/projects/"))
          ? "location" : undefined
      }
      onClick={() => {
        if (menu) pendingAnchor.current = id;
        setMenu(false);
      }}
    >
      <span className="nav-number">0{index + 1}</span>
      {title}
    </Link>
  ));
  return (
    <div className={`portfolio ${pathname === "/" ? "is-landing" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <span className="pencil-cat" role="img" aria-label="Stella, a pencil-style cat">
          <Cat size={42} strokeWidth={1.25} aria-hidden="true" />
        </span>
        <nav className="desktop-nav" aria-label="Chapters">
          {links}
        </nav>
        <div className="header-actions">
          <a
            className="resume-link"
            href="/Omkar-Jawalikar-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <ArrowUpRight size={15} />
          </a>
          <button
            className="icon-button"
            aria-label={
              mounted && resolvedTheme === "dark"
                ? "Use light theme"
                : "Use dark theme"
            }
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
          </button>
          <button
            className="header-guide-toggle"
            onClick={() => dispatch({ type: "toggle-guide" })}
            aria-pressed={state.guideHidden}
          >
            {state.guideHidden ? <Eye size={16} /> : <EyeOff size={16} />}
            <span>{state.guideHidden ? "Show guide" : "Hide guide"}</span>
          </button>
          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Trigger asChild>
              <button
                className="icon-button mobile-menu-trigger"
                aria-label="Open menu"
              >
                <Menu size={23} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="portfolio-overlay" />
              <Dialog.Content
                className="portfolio-dialog mobile-menu"
                onCloseAutoFocus={(event) => {
                  const id = pendingAnchor.current;
                  if (!id) return;
                  const target = document.getElementById(id);
                  if (!target) return;
                  pendingAnchor.current = null;
                  event.preventDefault();
                  target.focus({ preventScroll: true });
                }}
              >
                <Dialog.Title>Explore the page.</Dialog.Title>
                <Dialog.Description>
                  Take the scenic route, or go straight to the work.
                </Dialog.Description>
                <nav aria-label="Mobile chapters">{links}</nav>
                <a
                  className="text-button"
                  href="/Omkar-Jawalikar-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Résumé <ArrowUpRight size={15} />
                </a>
                <button
                  className="text-button"
                  onClick={() => dispatch({ type: "toggle-guide" })}
                >
                  {state.guideHidden ? "Show guide" : "Hide guide"}
                </button>
                <Dialog.Close className="dialog-close" aria-label="Close menu">
                  <X size={22} />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
      <div className="visit-badge">
        <SurpriseControl />
      </div>
      <motion.main
        key={pathname}
        id="main-content"
        tabIndex={-1}
        initial={reduced ? false : { opacity: 0.7, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.22 }}
      >
        {children}
      </motion.main>
      <footer className="site-footer">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Omkar Jawalikar</p>

          <span>Built with curiosity. And a cat.</span>
        </div>
      </footer>
    </div>
  );
}

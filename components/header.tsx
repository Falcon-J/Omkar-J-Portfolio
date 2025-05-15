"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 5);

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down - hide header
      } else {
        setIsVisible(true); // Scrolling up - show header
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset visibility when route changes
  useEffect(() => {
    setIsVisible(true);
  }, [pathname]);

  // Handle navigation state
  useEffect(() => {
    // Clear loading state when pathname changes (navigation completes)
    setIsNavigating(false);

    return () => {
      // Clean up event listeners
    };
  }, [pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    // { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Custom Link component that triggers navigation state
  const NavLink: React.FC<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ href, children, className }) => {
    return (
      <Link
        href={href}
        className={className}
        onClick={() => setIsNavigating(true)}
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[var(--color-light)] shadow-sm backdrop-blur"
          : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-center">
        {/* <Link
          href="/"
          className="font-bold text-xl text-[var(--color-secondary)]"
        >
          Omkar Jawalikar
        </Link> */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              href={item.path}
              className={cn(
                "text-md font-normal transition-colors",
                isActive(item.path)
                  ? "text-[var(--color-secondary)] font-bold "
                  : "relative hover:text-[var(--color-primary)] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-[var(--color-primary)] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute after:bg-[var(--color-primary)] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Navigation indicator */}
        {isNavigating && (
          <div className="absolute right-4 flex items-center gap-2">
            <Loader size="sm" variant="primary" />
            <span className="text-sm text-[var(--color-secondary)]/70">
              Loading...
            </span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[var(--color-secondary)] "
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-cream md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="font-bold text-xl text-[var(--color-secondary)]"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsNavigating(true);
              }}
            >
              Omkar Jawalikar
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-[var(--color-secondary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container mt-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-lg font-medium py-2 transition-colors",
                  isActive(item.path)
                    ? "text-[var(--color-secondary)] font-semibold"
                    : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                )}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsNavigating(true);
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

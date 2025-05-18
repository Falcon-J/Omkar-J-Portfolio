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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 5);
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setIsNavigating(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

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
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formattedDateTime = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transform transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        "backdrop-blur-md bg-white/30 dark:bg-neutral-900/30 shadow-md border-b border-white/20 dark:border-neutral-800"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Brand or Logo (optional) */}
        <div className=" font-bold text-[var(--color-secondary)] md:hidden">
          {formattedDateTime}
        </div>

        {/* Centered Horizontal Navbar */}
        <nav className="hidden md:flex gap-6 mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              href={item.path}
              className={cn(
                "text-md font-normal transition-colors",
                isActive(item.path)
                  ? "text-[var(--color-secondary)] font-bold"
                  : "relative hover:text-[var(--color-primary)] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-[var(--color-primary)] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute after:bg-[var(--color-primary)] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle (Right Aligned) */}
        <div className="flex items-center gap-2">
          {isNavigating && (
            <div className="hidden md:flex items-center gap-2">
              <Loader size="sm" variant="primary" />
              <span className="text-sm text-[var(--color-secondary)]/70">
                Loading...
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[var(--color-secondary)]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu (Horizontal Navbar) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-lg md:hidden ">
          {/* Close Button */}
          <div className="container flex h-16 items-center justify-between">
            <div className="flex-grow"></div>{" "}
            {/* spacer to push button to right */}
            <Button
              variant="ghost"
              size="icon"
              className=" text-[var(--color-secondary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          {/* Horizontal Nav Items */}
          <nav className="container bg-white backdrop-blur-lg flex flex-wrap justify-center gap-4 shadow-md border-b border-white/20 dark:border-neutral-800 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-base font-medium px-4 rounded transition-colors border-2",
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

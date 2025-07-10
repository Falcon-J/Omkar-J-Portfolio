"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SimpleThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);
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
    setClickedButton(null);
  }, [pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Blog", path: "/blog" },
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
    itemName: string;
  }> = ({ href, children, className, itemName }) => {
    const isClicked = clickedButton === itemName;
    const isCurrentActive = isActive(href);

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          animate={
            isClicked
              ? {
                  backgroundColor: [
                    "transparent",
                    "#ff111110",
                    "#ff111120",
                    "transparent",
                  ],
                  scale: [1, 0.95, 1.02, 1],
                }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className={cn(
            "relative px-3 py-2 rounded-lg transition-all duration-200",
            isClicked && "bg-[#ff1111]/10"
          )}
        >
          <Link
            href={href}
            className={cn(
              "block text-md font-normal transition-all duration-200",
              isCurrentActive
                ? "text-[var(--color-secondary)] font-bold"
                : cn(
                    "text-[var(--color-secondary)]/80 hover:text-[var(--color-primary)]",
                    isClicked && "text-[var(--color-primary)] font-medium"
                  ),
              className
            )}
            onClick={() => {
              setClickedButton(itemName);
              setTimeout(() => setClickedButton(null), 600);
            }}
          >
            {children}
          </Link>

          {/* Animated underline for non-active items */}
          {!isCurrentActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 h-0.5 bg-[var(--color-primary)]"
              initial={{ width: 0, x: "-50%" }}
              animate={
                isClicked
                  ? {
                      width: ["0%", "80%", "0%"],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Active indicator */}
          {isCurrentActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 h-0.5 bg-[var(--color-secondary)]"
              initial={{ width: "80%", x: "-50%" }}
              animate={
                isClicked
                  ? {
                      backgroundColor: [
                        "var(--color-secondary)",
                        "var(--color-primary)",
                        "var(--color-secondary)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.div>
      </motion.div>
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
        <nav className="hidden md:flex gap-2 mx-auto">
          {navItems.map((item) => (
            <NavLink key={item.path} href={item.path} itemName={item.name}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle and Theme Toggle (Right Aligned) */}
        <div className="flex items-center gap-2">
          <SimpleThemeToggle />
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
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={
                    clickedButton === item.name
                      ? {
                          backgroundColor: [
                            "transparent",
                            "#ff111110",
                            "#ff111120",
                            "transparent",
                          ],
                          scale: [1, 0.95, 1.02, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className={cn(
                    "rounded-lg transition-all duration-200",
                    clickedButton === item.name && "bg-[#ff1111]/10"
                  )}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "block text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 border-2 border-transparent",
                      isActive(item.path)
                        ? "text-[var(--color-secondary)] font-semibold bg-[#ff1111]/5 border-[#ff1111]/20"
                        : cn(
                            "text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[#ff1111]/5",
                            clickedButton === item.name &&
                              "text-[var(--color-primary)] bg-[#ff1111]/10 border-[#ff1111]/20"
                          )
                    )}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setClickedButton(item.name);
                      setTimeout(() => setClickedButton(null), 600);
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

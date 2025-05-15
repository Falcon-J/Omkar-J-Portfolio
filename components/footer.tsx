import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-6  bg-transparent"
    
    >
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-[var(--color-secondary)]">
              © {new Date().getFullYear()} Omkar Jawalikar. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://linkedin.com/in/omkar-jawalikar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </Link>
            <Link
              href="https://github.com/Falcon-J"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href="mailto:omkarjawalikar04@gmail.com">
              <div className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

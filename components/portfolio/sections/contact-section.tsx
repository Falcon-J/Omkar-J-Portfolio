import { Mail, Linkedin, Github, FileText, ArrowRight } from "lucide-react";
import { Companion } from "@/components/portfolio/companion";
import { ContactForm } from "@/components/portfolio/contact-form";
const contacts = [
  { title: "Email me", href: "mailto:omkarjawalikar04@gmail.com", Icon: Mail },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/omkar-jawalikar/",
    Icon: Linkedin,
  },
  { title: "GitHub", href: "https://github.com/Falcon-J", Icon: Github },
  { title: "Resume", href: "/Omkar-Jawalikar-Resume.pdf", Icon: FileText },
];
export function ContactSection() {
  return (
    <section tabIndex={-1} id="contact" data-chapter="contact" aria-labelledby="contact-heading" className="chapter contact-chapter">
      <h2 id="contact-heading" className="accent-heading">Let&apos;s talk.</h2>
      <p className="contact-subtitle">
        About a project, an idea, or a playlist.
      </p>
      <div className="contact-body">
        <div className="contact-cards">
          {contacts.map(({ title, href, Icon }) => (
            <a
              key={title}
              className="contact-card"
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              <Icon size={35} />
              <span>
                {title}
                <ArrowRight size={18} />
              </span>
            </a>
          ))}
        </div>
        <Companion className="contact-guide" cat />
      </div>
      <details className="contact-form-disclosure">
        <summary>
          Prefer to leave a note here? <ArrowRight size={17} />
        </summary>
        <ContactForm />
      </details>
    </section>
  );
}

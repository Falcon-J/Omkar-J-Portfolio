"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { FadeIn } from "@/components/fade-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getThemeStyle } from "@/lib/theme-utils";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        setStatus("Failed to send message. Try again.");
      }
    } catch (error) {
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper backgroundVariant="animated">
      <section className="py-20 relative z-0">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeIn>
            <h1
              className={cn(
                "text-5xl font-bold mb-4 text-center",
                getThemeStyle("heading")
              )}
            >
              Get In Touch
            </h1>
            <p
              className={cn(
                "text-center text-lg mb-16 max-w-2xl mx-auto",
                getThemeStyle("subheading")
              )}
            >
              Have a question or want to work together? I'd love to hear from
              you.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div
                className={cn(
                  "space-y-8 rounded-xl p-8 shadow-lg h-full flex flex-col",
                  getThemeStyle("card")
                )}
              >
                <h2
                  className={cn(
                    "text-2xl font-semibold mb-8",
                    getThemeStyle("heading")
                  )}
                >
                  Contact Information
                </h2>

                <div className="flex-1 space-y-6">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+91 9987895906",
                      href: "tel:+919987895906",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "omkarjawalikar04@gmail.com",
                      href: "mailto:omkarjawalikar04@gmail.com",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "linkedin.com/in/omkar-jawalikar",
                      href: "https://linkedin.com/in/omkar-jawalikar",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "github.com/Falcon-J",
                      href: "https://github.com/Falcon-J",
                    },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-6 p-4 rounded-xl transition-colors group",
                        getThemeStyle("cardHover")
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
                          "bg-portfolio-navy text-portfolio-cream"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            getThemeStyle("muted")
                          )}
                        >
                          {item.label}
                        </p>
                        <p
                          className={cn(
                            "font-medium",
                            getThemeStyle("heading")
                          )}
                        >
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.4}>
              <Card
                className={cn(
                  "shadow-lg h-full flex flex-col",
                  getThemeStyle("card")
                )}
              >
                <CardHeader className="space-y-1">
                  <CardTitle
                    className={cn(
                      "text-2xl font-semibold",
                      getThemeStyle("heading")
                    )}
                  >
                    Send Me a Message
                  </CardTitle>
                  <CardDescription className={getThemeStyle("subheading")}>
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <form
                    className="space-y-6 h-full flex flex-col"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className={cn(
                            "font-medium",
                            getThemeStyle("heading")
                          )}
                        >
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your Name"
                          className={getThemeStyle("input")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className={cn(
                            "font-medium",
                            getThemeStyle("heading")
                          )}
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="Your Email"
                          className={getThemeStyle("input")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className={cn("font-medium", getThemeStyle("heading"))}
                      >
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                        className={getThemeStyle("input")}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label
                        htmlFor="message"
                        className={cn("font-medium", getThemeStyle("heading"))}
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        required
                        className={cn(
                          "resize-none h-32",
                          getThemeStyle("input")
                        )}
                      />
                    </div>
                    <div className="space-y-4 mt-auto">
                      <Button
                        type="submit"
                        disabled={loading}
                        className={cn(
                          "w-full transition-colors duration-300",
                          getThemeStyle("primaryButton")
                        )}
                      >
                        {loading ? (
                          "Sending..."
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="h-4 w-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                      {status && (
                        <div
                          className={`text-center p-3 rounded-lg ${
                            status.includes("success")
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          }`}
                        >
                          {status}
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

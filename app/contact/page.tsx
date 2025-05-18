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
    <PageWrapper>
      <section className="py-20 relative z-0">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-16 text-center text-[var(--color-secondary)]">
              Get In Touch
            </h1>
          </FadeIn>

          <div className="MainGrid grid md:grid-cols-2 gap-12 ">
            {/* Contact Info */}
            <FadeIn
              delay={0.2}
              className="flex flex-col justify-center border-2 border-[var(--color-primary)]/80 rounded-lg p-8 bg-[var(--color-light)]/80 shadow-lg"
            >
              <div className="space-y-8 justify-center flex items-center">
                <div className="space-y-8">
                  <div className="Phone flex items-center gap-8">
                    <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center hover:bg-blue-350/30">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-navy/70">Phone</p>
                      <p className="font-medium text-navy">+91 9987895906</p>
                    </div>
                  </div>
                  <div className="Mail flex items-center gap-8">
                    <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center hover:bg-blue-350/30">
                      <Mail className="h-5 w-5 text-white " />
                    </div>
                    <div>
                      <p className="text-sm text-navy/70">Email</p>
                      <p className="font-medium text-navy">
                        omkarjawalikar04@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="Linkedin flex items-center gap-8">
                    <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center hover:bg-blue-350/30">
                      <Linkedin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-navy/70">LinkedIn</p>
                      <p className="font-medium text-navy">
                        linkedin.com/in/omkar-jawalikar
                      </p>
                    </div>
                  </div>
                  <div className="Github flex items-center gap-8">
                    <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center hover:bg-blue-350/30">
                      <Github className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-navy/70">GitHub</p>
                      <p className="font-medium text-navy">
                        github.com/omkarjawalikar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.4}>
              <Card className="border-beige bg-[var(--color-light)] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-navy">Send Me a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-navy">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-navy">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-navy">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-navy">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        required
                        className="resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-navy text-cream hover:bg-navy/90"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                    {status && (
                      <p className="text-center text-navy mt-4">{status}</p>
                    )}
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

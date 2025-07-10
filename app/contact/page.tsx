"use client";

import { useState, useRef, useEffect } from "react";
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

const drawHexagon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) => {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const xPoint = x + size * Math.cos(angle);
    const yPoint = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(xPoint, yPoint);
    else ctx.lineTo(xPoint, yPoint);
  }
  ctx.closePath();
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Add the hexagon pattern animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.001;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hexSize = 20;
      const cols = Math.ceil(canvas.width / (hexSize * 2)) + 2;
      const rows = Math.ceil(canvas.height / (hexSize * 1.7)) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * hexSize * 2 + (j % 2 === 0 ? 0 : hexSize);
          const y = j * hexSize * 1.7;

          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
              Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );

          const opacity = Math.sin(time + distanceFromCenter * 5) * 0.03 + 0.03;

          ctx.strokeStyle = `rgba(2, 32, 71, ${opacity})`;
          ctx.lineWidth = 1;

          drawHexagon(ctx, x, y, hexSize);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ opacity: 0.7 }}
      />

      <section className="py-20 relative z-0">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeIn>
            <h1 className="text-5xl font-bold mb-4 text-center text-navy">
              Get In Touch
            </h1>
            <p className="text-center text-navy/70 text-lg mb-16 max-w-2xl mx-auto">
              Have a question or want to work together? I'd love to hear from
              you.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-8 rounded-2xl border border-navy/10 bg-white/80 backdrop-blur-sm p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-navy mb-8">
                  Contact Information
                </h2>

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
                    value: "github.com/omkarjawalikar",
                    href: "https://github.com/Falcon-J",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-navy/5 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5 text-cream" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy/60">
                        {item.label}
                      </p>
                      <p className="font-medium text-navy">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.4}>
              <Card className="border border-navy/10 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-semibold text-navy">
                    Send Me a Message
                  </CardTitle>
                  <CardDescription className="text-navy/70">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-navy font-medium">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your Name"
                          className="border-navy/20 focus:border-navy focus:ring-navy"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-navy font-medium"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="Your Email"
                          className="border-navy/20 focus:border-navy focus:ring-navy"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-navy font-medium"
                      >
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                        className="border-navy/20 focus:border-navy focus:ring-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-navy font-medium"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        required
                        className="resize-none border-navy/20 focus:border-navy focus:ring-navy"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-navy text-cream hover:bg-navy/90 transition-colors duration-300"
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
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {status}
                      </div>
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

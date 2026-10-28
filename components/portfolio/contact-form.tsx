"use client";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { deliveryConfirmed } from "@/lib/contact-response";
export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const inFlight = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setStatus("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !deliveryConfirmed(result))
        throw new Error("Delivery was not confirmed");
      setStatus("Message sent. Thanks for reaching out!");
      form.reset();
    } catch {
      setStatus(
        "Delivery could not be confirmed. Your message is still here; you can retry or email me directly.",
      );
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setSending(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} aria-label="Send Omkar a message" aria-describedby="contact-form-requirements" aria-busy={sending}>
      <h2>Leave a note.</h2>
      <p className="form-requirements" id="contact-form-requirements">All fields are required.</p>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            disabled={sending}
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            disabled={sending}
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Subject
        <input name="subject" disabled={sending} required maxLength={200} />
      </label>
      <label>
        Your message
        <textarea
          name="message"
          rows={5}
          disabled={sending}
          required
          maxLength={5000}
        />
      </label>
      <div className="form-submit">
        <button className="button primary" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
          <ArrowUpRight size={17} />
        </button>
        <span>No mailing list. Just a conversation.</span>
      </div>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

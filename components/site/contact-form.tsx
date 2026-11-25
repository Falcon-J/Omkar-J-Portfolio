"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

const fieldCls =
  "w-full rounded border border-border bg-bg px-3.5 py-2.5 text-base text-text placeholder:text-text-muted/70 transition-colors focus:border-primary aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        form.reset();
        setStatus({ kind: "ok" });
      } else {
        setStatus({ kind: "error", message: result.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name">
          <input id="name" name="name" autoComplete="name" required maxLength={100} className={fieldCls} />
        </Field>
        <Field id="email" label="Email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            className={fieldCls}
          />
        </Field>
      </div>
      <Field id="subject" label="Subject (optional)">
        <input id="subject" name="subject" maxLength={200} className={fieldCls} />
      </Field>
      <Field id="message" label="Message" hint="Up to 5,000 characters.">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          aria-describedby="message-hint"
          className={cn(fieldCls, "resize-y")}
        />
      </Field>

      {/* Honeypot: hidden from people; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={sending} className="w-full sm:w-auto">
        <Send aria-hidden className="h-4 w-4" />
        {sending ? "Sending…" : "Send message"}
      </Button>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status.kind === "ok" && (
          <p className="rounded border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
            Thanks! Your message is on its way. I usually reply within a couple of days.
          </p>
        )}
        {status.kind === "error" && (
          <p className="rounded border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{status.message}</p>
        )}
      </div>
    </form>
  );
}

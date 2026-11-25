import { Resend } from "resend";

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limit: 5 messages per IP per 10 minutes.
// Resets on cold starts, which is fine for a personal site; swap for
// Upstash/Vercel KV if spam becomes a problem.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const fail = (error: string, status: number) =>
  Response.json({ success: false, error }, { status });

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return fail("Too many messages. Please try again in a few minutes.", 429);
    }

    const { name, email, subject, message, website } = await req.json();

    // Honeypot filled in: pretend success so bots don't retry.
    if (typeof website === "string" && website.trim()) {
      return Response.json({ success: true });
    }

    if (
      typeof name !== "string" || !name.trim() || name.length > LIMITS.name ||
      typeof email !== "string" || email.length > LIMITS.email || !EMAIL_RE.test(email) ||
      typeof message !== "string" || !message.trim() || message.length > LIMITS.message ||
      (subject != null && (typeof subject !== "string" || subject.length > LIMITS.subject))
    ) {
      return fail("Please provide a name, a valid email, and a message.", 400);
    }

    if (!process.env.RESEND_API_KEY) {
      return fail("Email service is unavailable.", 503);
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "omkarjawalikar04@gmail.com",
      subject: (subject || "New message").replace(/[\r\n]+/g, " ").slice(0, LIMITS.subject),
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) return fail("Email delivery failed. Please try again later.", 502);
    return Response.json({ success: true });
  } catch {
    return fail("Unable to process the message.", 500);
  }
}

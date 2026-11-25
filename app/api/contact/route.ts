import { Resend } from "resend";

export async function POST(req: Request) {
  let input: unknown;
  try {
    input = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid message." }, { status: 400 });
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Response.json({ success: false, error: "Invalid message." }, { status: 400 });
  }
  const fields = input as Record<string, unknown>;
  const limits = { name: 100, email: 254, subject: 200, message: 5000 };
  for (const [field, limit] of Object.entries(limits)) {
    const value = fields[field];
    if (typeof value !== "string" || !value.trim() || value.length > limit) {
      return Response.json({ success: false, error: "Please check the message fields." }, { status: 400 });
    }
  }
  const name = (fields.name as string).trim();
  const email = (fields.email as string).trim();
  const subject = (fields.subject as string).trim();
  const message = (fields.message as string).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(subject)) {
    return Response.json({ success: false, error: "Please check the email and subject." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return Response.json({ success: false, error: "Email is temporarily unavailable. Please use the direct email link." }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "omkarjawalikar04@gmail.com",
      subject,
      replyTo: email,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    if (data.error || !data.data?.id) {
      return Response.json({ success: false, error: "Delivery could not be confirmed." }, { status: 502 });
    }
    return Response.json({ success: true, data });
  } catch {
    return Response.json({ success: false, error: "Delivery could not be confirmed." }, { status: 502 });
  }
}

import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof message !== "string" || !message.trim() || (subject != null && typeof subject !== "string")) {
      return Response.json({ success: false, error: "Please provide a name, valid email, and message." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ success: false, error: "Email service is unavailable." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "omkarjawalikar04@gmail.com",
      subject: subject || "New Message",
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) return Response.json({ success: false, error: "Email delivery failed." }, { status: 502 });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: "Unable to process the message." }, { status: 500 });
  }
}

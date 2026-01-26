import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, role, linkedin, message, gRecaptchaToken } = await req.json();

    // 1. Verifiera ReCaptcha
    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`,
    });
    const recaptchaJson = await recaptchaRes.json();
    if (!recaptchaJson.success) {
      return NextResponse.json({ error: "Säkerhetskontroll misslyckades" }, { status: 400 });
    }

    // 2. Mejla DIG om ny kollega
    await resend.emails.send({
      from: 'Bridgelys Nätverk <hello@bridgelys.se>',
      to: 'hello@bridgelys.se',
      subject: `Ny nätverkspartner: ${name} (${role})`,
      text: `Namn: ${name}\nRoll: ${role}\nE-post: ${email}\nLinkedIn: ${linkedin || 'Ej angiven'}\n\nErfarenhet:\n${message}`,
    });

    // 3. Bekräftelse till partnern
    await resend.emails.send({
      from: 'Kim på Bridgelys <hello@bridgelys.se>',
      to: email,
      subject: 'Tack för ditt intresse för Bridgelys nätverk!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #0F172A;">
          <h2 style="color: #02ACA7;">Hej ${name}!</h2>
          <p>Vad kul att du vill bli en del av vårt nätverk av seniora specialister.</p>
          <p>Jag har tagit emot din intresseanmälan som <strong>${role}</strong>. Jag kikar igenom din profil och hör av mig om jag ser en matchning för kommande projekt!</p>
          <br />
          <p>Bästa hälsningar,</p>
          <p><strong>Kim Vági</strong><br />Bridgelys</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internt fel" }, { status: 500 });
  }
}
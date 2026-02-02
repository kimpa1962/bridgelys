export const dynamic = 'force-dynamic';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Vi lägger till en fallback för API-nyckeln så att bygget på Vercel inte kraschar
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      message, 
      gRecaptchaToken, 
      role,      
      linkedin,  
      type       
    } = body;

    // 1. Verifiera ReCaptcha
    if (!gRecaptchaToken) {
      return NextResponse.json({ error: "Säkerhetskontroll saknas (Token missing)" }, { status: 400 });
    }

    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`,
    });

    const recaptchaJson = await recaptchaRes.json();
    
    // Om reCaptcha misslyckas (t.ex. vid fel secret key eller ogiltig token)
    if (!recaptchaJson.success) {
      console.error("ReCaptcha Error:", recaptchaJson);
      return NextResponse.json({ error: "Säkerhetskontroll misslyckades" }, { status: 400 });
    }

    // 2. Skicka e-post baserat på typ
    if (type === 'partner') {
      
      // Mail TILL dig själv (Skickas från hello@, tas emot av kim@)
      await resend.emails.send({
        from: 'Nätverksformulär-webb <hello@bridgelys.se>',
        to: 'kim@bridgelys.se',
        replyTo: email, // Gör att du kan svara direkt till partnern
        subject: `Ny nätverkspartner: ${name} (${role})`,
        text: `Namn: ${name}\nRoll: ${role}\nE-post: ${email}\nLinkedIn: ${linkedin || 'Ej angiven'}\n\nErfarenhet:\n${message}`,
      });

      // Bekräftelse TILL partnern (Skickas från hello@)
      await resend.emails.send({
        from: 'Kim på Bridgelys <hello@bridgelys.se>',
        to: email,
        replyTo: 'hello@bridgelys.se',
        subject: 'Kul att du vill bli en del av nätverket!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #334155;">
            <h2 style="color: #0F172A;">Hej ${name}!</h2>
            <p>Stort tack för din intresseanmälan. Det är alltid kul att komma i kontakt med andra skickliga frilansare.</p>
            <p>Jag har tagit emot dina uppgifter som <strong>${role}</strong> och återkommer så snart jag kan.</p>
            <p style="margin-top: 20px;">Hörs snart!<br /><strong>Kim Vági</strong><br />Bridgelys</p>
          </div>
        `,
      });

    } else {
      
      // Mail TILL dig själv vid vanlig kontakt
      await resend.emails.send({
        from: 'Bridgelys Kontakt <hello@bridgelys.se>',
        to: 'kim@bridgelys.se',
        replyTo: email,
        subject: `Nytt meddelande från ${name}`,
        text: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`,
      });

      // Enkel bekräftelse TILL avsändaren
      await resend.emails.send({
        from: 'Bridgelys <hello@bridgelys.se>',
        to: email,
        replyTo: 'hello@bridgelys.se',
        subject: 'Tack för ditt meddelande',
        text: `Hej ${name},\n\nTack för att du hörde av dig! Jag har tagit emot ditt meddelande och återkommer till dig så snart jag kan.\n\nMed vänlig hälsning,\nKim Vági`,
      });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: error.message || "Ett oväntat fel uppstod på servern." }, 
      { status: 500 }
    );
  }
}
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      message, 
      gRecaptchaToken, 
      role,      // Specifikt för partner
      linkedin,  // Specifikt för partner
      type       // Skickas från frontend för att skilja formulären åt
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
    if (!recaptchaJson.success) {
      return NextResponse.json({ error: "Säkerhetskontroll misslyckades" }, { status: 400 });
    }

    // 2. Skicka e-post baserat på typ
    if (type === 'partner') {
      // --- LOGIK FÖR PARTNER-FORMULÄR ---
      
      // Mail till dig själv
      await resend.emails.send({
        from: 'Bridgelys Nätverk <hello@bridgelys.se>',
        to: 'hello@bridgelys.se',
        subject: `Ny nätverkspartner: ${name} (${role})`,
        text: `Namn: ${name}\nRoll: ${role}\nE-post: ${email}\nLinkedIn: ${linkedin || 'Ej angiven'}\n\nErfarenhet:\n${message}`,
      });

      // Bekräftelse till partnern
      await resend.emails.send({
        from: 'Kim på Bridgelys <hello@bridgelys.se>',
        to: email,
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
      // --- LOGIK FÖR VANLIGT KONTAKTFORMULÄR ---
      
      // Mail till dig själv
      await resend.emails.send({
        from: 'Bridgelys Kontakt <hello@bridgelys.se>',
        to: 'hello@bridgelys.se',
        subject: `Nytt meddelande från ${name}`,
        text: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`,
      });

      // Enkel bekräftelse till avsändaren
      await resend.emails.send({
        from: 'Bridgelys <hello@bridgelys.se>',
        to: email,
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
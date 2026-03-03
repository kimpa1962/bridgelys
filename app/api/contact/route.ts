// app/api/contact/route.ts
export const dynamic = "force-dynamic";

import { Resend } from "resend";
import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

function badRequest(code: string, userMessage: string) {
  return NextResponse.json({ code, userMessage }, { status: 400 });
}

function serverError(code: string, userMessage: string) {
  return NextResponse.json({ code, userMessage }, { status: 500 });
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function clamp(s: string, max: number) {
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY) {
      return serverError(
        "CONFIG_RESEND_MISSING",
        "Formuläret är tillfälligt otillgängligt. Maila hello@bridgelys.se."
      );
    }
    if (!RECAPTCHA_SECRET_KEY) {
      return serverError(
        "CONFIG_RECAPTCHA_MISSING",
        "Formuläret är tillfälligt otillgängligt. Maila hello@bridgelys.se."
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      message,
      gRecaptchaToken,
      role,
      linkedin,
      type,
    } = body ?? {};

    if (!isNonEmptyString(gRecaptchaToken)) {
      return badRequest(
        "MISSING_TOKEN",
        "Säkerhetskontroll saknas. Ladda om sidan och försök igen."
      );
    }

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
      return badRequest(
        "VALIDATION_FAILED",
        "Fyll i alla obligatoriska fält och försök igen."
      );
    }

    // Trim + rimliga maxlängder
    const safeName = clamp(name, 120);
    const safeEmail = clamp(email, 254);
    const safeMessage = clamp(message, 8000);
    const safeRole = isNonEmptyString(role) ? clamp(role, 120) : "";
    const safeLinkedIn = isNonEmptyString(linkedin) ? clamp(linkedin, 500) : "";

    // Verify reCAPTCHA
    const verifyBody = new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: gRecaptchaToken,
    });

    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyBody.toString(),
    });

    const recaptchaJson = await recaptchaRes.json().catch(() => null);

    if (!recaptchaJson?.success) {
      console.error("ReCaptcha Error:", recaptchaJson);
      return badRequest(
        "RECAPTCHA_FAILED",
        "Säkerhetskontrollen misslyckades. Försök igen."
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    if (type === "partner") {
      // Mail till dig
      await resend.emails.send({
        from: "Nätverksformulär-webb <hello@bridgelys.se>",
        to: "kim@bridgelys.se",
        replyTo: safeEmail,
        subject: `Ny nätverkspartner: ${safeName}${safeRole ? ` (${safeRole})` : ""}`,
        text:
          `Namn: ${safeName}\n` +
          (safeRole ? `Roll: ${safeRole}\n` : "") +
          `E-post: ${safeEmail}\n` +
          `LinkedIn: ${safeLinkedIn || "Ej angiven"}\n\n` +
          `Erfarenhet:\n${safeMessage}`,
      });

      // Autoreply
      await resend.emails.send({
        from: "Kim på Bridgelys <hello@bridgelys.se>",
        to: safeEmail,
        replyTo: "hello@bridgelys.se",
        subject: "Kul att du vill bli en del av nätverket!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #334155;">
            <h2 style="color: #0F172A;">Hej ${safeName}!</h2>
            <p>Stort tack för din intresseanmälan. Det är alltid kul att komma i kontakt med andra skickliga frilansare.</p>
            ${
              safeRole
                ? `<p>Jag har tagit emot dina uppgifter som <strong>${safeRole}</strong> och återkommer så snart jag kan.</p>`
                : `<p>Jag har tagit emot din intresseanmälan och återkommer så snart jag kan.</p>`
            }
            <p style="margin-top: 20px;">Hörs snart!<br /><strong>Kim Vági</strong><br />Bridgelys</p>
          </div>
        `,
      });
    } else {
      // Mail till dig
      await resend.emails.send({
        from: "Bridgelys Kontakt <hello@bridgelys.se>",
        to: "kim@bridgelys.se",
        replyTo: safeEmail,
        subject: `Nytt meddelande från ${safeName}`,
        text: `Namn: ${safeName}\nE-post: ${safeEmail}\n\nMeddelande:\n${safeMessage}`,
      });

      // Autoreply
      await resend.emails.send({
        from: "Bridgelys <hello@bridgelys.se>",
        to: safeEmail,
        replyTo: "hello@bridgelys.se",
        subject: "Tack för ditt meddelande",
        text:
          `Hej ${safeName},\n\n` +
          `Tack för att du hörde av dig! Jag har tagit emot ditt meddelande och återkommer till dig så snart jag kan.\n\n` +
          `Med vänlig hälsning,\nKim Vági`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return serverError(
      "SERVER_ERROR",
      "Ett oväntat fel uppstod. Prova igen eller maila hello@bridgelys.se."
    );
  }
}
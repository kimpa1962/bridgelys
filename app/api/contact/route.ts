export const dynamic = "force-dynamic";

import { Resend } from "resend";
import { NextResponse } from "next/server";
import sv from "@/messages/sv.json";
import en from "@/messages/en.json";

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

function replaceVars(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
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
      locale,
    } = body ?? {};

    const activeLocale = locale === "en" ? "en" : "sv";
    const messages = activeLocale === "en" ? en : sv;

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

    const safeName = clamp(name, 120);
    const safeEmail = clamp(email, 254);
    const safeMessage = clamp(message, 8000);
    const safeRole = isNonEmptyString(role) ? clamp(role, 120) : "";
    const safeLinkedIn = isNonEmptyString(linkedin) ? clamp(linkedin, 500) : "";

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
      await resend.emails.send({
        from: "Nätverksformulär-webb <webform@bridgelys.se>",
        to: "hello@bridgelys.se",
        replyTo: safeEmail,
        subject: `Ny nätverkspartner: ${safeName}${safeRole ? ` (${safeRole})` : ""}`,
        text:
          `Namn: ${safeName}\n` +
          (safeRole ? `Roll: ${safeRole}\n` : "") +
          `E-post: ${safeEmail}\n` +
          `LinkedIn: ${safeLinkedIn || "Ej angiven"}\n\n` +
          `Erfarenhet:\n${safeMessage}`,
      });

      const partnerSubject = messages.email.partnerConfirmation.subject;
      const partnerHeading = replaceVars(messages.email.partnerConfirmation.heading, {
        name: safeName,
      });
      const partnerIntro = messages.email.partnerConfirmation.intro;
      const partnerWithRole = replaceVars(messages.email.partnerConfirmation.withRole, {
        role: safeRole,
      });
      const partnerWithoutRole = messages.email.partnerConfirmation.withoutRole;
      const partnerSignoff = messages.email.partnerConfirmation.signoff;

      await resend.emails.send({
        from: "Kim på Bridgelys <hello@bridgelys.se>",
        to: safeEmail,
        replyTo: "hello@bridgelys.se",
        subject: partnerSubject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #334155;">
            <h2 style="color: #0F172A;">${partnerHeading}</h2>
            <p>${partnerIntro}</p>
            ${
              safeRole
                ? `<p>${partnerWithRole}</p>`
                : `<p>${partnerWithoutRole}</p>`
            }
            <p style="margin-top: 20px;">${partnerSignoff}</p>
          </div>
        `,
      });
    } else {
      await resend.emails.send({
        from: "Bridgelys Kontakt <webform@bridgelys.se>",
        to: "hello@bridgelys.se",
        replyTo: safeEmail,
        subject: `Nytt meddelande från ${safeName}`,
        text: `Namn: ${safeName}\nE-post: ${safeEmail}\n\nMeddelande:\n${safeMessage}`,
      });

      const contactSubject = messages.email.contactConfirmation.subject;
      const contactText = replaceVars(messages.email.contactConfirmation.text, {
        name: safeName,
      });

      await resend.emails.send({
        from: "Bridgelys <hello@bridgelys.se>",
        to: safeEmail,
        replyTo: "hello@bridgelys.se",
        subject: contactSubject,
        text: contactText,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact API Error:", error);
    return serverError(
      "SERVER_ERROR",
      "Ett oväntat fel uppstod. Prova igen eller maila hello@bridgelys.se."
    );
  }
}
// app/contact/page.tsx
"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type Status = "idle" | "loading" | "success" | "error";

export default function Kontakt() {
  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const messageId = useId();
  const errorId = useId();
  const hintId = useId();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [captchaAllowed, setCaptchaAllowed] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Läs cookie-consent (nödvändiga kakor) och lyssna på uppdateringar
  useEffect(() => {
    function evaluateConsent() {
      try {
        const raw = localStorage.getItem("bridgelys-detailed-consent");
        if (!raw) return setCaptchaAllowed(false);
        const parsed = JSON.parse(raw);
        setCaptchaAllowed(Boolean(parsed?.necessary));
      } catch {
        setCaptchaAllowed(false);
      }
    }

    evaluateConsent();
    window.addEventListener("cookie-consent-updated", evaluateConsent);
    return () => window.removeEventListener("cookie-consent-updated", evaluateConsent);
  }, []);

  // Fokus på statusbox vid success/error
  useEffect(() => {
    if (status === "success" || status === "error") {
      statusRef.current?.focus();
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");

    if (!captchaAllowed) {
      setStatus("error");
      setErrorMsg("För att skicka formuläret behöver du godkänna nödvändiga kakor (för reCAPTCHA).");
      return;
    }

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setStatus("error");
      setErrorMsg("Vänligen bekräfta att du inte är en robot.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, gRecaptchaToken: token }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        recaptchaRef.current?.reset();
        return;
      }

      setStatus("error");
      setErrorMsg(
        data?.userMessage ||
          "Något gick tyvärr fel. Prova igen eller maila direkt till hello@bridgelys.se."
      );

      if (data?.code === "RECAPTCHA_FAILED") {
        recaptchaRef.current?.reset();
      }
    } catch {
      setStatus("error");
      setErrorMsg("Något gick tyvärr fel. Prova igen eller maila direkt till hello@bridgelys.se.");
    }
  };

  return (
    <>
      <section className="bg-brand-navy pt-24 pb-16 text-white text-center" aria-labelledby="contact-title">
        <div className="container mx-auto px-6">
          <h1 id="contact-title" className="font-display text-4xl md:text-5xl font-bold mb-4">
            Starta en <span className="text-brand-green-on-dark">konversation</span>
          </h1>
          <p className="text-slate-200 text-lg max-w-xl mx-auto font-sans leading-relaxed">
            Fyll i formuläret nedan så återkopplar jag till dig inom kort.
          </p>
        </div>
      </section>

      <section className="py-16" aria-labelledby="form-title">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <h2 id="form-title" className="sr-only">
              Kontaktformulär
            </h2>

            {/* Status / fel (ARIA live) */}
            {(status === "success" || status === "error") && (
              <div
                ref={statusRef}
                tabIndex={-1}
                role={status === "error" ? "alert" : "status"}
                aria-live={status === "error" ? "assertive" : "polite"}
                className="mb-8 rounded-2xl border border-slate-200 bg-white p-6"
              >
                {status === "success" ? (
                  <div className="text-center">
                    <div className="text-brand-green text-5xl mb-4" aria-hidden="true">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">
                      Tack för ditt meddelande!
                    </h3>
                    <p className="text-slate-700">
                      Jag har tagit emot din förfrågan och återkopplar så snart jag kan.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 text-brand-navy font-bold underline rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    >
                      Skicka ett till meddelande
                    </button>
                  </div>
                ) : (
                  <div>
                    <p id={errorId} className="text-slate-900 font-bold">
                      {errorMsg || "Något gick tyvärr fel."}
                    </p>
                    {!captchaAllowed && (
                      <p className="mt-2 text-slate-700">
                        Öppna cookie-banner längst ner och välj{" "}
                        <span className="font-semibold">Spara mina val</span> eller{" "}
                        <span className="font-semibold">Acceptera alla</span>, och försök igen.
                      </p>
                    )}
                    <p className="mt-2 text-slate-700">
                      Alternativ: maila{" "}
                      <a className="underline font-semibold" href="mailto:hello@bridgelys.se">
                        hello@bridgelys.se
                      </a>
                      .
                    </p>
                  </div>
                )}
              </div>
            )}

            {status === "idle" || status === "loading" ? (
              <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "loading"}>
                <p id={hintId} className="sr-only">
                  Alla fält markerade som obligatoriska måste fyllas i.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <label htmlFor={nameId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                      Namn <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                      placeholder="Ditt namn"
                      required
                      aria-describedby={hintId}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor={companyId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                      Företag
                    </label>
                    <input
                      id={companyId}
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                      placeholder="Företagsnamn"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label htmlFor={emailId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                    E-post <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                    placeholder="din.mejl@foretag.se"
                    required
                    aria-describedby={hintId}
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                <div className="text-left">
                  <label htmlFor={messageId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                    Meddelande <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                    placeholder="Skriv ditt meddelande här..."
                    required
                    aria-describedby={hintId}
                  />
                </div>

                <div className="flex justify-start">
                  {captchaAllowed ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    />
                  ) : (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-left">
                      <p className="text-sm font-bold text-brand-navy">
                        reCAPTCHA är avstängt tills nödvändiga kakor godkänns.
                      </p>
                      <p className="text-sm text-slate-700 mt-1">
                        Använd cookie-banner längst ner och godkänn nödvändiga kakor, försök sedan igen.
                      </p>
                      <p className="text-sm text-slate-700 mt-2">
                        Alternativ: maila{" "}
                        <a className="underline font-semibold" href="mailto:hello@bridgelys.se">
                          hello@bridgelys.se
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-disabled={status === "loading"}
                  className={[
                    "w-full bg-brand-navy text-white font-bold py-5 rounded-xl transition-all shadow-lg text-lg",
                    status === "loading" ? "opacity-60 cursor-not-allowed" : "hover:bg-brand-navy/90",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  {status === "loading" ? "Skickar..." : "Skicka förfrågan"}
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
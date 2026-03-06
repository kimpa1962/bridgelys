"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Handshake, MessageSquare, Briefcase } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function JoinNetworkPage() {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();
  const linkedinId = useId();
  const messageId = useId();
  const errorId = useId();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    linkedin: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaAllowed, setCaptchaAllowed] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Läs detailed-consent korrekt
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
    return () =>
      window.removeEventListener("cookie-consent-updated", evaluateConsent);
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusRef.current?.focus();
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!captchaAllowed) {
      setStatus("error");
      setErrorMsg(
        "För att skicka formuläret behöver du godkänna nödvändiga kakor (reCAPTCHA)."
      );
      return;
    }

    setStatus("loading");

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
        body: JSON.stringify({
          ...formData,
          gRecaptchaToken: token,
          type: "partner",
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          role: "",
          linkedin: "",
          message: "",
        });
        recaptchaRef.current?.reset();
        return;
      }

      setStatus("error");
      setErrorMsg(
        data?.userMessage ||
          "Något gick fel. Prova igen eller maila hello@bridgelys.se."
      );

      if (data?.code === "RECAPTCHA_FAILED") {
        recaptchaRef.current?.reset();
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Något gick fel. Prova igen eller maila hello@bridgelys.se."
      );
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-navy pt-24 pb-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Bli en del av{" "}
            <span className="text-brand-green-on-dark">nätverket</span>
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Jag letar ständigt efter skickliga frilansare som vill samarbeta i
            utmanande projekt.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* LEFT */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <Handshake
                  className="text-brand-green w-8 h-8"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <h2 className="text-3xl font-bold text-brand-navy">
                  Registrera ditt intresse
                </h2>
              </div>

              <p className="text-slate-700 text-lg leading-relaxed">
                Skriv några rader om din erfarenhet och dina främsta
                kompetensområden.
              </p>

              <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-green shadow-sm">
                <p className="text-slate-700 italic text-lg">
                  &quot;Att registrera sig är helt kostnadsfritt och innebär
                  inga bindningskrav.&quot;
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-navy/10 p-3 rounded-lg">
                  <Briefcase
                    className="text-brand-navy w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-slate-600">
                  <p className="font-semibold text-brand-navy mb-1">
                    Långsiktiga samarbeten
                  </p>
                  <p>
                    Jag tror på kraften i att bygga relationer som gynnar både
                    konsulter och kunder.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
              {(status === "success" || status === "error") && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role={status === "error" ? "alert" : "status"}
                  aria-live={status === "error" ? "assertive" : "polite"}
                  className="mb-8"
                >
                  {status === "success" ? (
                    <div className="text-center">
                      <div
                        className="text-brand-green text-6xl mb-4"
                        aria-hidden="true"
                      >
                        ✓
                      </div>
                      <h2 className="text-2xl font-bold text-brand-navy">
                        Tack för din intresseanmälan!
                      </h2>
                      <p className="text-slate-700 mt-2">
                        Jag återkommer så snart jag kan.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 underline font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                      >
                        Skicka en till
                      </button>
                    </div>
                  ) : (
                    <p id={errorId} className="text-slate-900 font-bold">
                      {errorMsg}
                    </p>
                  )}
                </div>
              )}

              {(status === "idle" || status === "loading") && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-busy={status === "loading"}
                >
                  <div>
                    <label
                      htmlFor={nameId}
                      className="block text-sm font-bold text-brand-navy mb-2"
                    >
                      Namn *
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-green"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={emailId}
                      className="block text-sm font-bold text-brand-navy mb-2"
                    >
                      E-post *
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-green"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={roleId}
                      className="block text-sm font-bold text-brand-navy mb-2"
                    >
                      Specialområde *
                    </label>
                    <select
                      id={roleId}
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-green"
                    >
                      <option value="">Välj område...</option>
                      <option>Frontend-utvecklare</option>
                      <option>Backend-utvecklare</option>
                      <option>Fullstack-utvecklare</option>
                      <option>UX/UI-Designer</option>
                      <option>SEO-specialist</option>
                      <option>Projektledare</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={linkedinId}
                      className="block text-sm font-bold text-brand-navy mb-2"
                    >
                      LinkedIn-profil
                    </label>
                    <input
                      id={linkedinId}
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-green"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={messageId}
                      className="block text-sm font-bold text-brand-navy mb-2"
                    >
                      Kort om din erfarenhet *
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-green"
                    />
                  </div>

                  <div>
                    {captchaAllowed ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                        }
                      />
                    ) : (
                      <div className="bg-slate-100 p-4 rounded-xl border text-sm text-slate-700">
                        Godkänn nödvändiga kakor för att aktivera reCAPTCHA.
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-brand-navy text-white font-bold py-5 rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    {status === "loading"
                      ? "Skickar..."
                      : "Skicka intresseanmälan"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
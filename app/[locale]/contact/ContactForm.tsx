"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contactPage");

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
      setErrorMsg(t("captcha.consentRequired"));
      return;
    }

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setStatus("error");
      setErrorMsg(t("captcha.confirmHuman"));
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
      setErrorMsg(data?.userMessage || t("status.fallbackError"));

      if (data?.code === "RECAPTCHA_FAILED") {
        recaptchaRef.current?.reset();
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("status.fallbackError"));
    }
  };

  return (
    <section className="py-16" aria-labelledby="form-title">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <h2 id="form-title" className="sr-only">
            {t("form.srTitle")}
          </h2>

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
                    {t("status.successTitle")}
                  </h3>
                  <p className="text-slate-700">{t("status.successText")}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-brand-navy font-bold underline rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                  >
                    {t("status.sendAnother")}
                  </button>
                </div>
              ) : (
                <div>
                  <p id={errorId} className="text-slate-900 font-bold">
                    {errorMsg || t("status.genericError")}
                  </p>

                  {!captchaAllowed && (
                    <p className="mt-2 text-slate-700">
                      {t.rich("captcha.errorHelp", {
                        save: (chunks) => <span className="font-semibold">{chunks}</span>,
                        accept: (chunks) => <span className="font-semibold">{chunks}</span>,
                      })}
                    </p>
                  )}

                  <p className="mt-2 text-slate-700">
                    {t("contactAlt.prefix")}{" "}
                    <a className="underline font-semibold" href="mailto:hello@bridgelys.se">
                      {t("contactAlt.email")}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          )}

          {(status === "idle" || status === "loading") && (
            <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "loading"}>
              <p id={hintId} className="sr-only">
                {t("form.requiredHint")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <label htmlFor={nameId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                    {t("form.name")} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                    placeholder={t("form.namePlaceholder")}
                    required
                    aria-describedby={hintId}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor={companyId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                    {t("form.company")}
                  </label>
                  <input
                    id={companyId}
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                    placeholder={t("form.companyPlaceholder")}
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="text-left">
                <label htmlFor={emailId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                  {t("form.email")} <span aria-hidden="true">*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                  placeholder={t("form.emailPlaceholder")}
                  required
                  aria-describedby={hintId}
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div className="text-left">
                <label htmlFor={messageId} className="block text-sm font-bold text-brand-navy mb-2 ml-1">
                  {t("form.message")} <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green transition-all"
                  placeholder={t("form.messagePlaceholder")}
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
                      {t("captcha.disabledTitle")}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      {t("captcha.disabledText")}
                    </p>
                    <p className="text-sm text-slate-700 mt-2">
                      {t("contactAlt.prefix")}{" "}
                      <a className="underline font-semibold" href="mailto:hello@bridgelys.se">
                        {t("contactAlt.email")}
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
                {status === "loading" ? t("status.sending") : t("status.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
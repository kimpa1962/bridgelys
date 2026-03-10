"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Handshake, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export default function JoinNetworkForm() {
  const t = useTranslations("joinNetworkPage");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!captchaAllowed) {
      setStatus("error");
      setErrorMsg(t("captcha.consentRequired"));
      return;
    }

    setStatus("loading");

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
    <section className="py-16 bg-slate-50" aria-labelledby="join-network-form-title">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <Handshake
                className="text-brand-green w-8 h-8"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <h2 id="join-network-form-title" className="text-3xl font-bold text-brand-navy">
                {t("intro.title")}
              </h2>
            </div>

            <p className="text-slate-700 text-lg leading-relaxed">
              {t("intro.description")}
            </p>

            <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-green shadow-sm">
              <p className="text-slate-700 italic text-lg">
                &quot;{t("intro.quote")}&quot;
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-navy/10 p-3 rounded-lg">
                <Briefcase className="text-brand-navy w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-slate-600">
                <p className="font-semibold text-brand-navy mb-1">
                  {t("intro.longTermTitle")}
                </p>
                <p>{t("intro.longTermText")}</p>
              </div>
            </div>
          </div>

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
                    <div className="text-brand-green text-6xl mb-4" aria-hidden="true">
                      ✓
                    </div>
                    <h2 className="text-2xl font-bold text-brand-navy">
                      {t("status.successTitle")}
                    </h2>
                    <p className="text-slate-700 mt-2">
                      {t("status.successText")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 underline font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                    >
                      {t("status.sendAnother")}
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
                    {t("form.name")} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-sm font-bold text-brand-navy mb-2"
                  >
                    {t("form.email")} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    inputMode="email"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor={roleId}
                    className="block text-sm font-bold text-brand-navy mb-2"
                  >
                    {t("form.role")} <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id={roleId}
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <option value="">{t("form.rolePlaceholder")}</option>
                    <option value={t("roles.frontend")}>{t("roles.frontend")}</option>
                    <option value={t("roles.backend")}>{t("roles.backend")}</option>
                    <option value={t("roles.fullstack")}>{t("roles.fullstack")}</option>
                    <option value={t("roles.uxui")}>{t("roles.uxui")}</option>
                    <option value={t("roles.seo")}>{t("roles.seo")}</option>
                    <option value={t("roles.pm")}>{t("roles.pm")}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={linkedinId}
                    className="block text-sm font-bold text-brand-navy mb-2"
                  >
                    {t("form.linkedin")}
                  </label>
                  <input
                    id={linkedinId}
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    autoComplete="url"
                    inputMode="url"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor={messageId}
                    className="block text-sm font-bold text-brand-navy mb-2"
                  >
                    {t("form.message")} <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  />
                </div>

                <div>
                  {captchaAllowed ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    />
                  ) : (
                    <div className="bg-slate-100 p-4 rounded-xl border text-sm text-slate-700">
                      {t("captcha.disabledText")}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-disabled={status === "loading"}
                  className="w-full bg-brand-navy text-white font-bold py-5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:opacity-60"
                >
                  {status === "loading" ? t("status.sending") : t("status.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Cookie,
  ShieldCheck,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");

  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const closeAndRestoreFocus = useCallback(() => {
    setIsVisible(false);
    requestAnimationFrame(() => previouslyFocusedRef.current?.focus());
  }, []);

  const saveConsent = useCallback(
    (allAccepted: boolean) => {
      const isAnalyticsAccepted = allAccepted ? true : analyticsEnabled;

      const consentSettings = {
        necessary: true,
        analytics: isAnalyticsAccepted,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("bridgelys-cookie-consent", "true");
      localStorage.setItem(
        "bridgelys-detailed-consent",
        JSON.stringify(consentSettings)
      );

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: isAnalyticsAccepted ? "granted" : "denied",
          analytics_storage: isAnalyticsAccepted ? "granted" : "denied",
          ad_user_data: isAnalyticsAccepted ? "granted" : "denied",
          ad_personalization: isAnalyticsAccepted ? "granted" : "denied",
        });
      }

      window.dispatchEvent(new Event("cookie-consent-updated"));
      closeAndRestoreFocus();
    },
    [analyticsEnabled, closeAndRestoreFocus]
  );

  useEffect(() => {
    const consent = localStorage.getItem("bridgelys-cookie-consent");

    if (!consent) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      const detailed = localStorage.getItem("bridgelys-detailed-consent");
      if (detailed && typeof window !== "undefined" && window.gtag) {
        try {
          const { analytics } = JSON.parse(detailed);
          window.gtag("consent", "update", {
            analytics_storage: analytics ? "granted" : "denied",
            ad_storage: analytics ? "granted" : "denied",
          });
        } catch (e) {
          console.error(t("loadSettingsError"), e);
        }
      }
    }
  }, [t]);

  useEffect(() => {
    if (!isVisible) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => headingRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (!dialogRef.current) return;

      if (e.key === "Escape") {
        if (showSettings) {
          setShowSettings(false);
        } else {
          saveConsent(false);
        }
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isVisible, showSettings, saveConsent]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 p-6 relative overflow-hidden"
      >
        <Cookie
          className="absolute -right-6 -top-6 w-24 h-24 text-slate-50 z-0"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-brand-green/10 p-2 rounded-lg">
              <Cookie className="w-5 h-5 text-brand-green" aria-hidden="true" />
            </div>
            <h3
              id="cookie-title"
              ref={headingRef}
              tabIndex={-1}
              className="font-bold text-brand-navy text-lg focus:outline-none"
            >
              {t("title")}
            </h3>
          </div>

          <p id="cookie-desc" className="text-sm text-slate-800 mb-4 leading-relaxed">
            {t("description")}
          </p>

          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="flex items-center gap-1 text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 hover:text-brand-green transition-colors rounded-md"
          >
            {showSettings ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {showSettings ? t("hideSettings") : t("showSettings")}
          </button>

          {showSettings && (
            <div className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      {t("necessary.title")}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      {t("necessary.description")}
                    </p>
                  </div>
                </div>
                <div className="h-6 w-10 bg-brand-green rounded-full flex items-center px-1">
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm translate-x-4" />
                </div>
              </div>

              <hr className="border-slate-200" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <BarChart3 className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      {t("analytics.title")}
                    </p>
                  </div>
                </div>

                {/* FIX: accessibility label added */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  aria-label={t("analytics.title")}
                  onClick={() => setAnalyticsEnabled((v) => !v)}
                  className={`h-6 w-10 rounded-full flex items-center px-1 transition-colors ${
                    analyticsEnabled ? "bg-brand-green" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${
                      analyticsEnabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => saveConsent(true)}
              className="flex-1 bg-brand-navy text-white text-sm font-bold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              {t("acceptAll")}
            </button>
            <button
              type="button"
              onClick={() => saveConsent(false)}
              className="flex-1 bg-white text-brand-navy border border-slate-200 text-sm font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
            >
              {t("saveChoices")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
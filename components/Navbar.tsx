"use client";

import { useEffect, useId, useRef, useState } from "react";
import {Link} from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";


export default function Navbar() {
  const t = useTranslations("nav");
  const ts = useTranslations("services");
  const locale = useLocale();
  const otherLocale = locale === "sv" ? "en" : "sv";
  const otherFlag = locale === "sv" ? "🇬🇧" : "🇸🇪";
  const otherLabel = locale === "sv" ? "Switch to English" : "Byt till svenska";

  const switchHref =
    typeof window !== "undefined"
      ? window.location.pathname.replace(`/${locale}`, `/${otherLocale}`)
      : `/${otherLocale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const mobileMenuId = useId();
  const servicesMenuId = useId();
  const servicesButtonRef = useRef<HTMLButtonElement | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

  const tjanster = [
    { namn: ts("procurement"), href: `/${locale}/services/procurement` },
    { namn: ts("projectManagement"), href: `/${locale}/services/project-management` },
    { namn: ts("accessibility"), href: `/${locale}/services/accessibility` },
    { namn: ts("seo"), href: `/${locale}/services/seo` },
    { namn: ts("educations"), href: `/${locale}/services/educations` },
    { namn: ts("webDevelopment"), href: `/${locale}/services/web-development` },
  ];

  // ESC stänger menyer
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
      servicesButtonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Klick utanför stänger dropdown
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!isServicesOpen) return;
      const target = e.target as Node;
      if (
        servicesButtonRef.current?.contains(target) ||
        servicesMenuRef.current?.contains(target)
      ) {
        return;
      }
      setIsServicesOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isServicesOpen]);

  return (
    <nav
      className="border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm"
      aria-label="Huvudmeny"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* LOGO */}
          <Link
            href={`/${locale}`}
            className="flex flex-col group w-45 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            <Image
              src="/bridgelys_logo-vector.svg"
              alt="Bridgelys — gå till startsidan"
              width={180}
              height={45}
              priority
              className="h-auto w-full"
            />
            <span
              className="mt-1 text-[14px] text-brand-dark font-normal leading-none text-right"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              HUMAN IT&nbsp;
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="text-slate-700 hover:text-brand-navy font-medium transition-colors rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              {t("home")}
            </Link>

            {/* DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                ref={servicesButtonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                aria-controls={servicesMenuId}
                onClick={() => setIsServicesOpen((v) => !v)}
                className="text-slate-700 hover:text-brand-navy font-medium flex items-center gap-1 py-8 transition-colors rounded-md px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                {t("services")}
                <svg
                  className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id={servicesMenuId}
                ref={servicesMenuRef}
                role="menu"
                aria-label="Våra tjänster"
                className={[
                  "absolute left-0 top-full w-64 bg-white shadow-2xl rounded-xl py-3 border border-slate-100",
                  "transition-all duration-200 transform origin-top",
                  isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2",
                ].join(" ")}
              >
                {tjanster.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    role="menuitem"
                    className="block px-6 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-green transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {t.namn}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/about-us`}
              className="text-slate-700 hover:text-brand-navy font-medium transition-colors rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              {t("about")}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="text-slate-700 hover:text-brand-navy font-medium transition-colors rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              {t("contact")}
            </Link>
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              aria-label={otherLabel}
              title={otherLabel}
              className="text-slate-700 hover:text-brand-navy font-medium transition-colors rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <Image
                src={locale === "sv" ? "/flags/gb.svg" : "/flags/se.svg"}
                alt={locale === "sv" ? "English" : "Svenska"}
                width={32}
                height={20}
                className="rounded-sm"
              />
            </Link>
            <Link
              href={`/${locale}/join-network`}
              className="bg-brand-navy text-white px-5 py-2.5 rounded-full font-bold hover:bg-opacity-90 transition shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              {t("join")}
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-label={isMobileMenuOpen ? "Stäng meny" : "Öppna meny"}
              className="p-2 text-brand-navy rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <div
        id={mobileMenuId}
        className={[
          "md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-1",
          isMobileMenuOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <Link
          href="/"
          className="block p-3 text-slate-900 font-medium border-b border-slate-50 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t("home")}
        </Link>

        <div className="p-3 text-xs font-bold text-brand-green uppercase tracking-wider mt-2">
          {t("services")}
        </div>

        {tjanster.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block pl-6 p-3 text-slate-700 hover:text-brand-green hover:bg-slate-50 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.namn}
          </Link>
        ))}

        <div className="pt-4 space-y-2">
          <Link
            href="/about-us"
            className="block p-3 text-slate-900 font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="block p-3 text-slate-900 font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("contact")}
          </Link>
          <Link
            href={switchHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={otherLabel}
            title={otherLabel}
            className="block p-3 text-slate-900 font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src={locale === "sv" ? "/flags/gb.svg" : "/flags/se.svg"}
              alt={locale === "sv" ? "English" : "Svenska"}
              width={32}
              height={20}
              className="rounded-sm"
            />
          </Link>
          <Link
            href="/join-network"
            className="block p-3 bg-brand-navy text-white text-center rounded-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("join")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
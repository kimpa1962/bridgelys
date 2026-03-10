"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("nav");
  const ts = useTranslations("services");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "sv" ? "en" : "sv";
  const otherLabel = locale === "sv" ? "Switch to English" : "Byt till svenska";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const mobileMenuId = useId();
  const servicesMenuId = useId();
  const servicesButtonRef = useRef<HTMLButtonElement | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

  const tjanster = [
    { namn: ts("procurement"), href: "/services/procurement" },
    { namn: ts("projectManagement"), href: "/services/project-management" },
    { namn: ts("accessibility"), href: "/services/accessibility" },
    { namn: ts("seo"), href: "/services/seo" },
    { namn: ts("educations"), href: "/services/educations" },
    { namn: ts("webDevelopment"), href: "/services/web-development" },
  ];

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
          <Link
            href="/"
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

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-brand-navy font-medium transition-colors rounded-md px-1 py-1"
            >
              {t("home")}
            </Link>

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
                className="text-slate-700 hover:text-brand-navy font-medium flex items-center gap-1 py-8 transition-colors"
              >
                {t("services")}
              </button>

              <div
                id={servicesMenuId}
                ref={servicesMenuRef}
                role="menu"
                className={[
                  "absolute left-0 top-full w-64 bg-white shadow-2xl rounded-xl py-3 border border-slate-100",
                  isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible",
                ].join(" ")}
              >
                {tjanster.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    role="menuitem"
                    className="block px-6 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {t.namn}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about-us"
              className="text-slate-700 hover:text-brand-navy font-medium"
            >
              {t("about")}
            </Link>

            <Link
              href="/contact"
              className="text-slate-700 hover:text-brand-navy font-medium"
            >
              {t("contact")}
            </Link>

            <Link
              href={pathname}
              locale={otherLocale}
              aria-label={otherLabel}
              title={otherLabel}
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
              className="bg-brand-navy text-white px-5 py-2.5 rounded-full font-bold"
            >
              {t("join")}
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              className="p-2 text-brand-navy"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </nav>
  );
}
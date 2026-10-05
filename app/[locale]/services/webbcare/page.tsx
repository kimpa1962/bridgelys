import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "webbCarePage.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function WebbCarePage() {
  const t = await getTranslations("webbCarePage");

  const focusAreas = [
    { key: "seo", Icon: Search },
    { key: "accessibility", Icon: ShieldCheck },
    { key: "performance", Icon: Gauge },
    { key: "technology", Icon: Wrench },
  ];

  const packages = [
    {
      key: "base",
      featured: false,
      items: ["item1", "item2", "item3", "item4", "item5", "item6", "item7"],
    },
    {
      key: "plus",
      featured: true,
      items: ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8"],
    },
    {
      key: "pro",
      featured: false,
      items: ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9"],
    },
  ] as const;

  const startItems = ["item1", "item2", "item3", "item4", "item5", "item6"] as const;
  const exclusions = ["item1", "item2", "item3", "item4", "item5", "item6"] as const;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-brand-navy pb-20 pt-24 text-white" aria-labelledby="webbcare-page-title">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-green-on-dark">
            {t("hero.eyebrow")}
          </p>
          <h1
            id="webbcare-page-title"
            className="mx-auto max-w-5xl font-display text-4xl font-bold leading-tight md:text-6xl"
          >
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#paket"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green-on-dark px-8 py-4 font-bold text-brand-navy transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              {t("hero.ctaPackages")}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              {t("hero.ctaContact")}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="focus-title">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="focus-title" className="font-display text-3xl font-bold text-brand-navy md:text-4xl">
              {t("focus.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {t("focus.description")}
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map(({ key, Icon }) => (
              <li key={key} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 inline-flex rounded-2xl bg-brand-green/10 p-3 text-brand-green">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-navy">
                  {t(`focus.items.${key}.title`)}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {t(`focus.items.${key}.text`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-20" aria-labelledby="start-title">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex rounded-2xl bg-brand-green/10 p-4 text-brand-green">
                <Rocket className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
                {t("start.eyebrow")}
              </p>
              <h2 id="start-title" className="mt-2 font-display text-3xl font-bold text-brand-navy md:text-4xl">
                {t("start.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {t("start.description")}
              </p>
              <p className="mt-5 font-semibold text-brand-navy">
                {t("start.price")}
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {startItems.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
                  <span className="text-slate-700">{t(`start.items.${item}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="paket" className="scroll-mt-28 py-24" aria-labelledby="packages-title">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
              {t("packages.eyebrow")}
            </p>
            <h2 id="packages-title" className="mt-2 font-display text-3xl font-bold text-brand-navy md:text-5xl">
              {t("packages.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t("packages.description")}</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {packages.map((pkg) => (
              <article
                key={pkg.key}
                className={[
                  "relative flex h-full flex-col rounded-[2rem] border p-8",
                  pkg.featured
                    ? "border-brand-green bg-brand-navy text-white shadow-2xl"
                    : "border-slate-200 bg-white text-slate-900 shadow-sm",
                ].join(" ")}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-8 rounded-full bg-brand-green-on-dark px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg">
                    {t("packages.recommended")}
                  </div>
                )}

                <h3 className={[
                  "font-display text-3xl font-bold",
                  pkg.featured ? "text-white" : "text-brand-navy",
                ].join(" ")}>
                  {t(`packages.${pkg.key}.title`)}
                </h3>

                <p className={[
                  "mt-2 min-h-14 leading-relaxed",
                  pkg.featured ? "text-slate-200" : "text-slate-600",
                ].join(" ")}>
                  {t(`packages.${pkg.key}.tagline`)}
                </p>

                <div className="mt-6">
                  <span className="font-display text-4xl font-bold">
                    {t(`packages.${pkg.key}.price`)}
                  </span>
                  <span className={pkg.featured ? "text-slate-300" : "text-slate-500"}>
                    {t("packages.perMonth")}
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-4">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2
                        className={[
                          "mt-0.5 h-5 w-5 shrink-0",
                          pkg.featured ? "text-brand-green-on-dark" : "text-brand-green",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      <span className={pkg.featured ? "text-slate-100" : "text-slate-700"}>
                        {t(`packages.${pkg.key}.items.${item}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={[
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    pkg.featured
                      ? "bg-brand-green-on-dark text-brand-navy hover:brightness-105 focus-visible:ring-brand-green-on-dark focus-visible:ring-offset-brand-navy"
                      : "bg-brand-navy text-white hover:brightness-110 focus-visible:ring-brand-navy",
                  ].join(" ")}
                >
                  {t("packages.cta")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20" aria-labelledby="not-included-title">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Sparkles className="h-9 w-9 text-brand-green" aria-hidden="true" />
              <h2 id="not-included-title" className="mt-4 font-display text-3xl font-bold text-brand-navy">
                {t("notIncluded.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {t("notIncluded.description")}
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {exclusions.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
                  {t(`notIncluded.items.${item}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="webbcare-cta-title">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="rounded-[3rem] bg-brand-navy p-10 text-center text-white shadow-xl md:p-14">
            <BarChart3 className="mx-auto h-10 w-10 text-brand-green-on-dark" aria-hidden="true" />
            <h2 id="webbcare-cta-title" className="mt-5 font-display text-3xl font-bold md:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green-on-dark px-8 py-4 font-bold text-brand-navy transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              {t("cta.button")}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

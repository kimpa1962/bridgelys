import React from "react";
import { ArrowRight, Gauge, Search, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function WebbCareFeature() {
  const t = useTranslations("webbCareHome");

  const areas = [
    { key: "seo", Icon: Search },
    { key: "accessibility", Icon: ShieldCheck },
    { key: "performance", Icon: Gauge },
    { key: "technology", Icon: Wrench },
  ];

  return (
    <section
      className="bg-white py-20 md:py-24"
      aria-labelledby="webbcare-title"
    >
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-navy px-6 py-12 text-white shadow-2xl md:px-12 md:py-16">
          <div
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-green-on-dark/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-brand-green-on-dark/40 bg-brand-green-on-dark/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-brand-green-on-dark">
                {t("eyebrow")}
              </p>

              <h2
                id="webbcare-title"
                className="font-display text-4xl font-bold leading-tight md:text-5xl"
              >
                {t("title")}
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                {t("description")}
              </p>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green-on-dark px-7 py-4 font-bold text-brand-navy transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  {t("cta")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {areas.map(({ key, Icon }) => (
                <li
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-brand-green-on-dark/10 p-3 text-brand-green-on-dark">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    {t(`areas.${key}.title`)}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-200">
                    {t(`areas.${key}.text`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

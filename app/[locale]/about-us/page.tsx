import React from "react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { CheckCircle2, BookOpen, Rocket, Building2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AboutUsPage() {
  const t = await getTranslations("aboutUs");

  const points = t.raw("points") as string[];
  const networkTags = t.raw("networkTags") as string[];

  return (
    <>
      <section className="bg-brand-navy pt-32 pb-20" aria-labelledby="about-title">
        <div className="container mx-auto px-6 text-center">
          <span className="text-brand-green-on-dark font-bold tracking-widest uppercase text-sm mb-4 block">
            {t("header.eyebrow")}
          </span>
          <h1 id="about-title" className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            {t.rich("header.title", {
              highlight: (chunks) => (
                <span className="text-brand-green-on-dark">{chunks}</span>
              )
            })}
          </h1>
          <p className="text-slate-200 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
            {t("header.description")}
          </p>
        </div>
      </section>

      <section className="block lg:hidden py-8 px-6 bg-white">
        <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <Image
            src="/teaching.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="py-24" aria-labelledby="journey-title">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
                <Image
                  src="/teaching.jpg"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 id="journey-title" className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                {t("journey.title")}
              </h2>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {t.rich("journey.paragraph1", {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </p>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {t.rich("journey.paragraph2", {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </p>

              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {t.rich("journey.paragraph3", {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label={t("pointsAriaLabel")}>
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-brand-navy font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50" aria-labelledby="pillars-title">
        <div className="container mx-auto px-6">
          <h2 id="pillars-title" className="sr-only">
            {t("pillars.srTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building2 className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("pillars.public.title")}
              </h3>
              <p className="text-slate-700 italic">{t("pillars.public.text")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Rocket className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("pillars.tech.title")}
              </h3>
              <p className="text-slate-700 italic">{t("pillars.tech.text")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("pillars.bridge.title")}
              </h3>
              <p className="text-slate-700 italic">{t("pillars.bridge.text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy text-white overflow-hidden relative" aria-labelledby="network-title">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="network-title" className="font-display text-3xl md:text-4xl font-bold mb-8">
              {t.rich("network.title", {
                highlight: (chunks) => (
                  <span className="text-brand-green-on-dark">{chunks}</span>
                )
              })}
            </h2>

            <p className="font-sans text-xl md:text-2xl leading-relaxed text-slate-200 mb-8">
              {t("network.description")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {networkTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-brand-green-on-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-100 text-center" aria-labelledby="cta-title">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 id="cta-title" className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            {t("cta.description")}
          </p>
          <Link
            href="/contact"
            className="bg-brand-navy text-white font-bold px-12 py-5 rounded-full hover:bg-brand-navy/90 transition-all shadow-lg"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
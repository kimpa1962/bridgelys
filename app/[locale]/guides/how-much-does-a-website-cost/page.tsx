import React from "react";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "guideCost.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HowMuchDoesAWebsiteCostPage() {
  const t = await getTranslations("guideCost");

  const quickPoints = [
    t("section2.item1"),
    t("section2.item2"),
    t("section2.item3"),
  ];

  return (
    <div className="min-h-screen bg-white">
      <section
        className="pt-24 pb-16 bg-brand-navy text-white text-center"
        aria-labelledby="cost-guide-title"
      >
        <div className="container mx-auto px-6">
          <h1
            id="cost-guide-title"
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green-on-dark"
          >
            {t("title")}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="cost-content-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-600">
            <h2
              id="cost-content-title"
              className="text-3xl font-bold text-brand-navy mb-6"
            >
              {t("section1.title")}
            </h2>

            <p>{t("section1.text")}</p>

            <p>{t("section1.paragraph2")}</p>

            <p>{t("section1.paragraph3")}</p>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="cost-fast-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-50 border border-slate-100 rounded-4xl p-8 md:p-10">
            <h2
              id="cost-fast-title"
              className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-8"
            >
              {t("section2.title")}
            </h2>

            <ul className="space-y-4" aria-label={t("section2.ariaLabel")}>
              {quickPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4"
                >
                  <CheckCircle2
                    className="w-5 h-5 mt-1 shrink-0 text-brand-green"
                    aria-hidden="true"
                  />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="cost-drivers-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-600">
            <h2
              id="cost-drivers-title"
              className="text-3xl font-bold text-brand-navy mb-6"
            >
              {t("section3.title")}
            </h2>

            <p>{t("section3.intro")}</p>

            <p>
              <strong>{t("section3.item1Label")}</strong> {t("section3.item1Text")}
            </p>

            <p>
              <strong>{t("section3.item2Label")}</strong> {t("section3.item2Text")}
            </p>

            <p>
              <strong>{t("section3.item3Label")}</strong> {t("section3.item3Text")}
            </p>

            <p>{t("section3.conclusion")}</p>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="cost-quality-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-600">
            <h2
              id="cost-quality-title"
              className="text-3xl font-bold text-brand-navy mb-6"
            >
              {t("section4.title")}
            </h2>

            <p>{t("section4.intro")}</p>

            <p>
              {t("section4.textBeforeLinks")}{" "}
              <Link
                href="/services/accessibility"
                className="text-brand-navy underline hover:text-brand-green transition-colors"
              >
                WCAG
              </Link>{" "}
              {t("section4.middleText")}{" "}
              <Link
                href="/services/seo"
                className="text-brand-navy underline hover:text-brand-green transition-colors"
              >
                SEO
              </Link>
              {t("section4.textAfterLinks")}
            </p>

            <p>{t("section4.conclusion")}</p>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="cost-conclusion-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h2
              id="cost-conclusion-title"
              className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4"
            >
              {t("section5.title")}
            </h2>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              {t("section5.text")}
            </p>

            <p className="text-slate-700 text-lg leading-relaxed">
              {t("section5.linkTextBefore")}{" "}
              <Link
                href="/services/web-development"
                className="text-brand-navy underline hover:text-brand-green transition-colors"
              >
                {t("section5.linkLabel")}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10" aria-labelledby="cost-related-service-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h2
              id="cost-related-service-title"
              className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4"
            >
              {t("relatedService.title")}
            </h2>

            <p className="text-slate-600 text-lg mb-6 max-w-2xl">
              {t("relatedService.description")}
            </p>

            <Link
              href="/services/web-development"
              className="inline-flex items-center gap-2 font-bold text-brand-navy hover:text-brand-green transition-colors"
            >
              {t("relatedService.link")}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10" aria-labelledby="cost-cta-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3
              id="cost-cta-title"
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              {t("cta.title")}
            </h3>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-green-on-dark text-brand-navy px-10 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
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
    namespace: "guideWcag.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function WcagAccessibleWebsitePage() {
  const t = await getTranslations("guideWcag");
  const checklist = t.raw("checklist") as string[];

  return (
    <div className="min-h-screen bg-white">
      <section
        className="pt-24 pb-16 bg-brand-navy text-white text-center"
        aria-labelledby="wcag-guide-title"
      >
        <div className="container mx-auto px-6">
          <h1
            id="wcag-guide-title"
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green-on-dark"
          >
            {t("title")}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="wcag-content-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-600">
            <h2
              id="wcag-content-title"
              className="text-3xl font-bold text-brand-navy mb-6"
            >
              {t("content.title")}
            </h2>
            <p>{t("content.paragraph1")}</p>
            <p>{t("content.paragraph2")}</p>
            <p>{t("content.paragraph3")}</p>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="wcag-synergy-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-600">
            <h2
              id="wcag-synergy-title"
              className="text-3xl font-bold text-brand-navy mb-6"
            >
              {t("synergy.title")}
            </h2>

            <p>{t("synergy.intro")}</p>

            <p>
              <strong>{t("synergy.altTextsLabel")}</strong> {t("synergy.altTextsText")}
            </p>

            <p>
              <strong>{t("synergy.headingStructureLabel")}</strong> {t("synergy.headingStructureText")}
            </p>

            <p>
              <strong>{t("synergy.semanticStructureLabel")}</strong> {t("synergy.semanticStructureText")}
            </p>

            <h3 className="text-2xl font-bold text-brand-navy mt-10 mb-4">
              {t("synergy.procurementTitle")}
            </h3>

            <p>{t("synergy.procurementIntro")}</p>

            <p>
              <strong>{t("synergy.requirementsLabel")}</strong> {t("synergy.requirementsText")}
            </p>

            <p>
              <strong>{t("synergy.analysisLabel")}</strong> {t("synergy.analysisText")}
            </p>

            <p>
              <strong>{t("synergy.educationLabel")}</strong> {t("synergy.educationText")}
            </p>

            <h3 className="text-2xl font-bold text-brand-navy mt-10 mb-4">
              {t("synergy.maintenanceTitle")}
            </h3>

            <p>{t("synergy.maintenanceIntro")}</p>

            <p>
              <strong>{t("synergy.toolsLabel")}</strong> {t("synergy.toolsText")}
            </p>

            <p>
              <strong>{t("synergy.futureProofLabel")}</strong> {t("synergy.futureProofText")}
            </p>

            <p className="mt-8">{t("synergy.conclusion")}</p>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="wcag-checklist-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-50 border border-slate-100 rounded-4xl p-8 md:p-10">
            <h2
              id="wcag-checklist-title"
              className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-8"
            >
              {t("checklistTitle")}
            </h2>

            <ul className="space-y-4" aria-label={t("checklistAria")}>
              {checklist.map((item) => (
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

      <section className="pb-10" aria-labelledby="wcag-related-service-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h2
              id="wcag-related-service-title"
              className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4"
            >
              {t("relatedService.title")}
            </h2>

            <p className="text-slate-600 text-lg mb-6 max-w-2xl">
              {t("relatedService.description")}
            </p>

            <Link
              href="/services/accessibility"
              className="inline-flex items-center gap-2 font-bold text-brand-navy hover:text-brand-green transition-colors"
            >
              {t("relatedService.link")}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10" aria-labelledby="wcag-cta-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3
              id="wcag-cta-title"
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
              {t("cta.button")} <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
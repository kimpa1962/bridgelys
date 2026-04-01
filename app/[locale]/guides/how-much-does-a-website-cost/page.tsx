import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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

export default async function CostGuidePage() {
  const t = await getTranslations("guideCost");

  return (
    <div className="min-h-screen bg-white">
      <section
        className="pt-24 pb-16 bg-brand-navy text-white text-center"
        aria-labelledby="cost-guide-title"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <h1
            id="cost-guide-title"
            className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-green-on-dark"
          >
            {t("title")}
          </h1>

          <p className="text-slate-300 text-lg md:text-xl">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl space-y-10 text-slate-700 leading-relaxed">

          <p>{t("section1.text")}</p>

          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-4">
              {t("section2.title")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("section2.item1")}</li>
              <li>{t("section2.item2")}</li>
              <li>{t("section2.item3")}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-4">
              {t("section3.title")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("section3.item1")}</li>
              <li>{t("section3.item2")}</li>
              <li>{t("section3.item3")}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-4">
              {t("section4.title")}
            </h2>
            <p>
              {t("section4.text")}{" "}
              <Link href="/services/accessibility" className="text-brand-green underline">
                WCAG
              </Link>{" "}
              och{" "}
              <Link href="/services/seo" className="text-brand-green underline">
                SEO
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-4">
              {t("section5.title")}
            </h2>
            <p>
              {t("section5.text")}{" "}
              <Link href="/services/web-development" className="text-brand-green underline">
                webbutveckling
              </Link>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
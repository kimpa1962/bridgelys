import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "servicesPages.educations.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TrainingPage() {
  const t = await getTranslations("servicesPages.educations");

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center" aria-labelledby="educations-title">
        <div className="container mx-auto px-6">
          <h1 id="educations-title" className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green-on-dark">
            {t("hero.title")}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="educations-content-title">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 id="educations-content-title" className="text-3xl font-bold text-brand-navy mb-6">
                {t("content.title")}
              </h2>
              <p>{t("content.paragraph1")}</p>
              <p>{t("content.paragraph2")}</p>
            </div>

            <div className="md:w-1/2 relative h-125 w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/education-img.png"
                alt={t("imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10" aria-labelledby="educations-cta-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3 id="educations-cta-title" className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto italic">
              {t("cta.quote")}
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
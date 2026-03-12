import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Search, BarChart, MousePointer2 } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "servicesPages.seo.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SeoPage() {
  const t = await getTranslations("servicesPages.seo");

  const items = [
    {
      icon: <Search className="text-brand-green" aria-hidden="true" />,
      title: t("items.keyword.title"),
      desc: t("items.keyword.desc"),
    },
    {
      icon: <BarChart className="text-brand-green" aria-hidden="true" />,
      title: t("items.technical.title"),
      desc: t("items.technical.desc"),
    },
    {
      icon: <MousePointer2 className="text-brand-green" aria-hidden="true" />,
      title: t("items.onpage.title"),
      desc: t("items.onpage.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center" aria-labelledby="seo-title">
        <div className="container mx-auto px-6">
          <h1 id="seo-title" className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green-on-dark">
            {t("hero.title")}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="seo-content-title">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 id="seo-content-title" className="text-3xl font-bold text-brand-navy mb-6 text-left">
                {t("content.title")}
              </h2>
              <p>{t("content.paragraph1")}</p>
              <p>{t("content.paragraph2")}</p>

              <div className="grid grid-cols-1 gap-4 mt-8" aria-label={t("itemsAriaLabel")}>
                {items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div>{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-brand-navy">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative h-125 w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/SEO-Work2.png"
                alt={t("imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10" aria-labelledby="seo-cta-title">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-brand-navy p-12 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
            <h3 id="seo-cta-title" className="text-3xl font-bold mb-6">
              {t("cta.title")}
            </h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-green-on-dark text-brand-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              {t("cta.button")} <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
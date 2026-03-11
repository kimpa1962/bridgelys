import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BarChart3, Users, Target, ShieldCheck } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "servicesPages.projectManagement.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectManagementPage() {
  const t = await getTranslations("servicesPages.projectManagement");

  const items = [
    {
      icon: <Target className="w-5 h-5 text-brand-green" />,
      text: t("items.agile"),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-green" />,
      text: t("items.requirements"),
    },
    {
      icon: <Users className="w-5 h-5 text-brand-green" />,
      text: t("items.stakeholder"),
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-brand-green" />,
      text: t("items.budget"),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center" aria-labelledby="pm-title">
        <div className="container mx-auto px-6">
          <h1
            id="pm-title"
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green-on-dark"
          >
            {t("hero.title")}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="pm-content">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="prose prose-lg text-slate-600">
              <h2 id="pm-content" className="text-3xl font-bold text-brand-navy mb-6">
                {t("content.title")}
              </h2>

              <p>{t("content.paragraph1")}</p>
              <p>{t("content.paragraph2")}</p>

              <div className="space-y-4 mt-8" aria-label={t("itemsAriaLabel")}>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-brand-navy font-semibold"
                  >
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-125 rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/project-management-2.jpg"
                alt={t("imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10" aria-labelledby="pm-cta">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-brand-navy p-12 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
            <h3 id="pm-cta" className="text-3xl font-bold mb-6">
              {t("cta.title")}
            </h3>

            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              {t("cta.description")}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-green-on-dark text-brand-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              {t("cta.button")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
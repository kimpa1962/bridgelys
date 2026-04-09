import React from "react";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FileText, ArrowRight, Search, Accessibility } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "guides.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GuidesPage() {
  const t = await getTranslations("guides");

  const items = t.raw("featured.items") as {
    procurement: {
      title: string;
      description: string;
      category: string;
    };
    seo: {
      title: string;
      description: string;
      category: string;
    };
    wcag: {
      title: string;
      description: string;
      category: string;
    };
    cost: {
      title: string;
      description: string;
      category: string;
    };
    agency: {
      title: string;
      description: string;
      category: string;
    };
  };

  const guides = [
    {
      key: "web-procurement-checklist",
      title: items.procurement.title,
      description: items.procurement.description,
      category: items.procurement.category,
    },
    {
      key: "what-is-seo",
      title: items.seo.title,
      description: items.seo.description,
      category: items.seo.category,
    },
    {
      key: "wcag-accessible-website",
      title: items.wcag.title,
      description: items.wcag.description,
      category: items.wcag.category,
    },
    {
      key: "how-much-does-a-website-cost",
      title: items.cost.title,
      description: items.cost.description,
      category: items.cost.category,
    },
    {
      key: "how-to-choose-web-agency",
      title: items.agency.title,
      description: items.agency.description,
      category: items.agency.category,
    },
    
  ];

  const topics = t.raw("topics") as string[];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center" aria-labelledby="guides-title">
        <div className="container mx-auto px-6">
          <h1
            id="guides-title"
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green-on-dark"
          >
            {t.rich("header.title", {
              highlight: (chunks) => (
                <span className="text-brand-green-on-dark">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            {t("header.description")}
          </p>
        </div>
      </section>

      <section className="py-20" aria-labelledby="guides-featured-title">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2
            id="guides-featured-title"
            className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6"
          >
            {t("featured.title")}
          </h2>

          <p className="text-slate-600 text-lg mb-12 max-w-2xl">
            {t("featured.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <article
                key={guide.key}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-brand-navy">
                    {guide.category}
                  </span>
                  <FileText className="w-5 h-5 text-brand-green" aria-hidden="true" />
                </div>

                <h3 className="font-display text-2xl font-bold text-brand-navy mb-4">
                  {guide.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {guide.description}
                </p>

                <Link
                  href={`/guides/${guide.key}`}
                  className="inline-flex items-center gap-2 font-bold text-brand-navy hover:text-brand-green transition-colors"
                >
                  {t("featured.readMore")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50" aria-labelledby="guides-topics-title">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2
            id="guides-topics-title"
            className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4"
          >
            {t("topicsSection.title")}
          </h2>

          <p className="text-slate-600 text-lg mb-10">
            {t("topicsSection.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {topics.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-brand-navy shadow-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="guides-benefits-title">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("benefits.seo.title")}
              </h3>
              <p className="text-slate-700">{t("benefits.seo.text")}</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Accessibility className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("benefits.clarity.title")}
              </h3>
              <p className="text-slate-700">{t("benefits.clarity.text")}</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("benefits.decisions.title")}
              </h3>
              <p className="text-slate-700">{t("benefits.decisions.text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10" aria-labelledby="guides-cta-title">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3
              id="guides-cta-title"
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
              {t("cta.button")}{" "}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
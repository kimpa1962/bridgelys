import React from "react";
import { Link } from "@/i18n/navigation";
import { FileText, Search, Accessibility, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function GuidesPage() {
  const t = await getTranslations("guides");

  const featuredGuides = t.raw("featuredGuides") as {
    slug: string;
    title: string;
    description: string;
    category: string;
  }[];

  const topics = t.raw("topics") as string[];

  return (
    <>
      <section className="bg-brand-navy pt-32 pb-20" aria-labelledby="guides-title">
        <div className="container mx-auto px-6 text-center">
          <span className="text-brand-green-on-dark font-bold tracking-widest uppercase text-sm mb-4 block">
            {t("header.eyebrow")}
          </span>

          <h1
            id="guides-title"
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {t.rich("header.title", {
              highlight: (chunks) => (
                <span className="text-brand-green-on-dark">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-slate-200 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
            {t("header.description")}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="featured-guides-title">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <h2
              id="featured-guides-title"
              className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4"
            >
              {t("featured.title")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t("featured.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <article
                key={guide.slug}
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
                  href={`/guides/${guide.slug}`}
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

      <section className="py-20 bg-slate-50" aria-labelledby="topics-title">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2
              id="topics-title"
              className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4"
            >
              {t("topicsSection.title")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t("topicsSection.description")}
            </p>
          </div>

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

      <section className="py-24 bg-white" aria-labelledby="why-guides-title">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("benefits.seo.title")}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {t("benefits.seo.text")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Accessibility className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("benefits.clarity.title")}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {t("benefits.clarity.text")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-brand-green-on-dark" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
                {t("benefits.decisions.title")}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {t("benefits.decisions.text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24 bg-brand-navy text-white border-t border-white/10 text-center"
        aria-labelledby="guides-cta-title"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <h2
            id="guides-cta-title"
            className="font-display text-2xl md:text-3xl font-bold mb-6"
          >
            {t("cta.title")}
          </h2>

          <p className="text-slate-200 text-lg mb-10 leading-relaxed">
            {t("cta.description")}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-brand-navy font-bold px-12 py-5 rounded-full hover:bg-slate-100 transition-all shadow-lg"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
import React from "react";
import { Target, Shield, Users } from "lucide-react";
import {useTranslations} from "next-intl";

export default function Values() {
  const t = useTranslations("values");
  const priorities = [
    {
      key: "independent",
      Icon: Shield
    },
    {
      key: "clarity",
      Icon: Target
    },
    {
      key: "network",
      Icon: Users
    }
  ];

  return (
    <section className="py-24 bg-brand-navy text-white" aria-labelledby="values-title">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Vänster sida */}
          <div className="lg:w-1/2">
            <h2
              id="values-title"
              className="font-display text-3xl md:text-4xl font-bold mb-6"
            >
              {t("title1")}{" "}
              <span className="text-brand-green-on-dark">{t("title2")}</span> {t("title3")}
            </h2>

            <p className="font-sans text-slate-200 text-lg mb-8 leading-relaxed">
              {t("intro")}
            </p>

            <ul className="space-y-6">
              {priorities.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <div className="mt-1 text-brand-green-on-dark" aria-hidden="true">
                    <item.Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t(`items.${item.key}.title`)}</h3>
                    <p className="text-slate-200">{t(`items.${item.key}.text`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Höger sida */}
          <div className="lg:w-1/2 w-full">
            <figure className="relative p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div
                className="absolute -top-6 -right-6 w-24 h-24 bg-brand-green-on-dark/20 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <blockquote className="relative z-10 font-display text-2xl italic leading-relaxed text-slate-100">
               &quot;{t("quote")}&quot;
              </blockquote>
              <figcaption className="mt-6 text-slate-200 font-bold">
                   {t("quoteBy")}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
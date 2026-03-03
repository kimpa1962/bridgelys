import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Layout,
  ShieldCheck,
  Search,
  GraduationCap,
  Code,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      href: "/services/procurement",
      title: "Upphandlingar",
      Icon: ShoppingCart,
      desc: "Hjälp att formulera kravställning så att du faktiskt får det du betalar för och undviker tekniska låsningar.",
    },
    {
      href: "/services/project-management",
      title: "Projektledning",
      Icon: Layout,
      desc: "Bryggan mellan ledning och utveckling som håller tidsplan, budget och kvalitet genom hela processen.",
    },
    {
      href: "/services/accessibility",
      title: "Tillgänglighet",
      Icon: ShieldCheck,
      desc: "Säkerställer att din webb följer lagkrav (WCAG) och är inkluderande för alla dina besökare.",
    },
    {
      href: "/services/seo",
      title: "SEO-strategi",
      Icon: Search,
      desc: "Strategisk synlighet som gör att rätt kunder hittar till din lösning utan onödiga annonskostnader.",
    },
    {
      href: "/services/educations",
      title: "Utbildningar",
      Icon: GraduationCap,
      desc: "Vi lär din organisation att förstå och förvalta tekniken på egen hand för långsiktig självständighet.",
    },
    {
      href: "/services/web-development",
      title: "Webbutveckling",
      Icon: Code,
      desc: "Modern och skalbar kod genom mitt nätverk av seniora frilansutvecklare och specialister.",
    },
  ];

  return (
    <section id="tjanster" className="py-24 bg-slate-50" aria-labelledby="services-title">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="services-title"
            className="font-display text-3xl md:text-5xl font-bold text-brand-navy mb-4"
          >
            Specialistområden
          </h2>
          <div className="w-24 h-1.5 bg-brand-green mx-auto rounded-full" aria-hidden="true" />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <li key={s.href} className="group">
              <Link
                href={s.href}
                className="
                  block p-10 bg-white border border-slate-100 rounded-3xl relative overflow-hidden
                  transition-all duration-300
                  hover:shadow-2xl hover:-translate-y-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2
                "
                aria-label={`${s.title} – läs mer`}
              >
                {/* Hover/focus-linje */}
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-brand-green transform scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-500"
                  aria-hidden="true"
                />

                <div className="text-brand-green mb-6 inline-block p-4 bg-brand-green/10 rounded-2xl group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                  <s.Icon className="w-8 h-8" aria-hidden="true" />
                </div>

                <h3 className="font-display text-2xl font-bold text-brand-navy mb-4">
                  {s.title}
                </h3>

                <p className="font-sans text-slate-600 leading-relaxed">{s.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
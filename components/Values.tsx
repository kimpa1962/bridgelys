import React from "react";
import { Target, Shield, Users } from "lucide-react";

export default function Values() {
  const priorities = [
    {
      title: "Oberoende rådgivning",
      Icon: Shield,
      text: "Med erfarenhet som systemägare  ser jag till att vi alltid navigerar oberoende av leverantörslöften. Jag sitter på er sida av bordet.",
    },
    {
      title: "Begriplighet",
      Icon: Target,
      text: "Teknik är bara ett verktyg. Som er rådgivare pratar jag klarspråk och ser till att alla i projektet förstår målet.",
    },
    {
      title: "Nätverkets kraft",
      Icon: Users,
      text: "Som er huvudkonsult är jag er personliga kontakt, men genom vårt nätverk av seniora specialister kan vi skala upp för alla typer av projekt.",
    },
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
              Vi prioriterar{" "}
              <span className="text-brand-green-on-dark">effekt</span> framför
              komplexitet
            </h2>

            <p className="font-sans text-slate-200 text-lg mb-8 leading-relaxed">
              För oss handlar det inte om att bygga den mest avancerade tekniken,
              utan om att bygga den rätta lösningen för dina behov. Vi tror på
              långsiktiga relationer där vi tar ansvar för helheten.
            </p>

            <ul className="space-y-6">
              {priorities.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="mt-1 text-brand-green-on-dark" aria-hidden="true">
                    <item.Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-200">{item.text}</p>
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
                &quot;Bridgelys föddes ur idén att tekniska projekt inte misslyckas
                på grund av dålig kod, utan på grund av bristande kommunikation.&quot;
              </blockquote>
              <figcaption className="mt-6 text-slate-200 font-bold">
                — Grundprincip för Bridgelys
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
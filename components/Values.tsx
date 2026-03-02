import React from 'react';
import { Target, Shield, Users } from 'lucide-react';

export default function Values() {
  const priorities = [
    {
      title: "Oberoende rådgivning",
      icon: <Shield className="w-6 h-6" />,
      text: "Med erfarenhet som systemägare  ser jag till att vi alltid navigerar oberoende av leverantörslöften. Jag sitter på er sida av bordet."
    },
    {
      title: "Begriplighet",
      icon: <Target className="w-6 h-6" />,
      text: "Teknik är bara ett verktyg. Som er rådgivare pratar jag klarspråk och ser till att alla i projektet förstår målet."
    },
    {
      title: "Nätverkets kraft",
      icon: <Users className="w-6 h-6" />,
      text: "Som er huvudkonsult är jag er personliga kontakt, men genom vårt nätverk av seniora specialister kan vi skala upp för alla typer av projekt."
    }
  ];

  return (
    <section className="py-24 bg-brand-navy text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Vänster sida: Text */}
          <div className="lg:w-1/2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Vi prioriterar <span className="text-brand-green">effekt</span> framför komplexitet
            </h2>
            <p className="font-sans text-slate-300 text-lg mb-8 leading-relaxed">
              För oss handlar det inte om att bygga den mest avancerade tekniken, utan om att bygga den rätta lösningen för dina behov. Vi tror på långsiktiga relationer där vi tar ansvar för helheten.
            </p>
            <div className="space-y-6">
              {priorities.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 text-brand-green">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Höger sida: En visuell detalj (t.ex. en snygg box) */}
          <div className="lg:w-1/2 w-full">
            <div className="relative p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-green/20 rounded-full blur-3xl" />
              <blockquote className="relative z-10 font-display text-2xl italic leading-relaxed text-slate-200">
                "Bridgelys föddes ur idén att tekniska projekt inte misslyckas på grund av dålig kod, utan på grund av bristande kommunikation."
              </blockquote>
              <p className="mt-6 text-brand-green font-bold">— Grundprincip för Bridgelys</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
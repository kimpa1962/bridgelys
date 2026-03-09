import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, BarChart, MousePointer2 } from 'lucide-react';

export default function SeoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero-sektion */}
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green">
            SEO-optimering
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">
            Synligheten som driver tillväxt
          </p>
        </div>
      </section>

      {/* Innehåll */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-brand-navy mb-6 text-left">Bli hittad av rätt kunder</h2>
              <p>
                SEO handlar om mer än att bara ligga etta på Google. Det handlar om att förstå vad dina kunder faktiskt letar efter och presentera lösningen på ett sätt som både sökrobotar och människor älskar.
              </p>
              <p>
                Vi arbetar med en datadriven metodik där vi optimerar allt från teknisk struktur till innehåll och användarupplevelse.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mt-8">
                {[
                  { icon: <Search />, title: "Sökordsanalys", desc: "Hitta de termer som faktiskt leder till affärer." },
                  { icon: <BarChart />, title: "Teknisk SEO", desc: "Snabbhet, struktur och mobilvänlighet." },
                  { icon: <MousePointer2 />, title: "On-Page optimering", desc: "Relevant innehåll som engagerar." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="text-brand-green">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-brand-navy">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative h-125 w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/SEO-Work2.png" 
                alt="Digital analys och SEO-optimering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-brand-navy p-12 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
            <h3 className="text-3xl font-bold mb-6">Vill du öka din digitala närvaro?</h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Låt oss göra en kostnadsfri analys av din nuvarande synlighet och se hur vi kan hjälpa dig att klättra i resultaten.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-brand-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Boka en analys <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
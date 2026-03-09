import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileSearch, Scale, Gavel, ClipboardCheck } from 'lucide-react';

export default function ProcurementPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero-sektion */}
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green text-left md:text-center">
           Upphandlingar
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest text-left md:text-center">
            Strategiska inköp och träffsäkra krav
          </p>
        </div>
      </section>

      {/* Innehåll */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Expertstöd genom hela processen</h2>
              <p>
                En lyckad upphandling börjar långt innan avtalet skrivs. Det handlar om att ställa rätt krav som balanserar teknisk innovation med affärsmässig stabilitet.
              </p>
              <p>
                Vi stöttar er genom hela processen – från behovsanalys och framtagande av förfrågningsunderlag till utvärdering av anbud och avtalsskrivning.
              </p>
              
              <div className="space-y-6 mt-10">
                {[
                  { icon: <FileSearch className="text-brand-green" />, text: "Behovsanalys & Marknadsskanning" },
                  { icon: <ClipboardCheck className="text-brand-green" />, text: "Kravställning & Uppföljning" },
                  { icon: <Gavel className="text-brand-green" />, text: "Stöd vid offentlig upphandling (LOU)" },
                  { icon: <Scale className="text-brand-green" />, text: "Anbudsutvärdering & Kvalitetssäkring" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 font-semibold text-brand-navy">
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative h-150 w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/procurement-img.jpg" 
                alt="Affärsupphandling och juridisk dokumentation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="pb-24 pt-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ska ni genomföra en upphandling?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto italic">
              &quot;Att göra rätt från början sparar både tid och kapital.&quot;
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-brand-navy px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Boka rådgivning <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
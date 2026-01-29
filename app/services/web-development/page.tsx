import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2, Cpu, Layout } from 'lucide-react';

export default function WebDevPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green">Webbutveckling</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">Modern teknik, hållbara resultat</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Från idé till driftsatt lösning</h2>
              <p>Vi bygger moderna, snabba och säkra webblösningar med fokus på prestanda och användarvänlighet. Med lång erfarenhet av arkitektur och implementation säkerställer vi en hållbar teknisk plattform.</p>
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="flex items-center gap-3 font-semibold text-brand-navy"><Code2 className="text-brand-green" /> Fullstack-utveckling</div>
                <div className="flex items-center gap-3 font-semibold text-brand-navy"><Cpu className="text-brand-green" /> Systemintegrationer</div>
                <div className="flex items-center gap-3 font-semibold text-brand-navy"><Layout className="text-brand-green" /> Responsiv design</div>
              </div>
            </div>
            <div className="md:w-1/2 relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src="/webdev-img.jpg" alt="Webbutveckling" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Redo att bygga något nytt?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto italic">"Vi omsätter era affärsbehov till teknisk verklighet."</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-brand-navy px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Diskutera ert projekt <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
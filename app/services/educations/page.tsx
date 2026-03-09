import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green">Utbildningar</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">Kunskap som bygger framtid</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Skräddarsydd kompetensutveckling</h2>
              <p>Vi erbjuder föreläsningar och workshops inom våra specialistområden. Från teknisk utbildning för utvecklare till strategiska seminarier för ledningsgrupper.</p>
              <p>Målet är alltid att lämna efter oss konkret kunskap som ni kan använda direkt i er vardag.</p>
            </div>
            <div className="md:w-1/2 relative h-125 w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src="/education-img.png" alt="Utbildningar" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Vill ni lyfta teamets kompetens?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto italic">&quot;Investering i kunskap ger alltid bäst avkastning.&quot;</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-brand-navy px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Se våra kursupplägg <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
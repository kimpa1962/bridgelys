import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green">Tillgänglighet</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">Digital inkludering för alla</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">WCAG och lagkrav i praktiken</h2>
              <p>Att skapa tillgängliga digitala tjänster är inte bara en fråga om lagkrav – det handlar om att välkomna alla användare. Vi hjälper er att tolka WCAG-riktlinjerna och omsätta dem i praktisk kod och design.</p>
              <div className="space-y-4 mt-8">
                {["Granskning enligt WCAG 2.1/2.2", "Tillgänglighetsredogörelser", "Strategisk rådgivning inför DOS-lagen"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 font-semibold text-brand-navy">
                    <CheckCircle2 className="text-brand-green w-5 h-5" /> {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative h-125 w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src="/accessibility-img.jpg" alt="Tillgänglighet" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-navy p-12 rounded-[3rem] text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Behöver ni säkra er tillgänglighet?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto italic">&quot;Digital inkludering är en förutsättning för en modern verksamhet.&quot;</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-brand-navy px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Boka rådgivning <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
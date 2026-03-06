import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart3, Users, Target, ShieldCheck } from 'lucide-react';

export default function ProjectManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero-sektion för tjänsten */}
      <section className="pt-24 pb-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-brand-green">
            Projektledning
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest">
            Från vision till verklighet
          </p>
        </div>
      </section>

      {/* Innehållssektion */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="prose prose-lg text-slate-600">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Ledarskap med teknisk förståelse</h2>
              <p>
                Att leda ett IT-projekt handlar om mer än att bara hålla tidsplaner. Det handlar om att förstå tekniken bakom, hantera förväntningar och se till att varje investerad timme skapar faktiskt affärsvärde.
              </p>
              <p>
                Vi erbjuder senior projektledning för både små och stora organisationer, med särskilt fokus på komplexa webbprojekt och systemintegrationer.
              </p>
              
              <div className="space-y-4 mt-8">
                {[
                  { icon: <Target className="w-5 h-5" />, text: "Agila metoder (Scrum/Kanban)" },
                  { icon: <ShieldCheck className="w-5 h-5" />, text: "Kravställning & Uppföljning" },
                  { icon: <Users className="w-5 h-5" />, text: "Stakeholder management" },
                  { icon: <BarChart3 className="w-5 h-5" />, text: "Resurs- & Budgetansvar" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-brand-navy font-semibold">
                    <span className="text-brand-green">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/project-management-2.jpg"  
                alt="projektledning och teamarbete"
                fill
                className="object-cover"
              />
            </div>
          </div>
      
        </div>
      </section>
{/* Kontakt-kort */}
      <section className="pb-24 pt-10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-brand-navy p-12 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
            <h3 className="text-3xl font-bold mb-6">Behöver ni en trygg hand vid rodret?</h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Vi hjälper er att styra projektet rätt från dag ett. Hör av dig för en förutsättningslös diskussion om era kommande behov.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-brand-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Boka ett möte <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
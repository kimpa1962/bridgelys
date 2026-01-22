import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { CheckCircle2, Award, Users, BookOpen } from 'lucide-react';

export default function OmOss() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header - Fokus på erfarenhet */}
      <section className="bg-brand-navy pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-4 block">
            Sedan 1997
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Människan bakom <span className="text-brand-green">bryggan</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
            Jag är en senior full-stack utvecklare och systemägare som drivs av att göra teknik begriplig. 
            Med över 25 års erfarenhet hjälper jag företag att navigera mellan komplex kod och faktiska affärsmål.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Bild & Erfarenhets-badge */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <Image 
                  src="/bridge-hero.jpg" // Ersätt med ditt eget foto när du är redo!
                  alt="Kim Vági - Bridgelys"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-green p-8 rounded-2xl shadow-xl">
                <p className="text-brand-navy font-bold text-3xl leading-none">25+</p>
                <p className="text-brand-navy/90 text-xs uppercase tracking-tighter font-bold mt-1">Års expertis</p>
              </div>
            </div>

            {/* Textinnehåll baserat på ditt CV */}
            <div className="lg:w-1/2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                En digital resa från Perl till Next.js
              </h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Jag började min resa i webbens barndom, en tid då jag kodade i C++, Perl och Java innan dagens ramverk ens var påtänkta. Denna djupa tekniska grund har gett mig en unik förståelse för hur system faktiskt fungerar under huven.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Som tidigare <strong>lärare vid Yrkeshögskolan</strong> och systemägare för stora mediehus, har jag tränat upp förmågan att vara pedagogisk och social – att fungera som den mänskliga länken mellan komplexa IT-system och slutanvändarens behov.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Systemägande & Drift",
                  "Strategisk Upphandling",
                  "Tillgänglighet (WCAG)",
                  "SEO & Trafikanalys",
                  "Projektledning",
                  "Full-stack utveckling"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-brand-navy font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="text-brand-green w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tre pelare - Dina unika värden */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-brand-navy mb-4">Pedagogiskt fokus</h4>
              <p className="text-slate-600 italic">"Jag pratar klarspråk och anpassar budskapet efter mottagaren, från ledningsgrupp till tekniker."</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-brand-navy mb-4">Oberoende rådgivare</h4>
              <p className="text-slate-600 italic">"Jag sitter på din sida av bordet och ser till att tekniska beslut faktiskt gynnar din affär."</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-brand-navy mb-4">Nätverkets kraft</h4>
              <p className="text-slate-600 italic">"Som din kontaktperson skalar jag upp projektet med handplockade seniora specialister vid behov."</p>
            </div>
          </div>
        </div>
      </section>
{/* Sektion: Nätverket - Den personliga byrån */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
        {/* Dekorativt element för att knyta an till "nätverk" */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
              En person, ett helt <span className="text-brand-green">nätverk av kraft</span>
            </h2>
            
            <p className="font-sans text-xl md:text-2xl leading-relaxed text-slate-200 mb-8">
              Som din huvudkonsult är jag din enda kontaktpunkt, men bakom kulisserna samarbetar jag med ett handplockat nätverk av seniora webbutvecklare, designers och SEO-specialister.
            </p>
            
            <p className="font-sans text-lg text-slate-400 leading-relaxed">
              Det gör att Bridgelys kan leverera samma kraft som en stor byrå, men med den personliga kontakten och flexibiliteten hos en nischad konsult.
            </p>
            
            {/* Små ikoner/labels som förstärker budskapet */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {['Senior Design', 'Expert Utveckling', 'Strategisk SEO', 'Projektledning'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-brand-green">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Slutord / Call to Action */}
      <section className="py-24 bg-white border-t border-slate-100 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-6">
            Låt oss bygga nästa bro tillsammans
          </h3>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            Oavsett om det handlar om en teknisk upphandling, en tillgänglighetsrevision eller att ta ett helhetsgrepp om din webbplattform, finns jag här som din strategiska partner.
          </p>


          <button className="bg-brand-navy text-white font-bold px-12 py-5 rounded-full hover:bg-brand-navy/90 transition-all shadow-lg">
            Kontakta mig för ett förutsättningslöst möte
          </button>
        </div>
      </section>
    </main>
  );
}
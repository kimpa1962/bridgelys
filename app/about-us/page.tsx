import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, Users, BookOpen, Rocket, Building2 } from "lucide-react";

export default function OmOss() {
  const points = [
    "Strategisk Upphandling",
    "Offentlig Sektor & Kommun",
    "Systemägande & Drift",
    "Tillgänglighet (WCAG)",
    "Full-stack (från C++ till Next.js)",
    "Pedagogiskt Ledarskap",
  ];

  const networkTags = [
    "Senior Design",
    "Expert Utveckling",
    "Strategisk SEO",
    "Projektledning",
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy pt-32 pb-20" aria-labelledby="about-title">
        <div className="container mx-auto px-6 text-center">
          <span className="text-brand-green-on-dark font-bold tracking-widest uppercase text-sm mb-4 block">
            Sedan webbens barndom
          </span>
          <h1 id="about-title" className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Pionjär med fokus på <span className="text-brand-green-on-dark">människan</span>
          </h1>
          <p className="text-slate-200 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
            Jag fungerar som den strategiska bryggan mellan komplex teknik, 
            politiskt styrda verksamheter och slutanvändarens faktiska behov.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-24" aria-labelledby="journey-title">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Bildsektion */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
                <Image
                  src="/kimpa-cv-images.png"
                  alt="Kollage över Kim Vágis tekniska och pedagogiska resa"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={true}
                />
              </div>
            </div>

            {/* Textsektion */}
            <div className="lg:w-1/2">
              <h2 id="journey-title" className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                Från C++ till Next.js och mobila IT-projekt
              </h2>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Jag började min resa i webbens barndom, en tid då jag kodade i <strong>C++, Perl och Java</strong>. 
                Denna djupa tekniska grund har gett mig en unik förståelse för hur system faktiskt fungerar under huven, 
                långt innan dagens moderna ramverk existerade.
              </p>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Min erfarenhet från <strong>offentlig sektor inom Stockholms stad</strong> är omfattande. 
                Som webbutvecklare var jag med och drev mobila IT-projekt. Genom arbete med upphandlingar, 
                miljöprojekt och vid näringslivskontoret har jag fått en djup insikt i de processer och 
                kravställningar som styr stora, samhällsviktiga organisationer.
              </p>

              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Som tidigare <strong>lärare vid Yrkeshögskolan</strong> och systemägare för stora mediehus, 
                är min största styrka förmågan att vara pedagogisk och social – att göra det komplexa begripligt.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Kompetensområden">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-brand-navy font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="text-brand-green w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tre pelare */}
      <section className="py-20 bg-slate-50" aria-labelledby="pillars-title">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building2 className="w-8 h-8 text-brand-green-on-dark" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">Offentlig sektor-expertis</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Rocket className="w-8 h-8 text-brand-green-on-dark" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">Teknisk pionjär</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-brand-green-on-dark" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">Pedagogisk brygga</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* (Resten av koden med Nätverket och CTA förblir som tidigare...) */}
    </>
  );
}
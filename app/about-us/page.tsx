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
    "Full-stack (från C++ till React)",
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
      {/* Header - Fokus på den mänskliga länken */}
      <section className="bg-brand-navy pt-24 pb-20" aria-labelledby="about-title">
        <div className="container mx-auto px-6 text-center">
          <span className="text-brand-green-on-dark font-bold tracking-widest uppercase text-sm mb-4 block">
            Sedan webbens barndom
          </span>

          <h1
            id="about-title"
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
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
            {/* Ny kollage-bild */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
                <Image
                  src="/kimpa-cv-images.png"
                  alt="Kollage över Kim Vágis erfarenhet: från kod till pedagogik"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={true}
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-brand-green-on-dark p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-brand-navy font-bold text-3xl leading-none">25+</p>
                <p className="text-brand-navy/90 text-xs uppercase tracking-tighter font-bold mt-1">
                  Års expertis
                </p>
              </div>
            </div>

            {/* Uppdaterat Textinnehåll */}
            <div className="lg:w-1/2">
              <h2
                id="journey-title"
                className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6"
              >
                Från C++ till Stockholms första mobila IT-projekt
              </h2>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Jag började min resa i webbens barndom, en tid då jag kodade i <strong>C++, Perl och Java</strong>. 
                Denna djupa tekniska grund har gett mig en unik förståelse för hur system faktiskt fungerar under huven, 
                långt innan dagens moderna ramverk existerade.
              </p>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Min erfarenhet från <strong>offentlig sektor inom Stockholms stad</strong> är omfattande. 
                Som webbutvecklare var jag med och drev stadens <strong>första mobila IT-projekt</strong>. 
                Genom arbete med upphandlingar, miljöprojekt och vid näringslivskontoret har jag fått en djup insikt 
                i de processer och kravställningar som styr stora, samhällsviktiga organisationer.
              </p>

              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Som tidigare <strong>lärare vid Yrkeshögskolan</strong> och systemägare för stora mediehus, 
                är min största styrka förmågan att vara pedagogisk och social – att göra det komplexa begripligt.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Kompetensområden">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-brand-navy font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <CheckCircle2 className="text-brand-green w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tre pelare - Uppdaterade med dina nya erfarenheter */}
      <section className="py-20 bg-slate-50" aria-labelledby="pillars-title">
        <div className="container mx-auto px-6">
          <h2 id="pillars-title" className="sr-only">Mina styrkor</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building2 className="w-8 h-8 text-brand-green-on-dark" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                Offentlig sektor-expertis
              </h3>
              <p className="text-slate-700 italic">
                &quot;Jag förstår kraven bakom kommunala upphandlingar och politiskt styrda projekt.&quot;
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Rocket className="w-8 h-8 text-brand-green-on-dark" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                Teknisk pionjär
              </h3>
              <p className="text-slate-700 italic">
                &quot;Från de första mobila lösningarna till dagens moderna webb – jag har sett resan inifrån.&quot;
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-brand-green-on-dark" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                Pedagogisk brygga
              </h3>
              <p className="text-slate-700 italic">
                &quot;Min bakgrund som lärare gör att jag kan översätta teknik till affärsnytta för alla led.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion: Nätverket - Behålls då det förstärker din roll som kontaktpunkt */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative" aria-labelledby="network-title">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="network-title" className="font-display text-3xl md:text-4xl font-bold mb-8">
              En specialist, ett helt{" "}
              <span className="text-brand-green-on-dark">nätverk av kraft</span>
            </h2>

            <p className="font-sans text-xl md:text-2xl leading-relaxed text-slate-200 mb-8">
              Som din huvudkonsult är jag din enda kontaktpunkt. Min breda bakgrund gör att jag 
              kan leda projekt genom alla faser, från grafisk form och databasarkitektur till 
              slutlig leverans.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {networkTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-brand-green-on-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Slutord / CTA */}
      <section className="py-24 bg-white border-t border-slate-100 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-6">
            Låt oss bygga nästa brygga tillsammans
          </h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            Oavsett om det gäller en tillgänglighetsrevision, en strategisk upphandling 
            eller utveckling av en ny plattform, tar jag med mig 25 års erfarenhet till bordet.
          </p>
          <Link
            href="/contact"
            className="bg-brand-navy text-white font-bold px-12 py-5 rounded-full hover:bg-brand-navy/90 transition-all shadow-lg"
          >
            Kontakta mig
          </Link>
        </div>
      </section>
    </>
  );
}
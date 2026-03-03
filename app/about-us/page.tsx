import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, Users, BookOpen } from "lucide-react";

export default function OmOss() {
  const points = [
    "Systemägande & Drift",
    "Strategisk Upphandling",
    "Tillgänglighet (WCAG)",
    "SEO & Trafikanalys",
    "Projektledning",
    "Full-stack utveckling",
  ];

  const networkTags = [
    "Senior Design",
    "Expert Utveckling",
    "Strategisk SEO",
    "Projektledning",
  ];

  return (
    <>
      {/* Header - Fokus på erfarenhet */}
      <section className="bg-brand-navy pt-32 pb-20" aria-labelledby="about-title">
        <div className="container mx-auto px-6 text-center">
          <span className="text-brand-green-on-dark font-bold tracking-widest uppercase text-sm mb-4 block">
            Sedan 1997
          </span>

          <h1
            id="about-title"
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Människan bakom <span className="text-brand-green-on-dark">bryggan</span>
          </h1>

          <p className="text-slate-200 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
            Jag är en senior full-stack utvecklare och systemägare som drivs av att göra
            teknik begriplig. Med över 25 års erfarenhet hjälper jag företag att navigera
            mellan komplex kod och faktiska affärsmål.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-24" aria-labelledby="journey-title">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Bild & Erfarenhets-badge */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <Image
                  src="/bridge-hero.jpg"
                  alt="CV Kim Vági, grundare av Bridgelys"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={false}
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-brand-green-on-dark p-8 rounded-2xl shadow-xl">
                <p className="text-brand-navy font-bold text-3xl leading-none">25+</p>
                <p className="text-brand-navy/90 text-xs uppercase tracking-tighter font-bold mt-1">
                  Års expertis
                </p>
              </div>
            </div>

            {/* Textinnehåll */}
            <div className="lg:w-1/2">
              <h2
                id="journey-title"
                className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6"
              >
                En digital resa från Perl till Next.js
              </h2>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Jag började min resa i webbens barndom, en tid då jag kodade i C++, Perl och
                Java innan dagens ramverk ens var påtänkta. Denna djupa tekniska grund har
                gett mig en unik förståelse för hur system faktiskt fungerar under huven.
              </p>

              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Som tidigare <strong>lärare vid Yrkeshögskolan</strong> och systemägare för
                stora mediehus, har jag tränat upp förmågan att vara pedagogisk och social
                – att fungera som den mänskliga länken mellan komplexa IT-system och
                slutanvändarens behov.
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

      {/* Tre pelare */}
      <section className="py-20 bg-slate-50" aria-labelledby="pillars-title">
        <div className="container mx-auto px-6">
          <h2 id="pillars-title" className="sr-only">
            Tre pelare
          </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
            <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen
                  className="w-8 h-8 text-brand-green-on-dark"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
            </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                Pedagogiskt fokus
              </h3>
              <p className="text-slate-700 italic">
                &quot;Jag pratar klarspråk och anpassar budskapet efter mottagaren, från ledningsgrupp till tekniker.&quot;
              </p>
            </div>

            <div className="text-center">
            <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Award
                className="w-8 h-8 text-brand-green-on-dark"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                Oberoende rådgivare
              </h3>
              <p className="text-slate-700 italic">
                &quot;Jag sitter på din sida av bordet och ser till att tekniska beslut faktiskt gynnar din affär.&quot;
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users
                  className="w-8 h-8 text-brand-green-on-dark"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                Nätverkets kraft
              </h3>
              <p className="text-slate-700 italic">
                &quot;Som din kontaktperson skalar jag upp projektet med handplockade seniora specialister vid behov.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sektion: Nätverket */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative" aria-labelledby="network-title">
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-brand-green-on-dark/10 rounded-full blur-3xl -mr-32 -mt-32"
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="network-title" className="font-display text-3xl md:text-4xl font-bold mb-8">
              En person, ett helt{" "}
              <span className="text-brand-green-on-dark">nätverk av kraft</span>
            </h2>

            <p className="font-sans text-xl md:text-2xl leading-relaxed text-slate-200 mb-8">
              Som din huvudkonsult är jag din enda kontaktpunkt, men bakom kulisserna
              samarbetar jag med ett handplockat nätverk av seniora webbutvecklare,
              designers och SEO-specialister.
            </p>

            <p className="font-sans text-lg text-slate-300 leading-relaxed">
              Det gör att Bridgelys kan leverera samma kraft som en stor byrå, men med den
              personliga kontakten och flexibiliteten hos en nischad konsult.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-12" aria-label="Kompetens i nätverket">
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
      <section className="py-24 bg-white border-t border-slate-100 text-center" aria-labelledby="cta-title">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2
            id="cta-title"
            className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-6"
          >
            Kontakta mig för ett förutsättningslöst möte
          </h2>

          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            Oavsett om det handlar om en teknisk upphandling, en tillgänglighetsrevision
            eller att ta ett helhetsgrepp om din webbplattform, finns jag här som din
            strategiska partner.
          </p>

          <Link
            href="/contact"
            className="bg-brand-navy text-white font-bold px-12 py-5 rounded-full hover:bg-brand-navy/90 transition-all shadow-lg
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Kontakta mig
          </Link>
        </div>
      </section>
    </>
  );
}
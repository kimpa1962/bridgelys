import React from 'react';
import { ShoppingCart, Layout, ShieldCheck, Search, GraduationCap, Code } from 'lucide-react';

export default function Services() {
  const services = [
    { 
      alink: "/services/procurement",
      title: "Upphandlingar", 
      icon: <ShoppingCart className="w-8 h-8" />, 
      desc: "Hjälp att formulera kravställning så att du faktiskt får det du betalar för och undviker tekniska låsningar." 
    },
    { 
      alink: "/services/project-management",
      title: "Projektledning", 
      icon: <Layout className="w-8 h-8" />, 
      desc: "Bryggan mellan ledning och utveckling som håller tidsplan, budget och kvalitet genom hela processen." 
    },
    { 
      alink: "/services/accessibility",
      title: "Tillgänglighet", 
      icon: <ShieldCheck className="w-8 h-8" />, 
      desc: "Säkerställer att din webb följer lagkrav (WCAG) och är inkluderande för alla dina besökare." 
    },
    { 
      alink: "/services/seo",
      title: "SEO-strategi", 
      icon: <Search className="w-8 h-8" />, 
      desc: "Strategisk synlighet som gör att rätt kunder hittar till din lösning utan onödiga annonskostnader." 
    },
    { 
      alink: "/services/educations",
      title: "Utbildningar", 
      icon: <GraduationCap className="w-8 h-8" />, 
      desc: "Vi lär din organisation att förstå och förvalta tekniken på egen hand för långsiktig självständighet." 
    },
    { 
      alink: "/services/web-development",
      title: "Webbutveckling", 
      icon: <Code className="w-8 h-8" />, 
      desc: "Modern och skalbar kod genom mitt nätverk av seniora frilansutvecklare och specialister." 
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div id="tjanster" className="container mx-auto px-6">
        
        {/* Rubrik för sektionen */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy mb-4">
            Specialistområden
          </h2>
          <div className="w-24 h-1.5 bg-brand-green mx-auto rounded-full" />
        </div>

        {/* Grid-systemet för rutorna */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
           
            <div 
              key={index} 
              className="group p-10 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              {/* En liten visuell detalj: en grön linje som dyker upp vid hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <a href={service.alink}> 
              <div className="text-brand-green mb-6 inline-block p-4 bg-brand-green/10 rounded-2xl group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
             
              <h3 className="font-display text-2xl font-bold text-brand-navy mb-4">
                {service.title}
              </h3>
              
              <p className="font-sans text-slate-600 leading-relaxed">
                {service.desc}
              </p>
               </a>
            </div>
           
          ))}
        </div>
      </div>
    </section>
  );
}
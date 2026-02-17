import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-start justify-center overflow-hidden bg-brand-navy text-white">
      {/* 1. Bakgrundsbild */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-navy/60 z-10" />
        <Image 
          src="/bridge-hero.jpg" 
          alt="Modern bro" 
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 2. Innehåll - Vi använder pt-28 för att styra exakt avstånd från menyn */}
      <div className="container mx-auto px-6 relative z-20 text-center pt-20 pb-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge med minimalt avstånd */}
{/*           <div className="flex flex-col items-center mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand-dark/80 backdrop-blur-lg border border-white/10 rounded-full mb-2 shadow-2xl" aria-hidden="true">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
              </span>
              
              <p className="text-white text-sm md:text-base font-medium tracking-wide">
                När du behöver någon som pratar både{" "}
                <span className="text-brand-green font-bold">människa</span> och{" "}
                <span className="text-brand-green font-bold">utvecklare</span>.
              </p>
            </div>
          </div> */}
          
          {/* Huvudrubrik - Minskad mb-4 för att tajta till det */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            En webbyrå med – <br />
            <span className="text-brand-green underline decoration-brand-green/30">fokus på Människan.</span>
          </h1>

          {/* Beskrivning - Minskad mb-8 */}
          <p className="font-sans text-xl md:text-2xl text-slate-100 mb-8 leading-relaxed opacity-95 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Vi översätter dina affärsmål till tekniska lösningar på ren svenska. 
            Expertstöd vid upphandling, projektledning och webbutveckling.
          </p>

          {/* Knappar */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <a
              href="#tjanster"
              className="w-full sm:w-auto bg-brand-green hover:scale-105 hover:shadow-[0_0_20px_rgba(2,172,167,0.4)] text-brand-navy font-bold px-10 py-5 rounded-full transition-all text-lg cursor-pointer text-center"
            >
              Utforska våra tjänster
            </a>

            <Link
              href="/about-us"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold px-10 py-5 rounded-full transition-all text-lg cursor-pointer text-center"
            >
              Om oss
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
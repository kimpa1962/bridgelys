import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-navy text-white">
      {/* 1. Bakgrundsbild med Next.js Optimering */}
      <div className="absolute inset-0 z-0">
        {/* Overlay som gör bilden marinblå och texten läsbar */}
        <div className="absolute inset-0 bg-brand-navy/60 z-10" />
        
        <Image 
          src="/bridge-hero.jpg" 
          alt="Modern bro som representerar Bridgelys roll som brobyggare mellan behov och kod" 
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 2. Innehåll (Centrerat) */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Liten label högst upp */}
          <span className="inline-block py-1 px-4 rounded-full bg-brand-green text-brand-navy font-bold text-xs mb-8 tracking-[0.2em] uppercase">
            Brobyggaren mellan behov och kod
          </span>
          
          {/* Huvudrubrik med Montserrat (font-display) */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-8">
            Bygger framtiden – <br />
            <span className="text-brand-green underline decoration-brand-green/30">en bro i tagen.</span>
          </h1>

          {/* Beskrivning med Inter (font-sans) */}
          <p className="font-sans text-xl md:text-2xl text-slate-100 mb-12 leading-relaxed opacity-95">
            Vi översätter dina affärsmål till tekniska lösningar på ren svenska. 
            Expertstöd vid upphandling, projektledning och webbutveckling.
          </p>

          {/* Knappar */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Mjuk rullning till tjänsterna */}
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
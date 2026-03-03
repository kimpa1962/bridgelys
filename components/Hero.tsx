import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-start justify-center overflow-hidden bg-brand-navy text-white"
      aria-labelledby="hero-title"
    >
      {/* Bakgrund (dekorativ) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Lite starkare overlay för stabil kontrast */}
        <div className="absolute inset-0 bg-brand-navy/75 z-10" />
        <Image
          src="/hero-background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center pt-20 pb-10">
        <div className="max-w-4xl mx-auto">
          <h1
            id="hero-title"
            className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            Webbyrån med – <br />
            <span className="text-brand-green-on-dark underline decoration-white/20">
              fokus på Människan.
            </span>
          </h1>

          <p className="font-sans text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Vi översätter dina affärsmål till tekniska lösningar på ren svenska.
            Expertstöd vid upphandling, projektledning och webbutveckling.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primär knapp (turkos med mörk text) */}
            <a
              href="#tjanster"
              className="w-full sm:w-auto bg-brand-green-on-dark text-brand-navy font-bold px-10 py-5 rounded-full text-lg text-center
                         shadow-[0_18px_45px_rgba(0,0,0,0.22)]
                         hover:brightness-105 hover:shadow-[0_22px_55px_rgba(0,0,0,0.26)] transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              Utforska våra tjänster
            </a>

            {/* Sekundär knapp (mörk/glasig med vit text) */}
            <Link
              href="/about-us"
              className="w-full sm:w-auto bg-brand-dark/40 backdrop-blur-md border border-white/25 text-white font-bold px-10 py-5 rounded-full text-lg text-center
                         hover:bg-brand-dark/55 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              Om oss
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
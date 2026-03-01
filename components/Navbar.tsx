"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Glöm inte denna för SVG:n!

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tjanster = [
    { namn: "Upphandlingar", href: "/services/procurement" },
    { namn: "Projektledning", href: "/services/project-management" },
    { namn: "Tillgänglighet", href: "/services/accessibility" },
    { namn: "SEO", href: "/services/seo" },
    { namn: "Utbildningar", href: "/services/educations" },
    { namn: "Webbutveckling", href: "/services/web-development" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center"> {/* Höjde höjden till 24 för att ge plats åt slogan */}
          
          {/* LOGOTYP & SLOGAN */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col group w-[180px]">
              {/* Din SVG-logotyp */}
              <Image 
                src="/bridgelys_logo-vector.svg" 
                alt="Bridgelys Logotyp" 
                width={180} 
                height={45} 
                priority
                className="h-auto w-full"
              />
              {/* Slogan: Arial / Grön */}
              <span 
                className="text-[14px] text-brand-green mt-1 font-normal leading-none text-right"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                HUMAN IT&nbsp;
              </span>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-brand-navy font-medium transition-colors">Hem</Link>
            
            {/* DROPDOWN CONTAINER */}
            <div className="relative group">
              <button className="text-gray-600 group-hover:text-brand-navy font-medium flex items-center gap-1 py-8 transition-colors">
                Våra tjänster
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ACTUAL DROPDOWN BOX */}
              <div className="absolute left-0 top-full w-64 bg-white shadow-2xl rounded-xl py-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0">
                {tjanster.map((t, index) => (
                  <Link 
                    key={index} 
                    href={t.href} 
                    className="block px-6 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-brand-green transition-colors font-medium"
                  >
                    {t.namn}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about-us" className="text-gray-600 hover:text-brand-navy font-medium transition-colors">Om Bridgelys</Link>
            <Link href="/contact" className="text-gray-600 hover:text-brand-navy font-medium transition-colors">Kontakt</Link>
            
            <Link href="/join-network" className="bg-brand-navy text-white px-5 py-2.5 rounded-full font-bold hover:bg-opacity-90 transition shadow-md hover:shadow-lg">
              Bli en del av nätverket
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-navy"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1">
          <Link href="/" className="block p-3 text-gray-900 font-medium border-b border-gray-50">Hem</Link>
          <div className="p-3 text-xs font-bold text-brand-green uppercase tracking-wider mt-2">Våra tjänster</div>
          {tjanster.map((t, index) => (
            <Link 
              key={index} 
              href={t.href} 
              className="block pl-6 p-3 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-lg transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.namn}
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Link href="/about-us" className="block p-3 text-gray-900 font-medium">Om oss</Link>
            <Link href="/contact" className="block p-3 text-gray-900 font-medium">Kontakt</Link>
            <Link href="/join-network" className="block p-3 bg-brand-navy text-white text-center rounded-lg font-bold">Bli en del av nätverket</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
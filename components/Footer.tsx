import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 pt-16 pb-8 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Bolagsinfo med Logotyp */}
          <div className="text-left">
            <div className="mb-6">
              <Image 
                src="/bridgelys_logotyp.svg" 
                alt="Bridgelys Logotyp" 
                width={150} 
                height={32} 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-slate-600 mb-4 max-w-sm">
              Vi bygger broar mellan affärsbehov och teknisk excellens genom senior expertis.
            </p>
            <div className="text-sm text-slate-400 space-y-1">
              <p>Org.nr: 559554-3025</p>
              <p>Innehar ansvarsförsäkring och F-skatt</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-left">
            <h4 className="font-bold mb-4 text-lg text-brand-navy uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/" className="hover:text-brand-green transition-colors font-medium">Start</Link></li>
              <li><Link href="/about-us" className="hover:text-brand-green transition-colors font-medium">Om oss</Link></li>
              <li><Link href="/contact" className="hover:text-brand-green transition-colors font-medium">Kontakt</Link></li>
              <li><Link href="/join-network" className="hover:text-brand-green transition-colors font-medium">Bli partner</Link></li>
            </ul>
          </div>

          {/* Kontaktuppgifter enligt bild */}
          <div className="text-left">
            <h4 className="font-bold mb-4 text-lg text-brand-navy uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="font-medium">Stockholm / Johanneshov</li>
              <li className="font-medium">Kim Vági / VD Bridgelys AB</li>
              <li>
                <a href="mailto:hello@bridgelys.se" className="hover:text-brand-green transition-colors font-medium">
                  hello@bridgelys.se
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Bridgelys AB. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
}
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-white text-slate-900 pt-16 pb-8 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Bolagsinfo */}
          <div className="text-left">
            <div className="mb-6">
              <Image
                src="/bridgelys_logo-vector.svg"
                alt="Bridgelys logotyp"
                width={150}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-slate-600 mb-4 max-w-sm">
              Vi bygger broar mellan affärsbehov och teknisk excellens genom senior
              expertis.
            </p>

            <div className="text-sm text-slate-500 space-y-1">
              <p>Org.nr: 559554-3025</p>
              <p>Innehar ansvarsförsäkring och F-skatt</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="text-left" aria-label="Sidfotsnavigation">
            <h2 className="font-bold mb-4 text-lg text-brand-navy uppercase tracking-wider">
              Navigation
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link
                  href="/"
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Start
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Om oss
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/join-network"
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Bli partner
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="text-left">
            <h2 className="font-bold mb-4 text-lg text-brand-navy uppercase tracking-wider">
              Kontakt
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li className="font-medium">Stockholm / Johanneshov</li>
              <li className="font-medium">Kim Vági / VD Bridgelys AB</li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  <Mail
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>Kontakta mig</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kim-vagi-3a8a7055act"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  <Image
                    src="/linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Bridgelys AB. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </div>
  );
}
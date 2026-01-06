"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const tjänster = [
    "Systemutveckling",
    "Cloud & Infrastruktur",
    "Cybersecurity",
    "Data Analytics",
    "Projektledning"
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Höjd på menyn */}
          
          {/* LOGO AREA */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter text-blue-900">
              BRIDGELYS
              {/* Om du har en bildfil sen: <img src="/logo.png" alt="Logo" className="h-12 w-auto" /> */}
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition">Hem</Link>
            
            <div className="relative group" 
                 onMouseEnter={() => setShowSub(true)} 
                 onMouseLeave={() => setShowSub(false)}>
              <button className="hover:text-blue-600 flex items-center gap-1 py-4">
                Våra tjänster
                <svg className={`w-4 h-4 transition-transform ${showSub ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {showSub && (
                <div className="absolute left-0 w-64 bg-white shadow-xl rounded-lg py-3 border border-gray-50 animate-in fade-in slide-in-from-top-2">
                  {tjänster.map((t) => (
                    <Link key={t} href={`/tjanster/${t.toLowerCase()}`} className="block px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition">
                      {t}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/om-oss" className="hover:text-blue-600 transition">Om oss</Link>
            <Link href="/kontakt" className="hover:text-blue-600 transition">Kontakt</Link>
            <Link href="/frilans" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-200">
              Bli en del av nätverket
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/> : <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth="2"/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 shadow-inner">
          <Link href="/" className="block p-3 hover:bg-gray-50 rounded-lg">Hem</Link>
          <div className="p-3 text-xs font-bold text-gray-400 uppercase">Våra tjänster</div>
          {tjänster.map((t) => (
            <Link key={t} href="/" className="block pl-6 p-2 text-sm text-gray-600 hover:text-blue-600">{t}</Link>
          ))}
          <Link href="/om-oss" className="block p-3 hover:bg-gray-50 rounded-lg">Om oss</Link>
          <Link href="/kontakt" className="block p-3 hover:bg-gray-50 rounded-lg">Kontakt</Link>
          <Link href="/frilans" className="block p-4 bg-blue-50 text-blue-700 font-bold rounded-lg text-center">Bli en del av nätverket</Link>
        </div>
      )}
    </nav>
  );
}
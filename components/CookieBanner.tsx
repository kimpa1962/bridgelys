"use client";

import React, { useState, useEffect } from 'react';
import { Cookie, Settings2, ShieldCheck, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('bridgelys-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (allAccepted: boolean) => {
    const consentSettings = {
      necessary: true,
      analytics: allAccepted ? true : analyticsEnabled,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('bridgelys-cookie-consent', 'true');
    localStorage.setItem('bridgelys-detailed-consent', JSON.stringify(consentSettings));
    
    setIsVisible(false);
    // Skicka signalen till formulärsidorna att reCAPTCHA kan laddas
    window.dispatchEvent(new Event('cookie-consent-updated'));
    
    // Här kan du trigga dina analysverktyg om analyticsEnabled är true
    if (consentSettings.analytics) {
      console.log("Analys-kakor aktiverade");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 p-6 relative overflow-hidden">
        
        {/* Dekorativ ikon i bakgrunden */}
        <Cookie className="absolute -right-6 -top-6 w-24 h-24 text-slate-50 -z-0" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-brand-green/10 p-2 rounded-lg">
              <Cookie className="w-5 h-5 text-brand-green" />
            </div>
            <h3 className="font-bold text-brand-navy text-lg">Kakor & integritet</h3>
          </div>
          
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Hej! Jag använder kakor för att webbplatsen ska fungera säkert och för att jag ska kunna se besöksstatistik. Inget säljs vidare och inga personuppgifter sparas.
          </p>

          {/* Inställningsknapp (Toggle-vy) */}
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1 text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 hover:text-brand-green transition-colors"
          >
            {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showSettings ? 'Dölj inställningar' : 'Mina val'}
          </button>

          {showSettings && (
            <div className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in zoom-in-95 duration-200">
              {/* Nödvändiga kakor */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-brand-navy">Nödvändiga</p>
                    <p className="text-xs text-slate-500 italic">Krävs för att formulär och säkerhet (reCAPTCHA) ska fungera. Går ej att stänga av.</p>
                  </div>
                </div>
                <div className="h-6 w-10 bg-brand-green rounded-full flex items-center px-1">
                   <div className="bg-white w-4 h-4 rounded-full shadow-sm translate-x-4"></div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Analyskakor */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <BarChart3 className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-brand-navy">Statistik</p>
                    <p className="text-xs text-slate-500 italic">Hjälper mig se vilka sidor som är populära så jag kan skriva bättre innehåll.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={`h-6 w-10 rounded-full flex items-center px-1 transition-colors ${analyticsEnabled ? 'bg-brand-green' : 'bg-slate-300'}`}
                >
                   <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${analyticsEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => saveConsent(true)}
              className="flex-1 bg-brand-navy text-white text-sm font-bold py-3 rounded-xl hover:bg-opacity-95 hover:shadow-lg transition-all"
            >
              Acceptera alla
            </button>
            <button 
              onClick={() => saveConsent(false)}
              className="flex-1 bg-white text-brand-navy border border-slate-200 text-sm font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
            >
              Spara mina val
            </button>
          </div>
          
          <p className="text-[10px] text-center text-slate-400 mt-4 leading-tight">
            Genom att godkänna hjälper du en frilansare att förstå sin trafik bättre. Tack!
          </p>
        </div>
      </div>
    </div>
  );
}
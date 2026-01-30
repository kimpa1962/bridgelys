"use client";

import React, { useState, useRef, useEffect } from 'react'; // Lagt till useEffect
import ReCAPTCHA from "react-google-recaptcha";
import { Users, Handshake, MessageSquare, Briefcase } from 'lucide-react';

export default function JoinNetworkPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    linkedin: '',
    message: ''
  });

  // Ny state för att hålla koll på kakor
  const [hasConsent, setHasConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Kontrollera samtycke vid sidladdning och lyssna på uppdateringar
  useEffect(() => {
    // 1. Kolla om samtycke redan finns lagrat
    const consent = localStorage.getItem('bridgelys-cookie-consent') === 'true';
    setHasConsent(consent);

    // 2. Lyssna på eventet från CookieBanner om användaren godkänner medan de är på sidan
    const handleConsentChange = () => {
      setHasConsent(true);
    };

    window.addEventListener('cookie-consent-updated', handleConsentChange);
    
    // Städa upp eventlyssnaren när komponenten tas bort
    return () => window.removeEventListener('cookie-consent-updated', handleConsentChange);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Säkerhetskoll om samtycke saknas
    if (!hasConsent) {
      alert("Du behöver godkänna kakor för att kunna skicka formuläret (för spam-skydd).");
      return;
    }

    setStatus('loading');

    const token = await recaptchaRef.current?.getValue();
    
    if (!token) {
      alert("Vänligen bekräfta att du inte är en robot.");
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          gRecaptchaToken: token,
          type: 'partner' 
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', role: '', linkedin: '', message: '' });
        recaptchaRef.current?.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center">
        <div className="text-brand-green text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-bold text-brand-navy mb-4">Tack för din intresseanmälan!</h1>
        <p className="text-slate-600 mb-8 text-lg">
          Det ska bli spännande att kika närmare på din profil. Jag hör av mig så snart jag kan!
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
        >
          Skicka en till anmälan
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Bli en del av <span className="text-brand-green">nätverket</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Jag letar ständigt efter skickliga frilansare som vill samarbeta i utmanande projekt. 
            Låt oss kombinera våra kompetenser för att leverera bästa möjliga resultat.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            
            {/* VÄNSTER KOLUMN: Information & Text */}
            <div className="space-y-10">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Handshake className="text-brand-green w-8 h-8" />
                  <h2 className="text-3xl font-bold text-brand-navy">Registrera ditt intresse</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Skriv gärna några rader om din erfarenhet och dina främsta kompetensområden. 
                  Jag återkopplar personligen för att boka in en förutsättningslös avstämning där vi 
                  kan lära känna varandras arbetssätt bättre.
                </p>
              </div>

              {/* Citat/Info Box */}
              <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-green shadow-sm relative overflow-hidden">
                <MessageSquare className="absolute -right-4 -top-4 w-24 h-24 text-slate-50 -z-0" />
                <p className="text-slate-700 italic text-lg relative z-10">
                  "Att registrera sig är helt kostnadsfritt och innebär inga bindningskrav – 
                  det är helt enkelt en dörr till framtida möjligheter."
                </p>
              </div>

              <div className="flex items-start gap-4 pt-4">
                <div className="bg-brand-navy/10 p-3 rounded-lg">
                  <Briefcase className="text-brand-navy w-6 h-6" />
                </div>
                <div className="text-slate-500 leading-relaxed">
                  <p className="font-semibold text-brand-navy mb-1">Mångsidiga samarbeten</p>
                  <p>Oavsett om du är expert på frontend, backend eller UX, tror jag på kraften i att bygga långsiktiga relationer som gynnar både konsulter och kunder.</p>
                </div>
              </div>
            </div>

            {/* HÖGER KOLUMN: Formuläret */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Namn</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                      placeholder="För- och efternamn" required 
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">E-post</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                      placeholder="din.mejl@exempel.se" required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Specialområde</label>
                    <div className="relative">
                      <select 
                        name="role" value={formData.role} onChange={handleChange} 
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all bg-white appearance-none cursor-pointer"
                        required
                      >
                        <option value="">Välj område...</option>
                        <option value="Frontend-utvecklare">Frontend-utvecklare</option>
                        <option value="Backend-utvecklare">Backend-utvecklare</option>
                        <option value="Fullstack-utvecklare">Fullstack-utvecklare</option>
                        <option value="UX/UI-Designer">UX/UI-Designer</option>
                        <option value="SEO-specialist">SEO-specialist</option>
                        <option value="Projektledare">Projektledare</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">LinkedIn-profil</label>
                    <input 
                      type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                      placeholder="linkedin.com/in/dinnamn" 
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Kort om din erfarenhet och vad du brinner för</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} rows={5} 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none" 
                    placeholder="Berätta lite om vilka tekniker du jobbar med och vilken typ av uppdrag du söker..." required
                  ></textarea>
                </div>

                {/* VILLKORLIG RENDERING AV RECAPTCHA */}
                <div className="flex flex-col justify-start py-2">
                  {hasConsent ? (
                    <ReCAPTCHA 
                      ref={recaptchaRef} 
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} 
                    />
                  ) : (
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 text-left">
                      <p>
                        För att skydda formuläret mot spam behöver du {" "}
                        <span className="font-bold text-brand-navy">godkänna kakor</span>. 
                        Klicka på "Acceptera" i bannern längst ner på sidan för att fortsätta.
                      </p>
                    </div>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-bold italic text-left">
                    Något gick fel. Prova igen eller kontakta mig direkt på hello@bridgelys.se.
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full bg-brand-navy text-white font-bold py-5 rounded-xl transition-all shadow-lg text-lg ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-navy/90 hover:-translate-y-1'}`}
                >
                  {status === 'loading' ? 'Skickar anmälan...' : 'Skicka intresseanmälan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
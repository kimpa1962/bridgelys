"use client"; // Detta krävs för att använda useState och ReCAPTCHA

import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function Kontakt() {
  // 1. Här skapar vi "State" för att hålla koll på vad användaren skriver
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Funktion för att uppdatera state när man skriver i fälten
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Funktionen som körs när man klickar på "Skicka"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Hämta ReCAPTCHA-token
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
        body: JSON.stringify({ ...formData, gRecaptchaToken: token }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' }); // Töm formuläret
        recaptchaRef.current?.reset(); // Nollställ ReCAPTCHA
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
        
      <section className="bg-brand-navy pt-32 pb-16 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Starta en <span className="text-brand-green">konversation</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto font-sans leading-relaxed">
            Fyll i formuläret nedan så återkopplar jag till dig inom kort.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-brand-green text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Tack för ditt meddelande!</h3>
                <p className="text-slate-600">Jag har tagit emot din förfrågan och återkopplar så snart jag kan.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-brand-navy font-bold underline"
                >
                  Skicka ett till meddelande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Namn</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition-all bg-white" 
                      placeholder="Ditt namn" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Företag</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition-all bg-white" 
                      placeholder="Företagsnamn" 
                    />
                  </div>
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">E-post</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition-all bg-white" 
                    placeholder="din.mejl@foretag.se" 
                    required 
                  />
                </div>

                <div className="text-left">
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Meddelande</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6} 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition-all bg-white" 
                    placeholder="Skriv ditt meddelande här..."
                    required
                  ></textarea>
                </div>

                {/* ReCAPTCHA-komponenten */}
                <div className="flex justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-bold text-left italic">
                    Något gick tyvärr fel. Prova att skicka igen eller maila direkt till hello@bridgelys.se.
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full bg-brand-navy text-white font-bold py-5 rounded-xl transition-all shadow-lg text-lg ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-navy/90'}`}
                >
                  {status === 'loading' ? 'Skickar...' : 'Skicka förfrågan'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
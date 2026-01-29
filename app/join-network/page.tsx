"use client";

import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function JoinNetworkPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    linkedin: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <main className="min-h-screen bg-white">
      <section className="bg-brand-navy pt-32 pb-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Bli en del av <span className="text-brand-green">nätverket</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Jag letar alltid efter skickliga frilansare och specialister att samarbeta med i framtida projekt. 
            Fyll i formuläret nedan så hörs vi!
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Namn</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                    placeholder="För- och efternamn" required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">E-post</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                    placeholder="din.mejl@exempel.se" required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Specialområde</label>
                  <select 
                    name="role" value={formData.role} onChange={handleChange} 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all bg-white appearance-none"
                    required
                  >
                    <option value="">Välj område...</option>
                    <option value="Frontend-utvecklare">Frontend-utvecklare</option>
                    <option value="Backend-utvecklare">Backend-utvecklare</option>
                    <option value="Fullstack-utvecklare">Fullstack-utvecklare</option>
                    <option value="UX/UI-Designer">UX/UI-Designer</option>
                    <option value="Projektledare">Projektledare</option>
                    <option value="Annat">Annat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">LinkedIn-profil</label>
                  <input 
                    type="text" 
                    name="linkedin" 
                    value={formData.linkedin} 
                    onChange={handleChange} 
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                    placeholder="linkedin.com/ ....." 
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

              <div className="flex justify-start py-2">
                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} />
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
      </section>
    </main>
  );
}
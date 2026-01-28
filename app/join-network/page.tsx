"use client";

import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function BliPartner() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend-utvecklare',
    linkedin: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
      const response = await fetch('/api/partner', { // Vi skapar denna API-rutt strax
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, gRecaptchaToken: token }),
      });

      if (response.ok) {
        setStatus('success');
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
            Bli en del av <span className="text-brand-green">nätverket</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto font-sans leading-relaxed">
            Vi letar alltid efter seniora frilansare som vill samarbeta i spännande projekt. 
            Anmäl ditt intresse nedan så hörs vi!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-brand-green text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Kul att du vill bli en av oss!</h3>
                <p className="text-slate-600">Jag har tagit emot din intresseanmälan och kikar på din profil inom kort.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Namn</label>
                    <input 
                      type="text" required
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none bg-white" 
                      placeholder="Ditt namn"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Specialistområde</label>
                    <select 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none bg-white"
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option>Frontend-utvecklare</option>
                      <option>Backend-utvecklare</option>
                      <option>Fullstack-utvecklare</option>
                      <option>UX/UI Designer</option>
                      <option>SEO-specialist</option>
                      <option>Projektledare</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">E-post</label>
                  <input 
                    type="email" required
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none bg-white" 
                    placeholder="din.mejl@exempel.se"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">LinkedIn-profil (valfritt)</label>
                  <input 
                    type="url"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none bg-white" 
                    placeholder="https://linkedin.com/in/..."
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-2 ml-1">Kort om din erfarenhet</label>
                  <textarea 
                    rows={4} required
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none bg-white" 
                    placeholder="Berätta lite om vad du brinner för..."
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-brand-navy text-white font-bold py-5 rounded-xl hover:bg-brand-navy/90 transition-all shadow-lg text-lg"
                >
                  {status === 'loading' ? 'Skickar...' : 'Anmäl intresse'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
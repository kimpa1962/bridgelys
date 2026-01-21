"use client"; // VIKTIGT: Detta gör att Hooks fungerar!

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function KontaktPage() {
  // 1. Hook (useState) placeras direkt efter funktionsstarten
  // 'namn' är värdet, 'setNamn' är funktionen vi använder för att ändra värdet.
  const [namn, setNamn] = useState("");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-6">Kontakt</h1>
        
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Vad heter du?
          </label>
          
          <input 
            type="text"
            placeholder="Skriv ditt namn här..."
            // 2. Koppla ihop input-fältet med vårt "minne" (state)
            value={namn} 
            // 3. Varje gång användaren trycker på en tangent, uppdatera minnet:
            onChange={(e) => setNamn(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />

          {/* 4. Visa resultatet i realtid */}
          <div className="mt-6 p-4 bg-slate-50 rounded-md border border-dashed border-slate-300">
            <p className="text-slate-600">
              {namn ? (
                <span>Kul att se dig här, <strong>{namn}</strong>! 👋</span>
              ) : (
                "Här kommer ditt namn dyka upp när du skriver..."
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Rätt expertis. <span className="text-blue-600">On demand.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Bridgelys kopplar samman företag med Nordens vassaste frilanskonsulter inom IT. 
              Vi bygger team som skalar med era behov, utan onödig overhead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
                Hitta en konsult
              </button>
              <button className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition">
                Våra tjänster
              </button>
            </div>
          </div>
        </div>

        {/* En snygg visuell detalj i bakgrunden */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 hidden lg:block">
           <div className="w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>
    </main>
  );
}
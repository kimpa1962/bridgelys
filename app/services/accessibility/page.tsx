import Navbar from '@/components/Navbar';

export default function TillganglighetPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-6">Tillgänglighetsanpassning</h1>
        <p className="text-lg text-slate-600">
          Här beskriver vi hur vi hjälper till med att tillgänglighetsanpassa era webbsidor enligt WCAG 2.0...
        </p>
      </div>
    </main>
  );
}
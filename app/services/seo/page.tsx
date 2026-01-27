import Navbar from '@/components/Navbar';

export default function SeoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-6">SEO</h1>
        <p className="text-lg text-slate-600">
          Här beskriver vi hur vi hjälper till med att sökmotoroptimera era webbsidor...
        </p>
      </div>
    </main>
  );
}
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero'; 
import Services from '@/components/Services';
import Values from '@/components/Values';

export default function Home() {
  return (
    <main>
      <Navbar />  {/* Component Menyn */}
      <Hero /> {/* Component Hero */}
      <Services /> {/* Component rutorna med tjänster */}
      <Values /> {/* Component ingress vad vi gör */}
    </main>
  );
}
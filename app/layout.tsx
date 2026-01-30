import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Bridgelys - Brobyggaren mellan behov och kod",
  description: "Webbkonsult nischad inom upphandling, projektledning och tillgänglighet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900">
        <Navbar /> {/* Läggs till här */}
        
        {children}
        
        <Footer /> {/* Läggs till här */}

        <CookieBanner/>
      </body>
    </html>
  );
}
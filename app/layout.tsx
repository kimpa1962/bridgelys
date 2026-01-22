import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// Vi laddar Inter för brödtext
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Detta matchar namnet i din globals.css
});

// Vi laddar Montserrat för rubriker
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Detta matchar namnet i din globals.css
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
    // Vi lägger till font-variablerna i html-taggen så de blir tillgängliga i hela projektet
    <html lang="sv" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
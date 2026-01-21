import type { Metadata } from "next";
import { Inter, Roboto_Serif } from "next/font/google";
import "./globals.css";

// Konfigurera Inter för brödtext (sans-serif)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Konfigurera Roboto Serif för rubriker (serif)
const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-serif",
});

export const metadata: Metadata = {
  title: "Din Webbplats",
  description: "Beskrivning av din webbplats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${inter.variable} ${robotoSerif.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
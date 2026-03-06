import type { Metadata } from "next";
import React from "react";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// 1. Importera komponenten från det nya biblioteket
import { GoogleAnalytics } from '@next/third-parties/google';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Bridgelys - IT på ren svenska",
  description:
    "Webbkonsult nischad inom upphandling, projektledning, tillgänglighet och SEO.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Hämtar ditt mät-ID från .env.local
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-6MH33N8M4V";

  return (
    <html
      lang="sv"
      className={`${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased bg-white text-slate-900">
        {/* Skip link */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-9999
            rounded-lg bg-white px-4 py-3
            text-slate-900 shadow-lg
          "
        >
          Hoppa till innehåll
        </a>

        <header>
          <Navbar />
        </header>

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <footer>
          <Footer />
        </footer>

        <CookieBanner />

        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    `,
          }}
        />
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import React from "react";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Bridgelys - IT på ren svenska",
  description:
    "Webbkonsult nischad inom upphandling, projektledning, tillgänglighet och SEO.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"
      className={`${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
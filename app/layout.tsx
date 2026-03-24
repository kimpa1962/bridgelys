import type { Metadata } from "next";
import React from "react";
import { Inter, Montserrat, Fira_Sans, Lora } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });


const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fira",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bridgelys.se"),
  title: "Webbutveckling & SEO i Stockholm | Bridgelys",
  description:
    "Webbkonsult nischad inom upphandling, projektledning, tillgänglighet och SEO.",
};

export default async function RootLayout({

  children
}: {
  children: React.ReactNode;
}) {

  const host = (await headers()).get("host") || "";
  const lang = host.includes("bridgelys.com") ? "en" : "sv";
  return (
  <html
    lang={lang}
    className={`${inter.variable} ${montserrat.variable} ${firaSans.variable} ${lora.variable}`}
    suppressHydrationWarning
  >
      <body className="min-h-screen font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
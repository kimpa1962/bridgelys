import React from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {GoogleAnalytics} from "@next/third-parties/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const pathname = headersList.get("x-pathname") || "";

  const isSv = host.includes("bridgelys.se");

  const currentPath = pathname
    .replace(/^\/sv/, "")
    .replace(/^\/en/, "")
    || "";

  const svUrl = `https://bridgelys.se${currentPath}`;
  const enUrl = `https://bridgelys.com${currentPath}`;

  return {
    alternates: {
      canonical: isSv ? svUrl : enUrl,
      languages: {
        sv: svUrl,
        en: enUrl,
        "x-default": svUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,

}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  
  const messages = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <NextIntlClientProvider messages={messages}>
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

        <header className="sticky top-0 z-50">
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
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </NextIntlClientProvider>
    </>
  );
}
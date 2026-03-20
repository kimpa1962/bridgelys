import React from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {GoogleAnalytics} from "@next/third-parties/google";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isSv = locale === "sv";

  return {
    alternates: {
      canonical: isSv
        ? "https://bridgelys.se"
        : "https://bridgelys.com",
      languages: {
        sv: "https://bridgelys.se",
        en: "https://bridgelys.com",
        "x-default": "https://bridgelys.se"
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
import React from "react";
import {headers} from "next/headers";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {GoogleAnalytics} from "@next/third-parties/google";
import {useLocale} from "next-intl";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const headersList = await headers();
  const host = headersList.get("host");
  const baseUrl = `https://${host}`;
  const locale = params.locale;

  return (
    <>
<link rel="alternate" hrefLang="sv" href={`${baseUrl}/sv`} />
<link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
<link rel="alternate" hrefLang="x-default" href={`${baseUrl}/${locale}`} />

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
        <GoogleAnalytics gaId={gaId} />
      </NextIntlClientProvider>
    </>
  );
}
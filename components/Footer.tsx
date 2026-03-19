import React from "react";
import {Link} from "@/i18n/navigation";
import Image from "next/image";
import { Mail } from "lucide-react";
import {useTranslations, useLocale} from "next-intl";


export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  return (
    <div className="bg-white text-slate-900 pt-16 pb-8 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Bolagsinfo */}
          <div className="text-left">
            <div className="mb-6">
              <Image
                src="/Bridgelys-logo-web.svg"
                alt="Bridgelys logotyp"
                width={150}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-slate-600 mb-4 max-w-sm">
              {t("description")}  
            </p>

            <div className="text-sm text-slate-500 space-y-1">
              <p>{t("org")} 559554-3025</p>
              {locale === "en" && (
                <p>{t("vat")} SE559554302501</p>
              )}
              <p>{t("insurance")}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="text-left" aria-label="Sidfotsnavigation">
            <h2 className="font-bold mb-4 text-lg text-brand-navy uppercase tracking-wider">
             {t("navigation")}
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link
                  href={`/`}
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  {t("start")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/about-us`}
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/join-network`}
                  className="font-medium hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                 {t("partner")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="text-left">
            <h2 className="font-bold mb-4 text-lg text-brand-navy uppercase tracking-wider">
              {t("contactTitle")}
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li className="font-medium">{t("location")}</li>
              <li className="font-medium">{t("ceo")}</li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  <Mail
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                 <span>{t("contactMe")}</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kim-vagi-3a8a7055act"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  <Image
                    src="/linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>LinkedIn</span>
                  <span className="sr-only">{t('newTab')}</span>
                </a>
              </li>
              <li>
                <a href="https://www.brainville.com/Network/PublicProfile/Index/59106?sh=51BCF2E11043D87134C72876941247A2" target="_blank" className="group inline-flex items-center gap-2 text-slate-600 hover:text-brand-green transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2" rel="noopener noreferrer">
                  <Image
                    src="https://www.brainville.com/Content/Images/SocialMedia/OnLight_Flat.svg"
                    width={20}
                    height={20}
                    alt=""
                  /> <span>{t("brainville")}</span>
                  <span className="sr-only">{t('newTab')}</span>
                </a>

              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center text-slate-500 text-sm">
         <p>© {new Date().getFullYear()} Bridgelys AB. {t("rights")}</p>
        </div>
      </div>
    </div>
  );
}
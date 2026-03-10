import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage.seo" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <>
      <section className="bg-brand-navy pt-24 pb-16 text-white text-center" aria-labelledby="contact-title">
        <div className="container mx-auto px-6">
          <h1 id="contact-title" className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t.rich("hero.title", {
              highlight: (chunks) => <span className="text-brand-green-on-dark">{chunks}</span>
            })}
          </h1>
          <p className="text-slate-200 text-lg max-w-xl mx-auto font-sans leading-relaxed">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
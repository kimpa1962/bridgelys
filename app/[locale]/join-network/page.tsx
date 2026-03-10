import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import JoinNetworkForm from "./JoinNetworkForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "joinNetworkPage.seo" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function JoinNetworkPage() {
  const t = await getTranslations("joinNetworkPage");

  return (
    <>
      <section
        className="bg-brand-navy pt-24 pb-20 text-white text-center"
        aria-labelledby="join-network-title"
      >
        <div className="container mx-auto px-6">
          <h1 id="join-network-title" className="font-display text-4xl md:text-5xl font-bold mb-6">
            {t.rich("hero.title", {
              highlight: (chunks) => <span className="text-brand-green-on-dark">{chunks}</span>
            })}
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <JoinNetworkForm />
    </>
  );
}
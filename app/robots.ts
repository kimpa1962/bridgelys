import { headers } from "next/headers";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") || "";

  const isCom = host.includes("bridgelys.com");

  const baseUrl = isCom
    ? "https://bridgelys.com"
    : "https://bridgelys.se";

  const sitemap = isCom
    ? `${baseUrl}/sitemap-com.xml`
    : `${baseUrl}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap,
  };
}
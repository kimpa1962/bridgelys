import {getRequestConfig} from "next-intl/server";
import {cookies, headers} from "next/headers";

export default getRequestConfig(async () => {
  const host = (await headers()).get("host") || "";
  const isProductionDomain =
    host.includes("bridgelys.se") || host.includes("bridgelys.com");

  let locale = "sv";

  if (host.includes("bridgelys.com")) {
    locale = "en";
  } else if (!isProductionDomain) {
    const previewLocale = (await cookies()).get("preview-locale")?.value;
    if (previewLocale === "en" || previewLocale === "sv") {
      locale = previewLocale;
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

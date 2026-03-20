import {getRequestConfig} from "next-intl/server";
import {headers} from "next/headers";

export default getRequestConfig(async () => {
  const host = (await headers()).get("host") || "";

  let locale = "sv";

  if (host.includes("bridgelys.com")) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
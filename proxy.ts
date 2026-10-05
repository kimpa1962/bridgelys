import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const {pathname, searchParams} = request.nextUrl;
  const host = request.headers.get("host") || "";
  const isProductionDomain =
    host.includes("bridgelys.se") || host.includes("bridgelys.com");

  // Preview/local testing: use ?lang=en or ?lang=sv without affecting production.
  const previewLocale = searchParams.get("lang");
  if (!isProductionDomain && (previewLocale === "sv" || previewLocale === "en")) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");

    const response = NextResponse.redirect(url);
    response.cookies.set("preview-locale", previewLocale, {
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // Redirect gamla /sv → root (.se) only on production domains.
  if (isProductionDomain && pathname.startsWith("/sv")) {
    const newPath = pathname.replace(/^\/sv/, "") || "/";
    return NextResponse.redirect(`https://bridgelys.se${newPath}`);
  }

  // Redirect gamla /en → .com only on production domains.
  if (isProductionDomain && pathname.startsWith("/en")) {
    const newPath = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(`https://bridgelys.com${newPath}`);
  }

  const response = intlMiddleware(request);
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};

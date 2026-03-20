import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const {pathname} = request.nextUrl;

  // 🔁 Redirect baserat på domän (ta bort /sv /en i URL)
  if (hostname.includes("bridgelys.com") && pathname.startsWith("/sv")) {
    const newPath = pathname.replace("/sv", "");
    return NextResponse.redirect(new URL(newPath || "/", request.url));
  }

  if (hostname.includes("bridgelys.se") && pathname.startsWith("/en")) {
    const newPath = pathname.replace("/en", "");
    return NextResponse.redirect(new URL(newPath || "/", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
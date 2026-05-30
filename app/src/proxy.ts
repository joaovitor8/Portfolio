import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

function detectLocale(req: NextRequest): string {
  const acceptLang = req.headers.get("accept-language") ?? "";
  const langs = acceptLang
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());
  for (const lang of langs) {
    const base = lang.split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclui rotas internas, arquivos estáticos e endpoints de SEO/PWA.
  matcher: [
    "/((?!api|_next|_vercel|robots.txt|sitemap.xml|manifest.webmanifest|favicon.ico|opengraph-image|apple-icon|icon|.*\\..*).*)",
  ],
};

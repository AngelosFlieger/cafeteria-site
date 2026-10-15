import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, hasLocale, locales } from "@/lib/i18n";

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && hasLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const language of preferred) {
    if (hasLocale(language)) return language;
    const base = language.split("-")[0];
    if (base && hasLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameLocale) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", pathnameLocale, {
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

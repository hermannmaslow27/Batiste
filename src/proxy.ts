import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/messages";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

/** Hosts under which a first label is treated as a tenant subdomain. */
const ROOT_DOMAINS = [
  "batiste.app",
  "lvh.me",
  "localhost",
  "batiste-five.vercel.app",
];

function resolveSubdomain(hostname: string): string | null {
  const host = hostname.split(":")[0];
  for (const root of ROOT_DOMAINS) {
    if (host === root || host === `www.${root}`) return null;
    if (host.endsWith(`.${root}`)) {
      const label = host.slice(0, -(root.length + 1));
      if (!label || label === "www" || label === "app") return null;
      return label.split(".")[0];
    }
  }
  return null;
}

function pickLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("batiste_locale")?.value;
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale))
    return cookieLocale;

  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
    if (code && (LOCALES as readonly string[]).includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export default auth((request) => {
  const { pathname, search } = request.nextUrl;

  // Bypasser les routes système et statiques
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/s/") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 1. Détection et réécriture de sous-domaine tenant
  const subdomain = resolveSubdomain(request.headers.get("host") ?? "");
  if (subdomain) {
    const url = request.nextUrl.clone();
    url.pathname = `/s/${subdomain}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. Traitement des locales pour l'application principale
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale =
    segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0]);

  if (!hasLocale) {
    const locale = pickLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    const response = NextResponse.redirect(url);
    response.cookies.set("batiste_locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  // 3. Protection des routes privées
  const isPrivate =
    segments[1] === "dashboard" ||
    segments[1] === "onboarding" ||
    segments[1] === "profile";
  if (isPrivate && !request.auth?.user) {
    const login = request.nextUrl.clone();
    login.pathname = `/${segments[0]}/login`;
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  // 4. Redirection si déjà authentifié sur /login ou /register
  const isAuthRoute = segments[1] === "login" || segments[1] === "register";
  if (isAuthRoute && request.auth?.user) {
    const dashboard = request.nextUrl.clone();
    dashboard.pathname = `/${segments[0]}/dashboard`;
    dashboard.search = "";
    return NextResponse.redirect(dashboard);
  }

  const response = NextResponse.next();
  response.headers.set("x-batiste-locale", segments[0]);
  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
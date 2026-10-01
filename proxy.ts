import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(
    /^\/(provincias|ciudades|articulos)\/([^/]+)\/?$/,
  );

  if (!match) return NextResponse.next();

  let slug: string;
  try {
    slug = decodeURIComponent(match[2]);
  } catch {
    // Leave malformed URLs to the router instead of throwing in Proxy.
    return NextResponse.next();
  }

  const lowercaseSlug = slug.toLowerCase();
  if (slug === lowercaseSlug) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${match[1]}/${encodeURIComponent(lowercaseSlug)}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/provincias/:slug", "/ciudades/:slug", "/articulos/:slug"],
};

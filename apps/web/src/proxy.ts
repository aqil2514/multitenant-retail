import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTES = ["/login", "/register", "/auth"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (res.ok) return res.headers.get("set-cookie");
    return null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    // exp dalam detik, Date.now() dalam milidetik
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  if (isPublicRoute(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Tidak ada kedua token → redirect login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Access token expired atau tidak ada → coba refresh
  const accessExpired = !accessToken || isTokenExpired(accessToken);

  if (accessExpired && refreshToken) {
    const setCookie = await refreshAccessToken(refreshToken);

    if (setCookie) {
      // Redirect ke URL yang sama agar browser ter-refresh dengan cookie baru
      const response = NextResponse.redirect(req.url);
      response.headers.set("set-cookie", setCookie);
      return response;
    }

    return NextResponse.redirect(new URL("/login?reason=expired", req.url));
  }

  // Access token tidak ada dan refresh token tidak ada
  if (accessExpired && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

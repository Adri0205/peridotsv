import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Obtener la cookie de sesión
  const sessionToken = request.cookies.get("better-auth.session_token");

  // Si el usuario está autenticado e intenta acceder a login o registro
  if (sessionToken && (pathname === "/login" || pathname === "/registro")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si el usuario no está autenticado e intenta acceder al admin
  if (!sessionToken && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

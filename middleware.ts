import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PATHS = ["/login"];
const STATIC_PATHS = [
  "/favicon.ico",
  "/_next",
  "/_next/static",
  "/_next/image"
];

const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.some((path) => pathname === path);
const isStaticPath = (pathname: string) =>
  STATIC_PATHS.some((path) => pathname === path || pathname.startsWith(path));

const setDebugHeaders = (
  response: NextResponse,
  pathname: string,
  isAuthed: boolean
) => {
  response.headers.set("x-auth-state", isAuthed ? "authed" : "unauthed");
  response.headers.set("x-path", pathname);
  return response;
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);
  const isLoginRoute = pathname === "/login";
  const isStaticRoute = isStaticPath(pathname);

  if (!isAuthenticated && !isPublicPath(pathname) && !isStaticRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    const nextPath = `${pathname}${search}`;
    url.searchParams.set("next", nextPath);
    return setDebugHeaders(NextResponse.redirect(url), pathname, false);
  }

  if (isAuthenticated && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.searchParams.delete("next");
    return setDebugHeaders(NextResponse.redirect(url), pathname, true);
  }

  if (isAuthenticated && pathname.startsWith("/admin")) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id)
      .single();

    if (error || data?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return setDebugHeaders(NextResponse.redirect(url), pathname, true);
    }
  }

  return setDebugHeaders(response, pathname, isAuthenticated);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

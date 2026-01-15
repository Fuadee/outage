import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PATHS = ["/login"];

const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.some((path) => pathname === path);

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
    data: { session }
  } = await supabase.auth.getSession();

  const isAuthenticated = Boolean(session);
  const isLoginRoute = pathname === "/login";

  if (!isAuthenticated && !isPublicPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    const nextPath = `${pathname}${search}`;
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && pathname.startsWith("/admin")) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session?.user.id)
      .single();

    if (error || data?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

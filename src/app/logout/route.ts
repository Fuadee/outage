import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

async function handleLogout(request: NextRequest) {
  const supabase = createServerClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/login", request.url));
}

export { handleLogout as GET, handleLogout as POST };

import { redirect } from "next/navigation";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/server";

export default async function LogoutPage() {
  const supabase = getSupabaseRouteHandlerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

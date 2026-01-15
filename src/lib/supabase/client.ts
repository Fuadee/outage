import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function createBrowserClient(): SupabaseClient {
  return createSupabaseBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}

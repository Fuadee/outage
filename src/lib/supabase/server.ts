import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export function getSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options });
      }
    },
    headers: {
      "x-client-info": "krabi-outage-app"
    }
  });
}

export function getSupabaseRouteHandlerClient() {
  const cookieStore = cookies();
  const headerStore = headers();
  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options });
      }
    },
    headers: {
      "x-forwarded-host": headerStore.get("x-forwarded-host") ?? "",
      "x-forwarded-proto": headerStore.get("x-forwarded-proto") ?? "",
      "x-client-info": "krabi-outage-app"
    }
  });
}

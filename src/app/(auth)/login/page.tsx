"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextPath, setNextPath] = useState("/dashboard");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next");
    if (nextParam) {
      setNextPath(nextParam);
    }
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <section className="w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Sign in</h1>
          <p className="text-sm text-slate-400">
            Use your Supabase account to access protected dashboards.
          </p>
        </header>

        <form onSubmit={handleSignIn} className="space-y-4">
          <label className="block text-sm text-slate-200">
            Email
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm text-slate-200">
            Password
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button
            className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {errorMessage ? (
          <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {errorMessage}
          </p>
        ) : null}
      </section>
    </div>
  );
}

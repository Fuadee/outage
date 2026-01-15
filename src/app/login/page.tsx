"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signed in successfully. Navigate to the dashboard.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">Sign in</h2>
        <p className="text-sm text-slate-400">
          Use your Supabase Auth credentials to access the dashboard.
        </p>
      </div>
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
          className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-slate-900"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {message ? (
        <p className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200">
          {message}
        </p>
      ) : null}
    </section>
  );
}

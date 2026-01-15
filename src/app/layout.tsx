import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Krabi Outage App",
  description: "Operational tooling for outage job coordination."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-8 lg:flex-row">
          <aside className="flex w-full flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 lg:w-64">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Krabi Outage App
              </p>
              <h1 className="text-xl font-semibold text-white">
                Outage Job Coordination
              </h1>
            </div>
            <nav className="flex flex-col gap-2 text-sm text-slate-200">
              <Link
                className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-slate-500"
                href="/"
              >
                Overview
              </Link>
              <Link
                className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-slate-500"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-slate-500"
                href="/admin"
              >
                Admin
              </Link>
            </nav>
            <div className="mt-auto space-y-3 text-sm text-slate-400">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Account
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-slate-500"
                  href="/login"
                >
                  Sign in
                </Link>
                <Link
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-slate-500"
                  href="/logout"
                >
                  Sign out
                </Link>
              </div>
            </div>
          </aside>
          <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
            <main className="flex-1">{children}</main>
            <footer className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-500">
              Built with Next.js App Router, Tailwind, and Supabase.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

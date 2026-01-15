import "./globals.css";
import type { Metadata } from "next";

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
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Krabi Outage App
              </p>
              <h1 className="text-2xl font-semibold text-white">
                Outage Job Coordination
              </h1>
            </div>
            <nav className="flex items-center gap-3 text-sm text-slate-200">
              <a className="rounded-full border border-slate-700 px-4 py-2" href="/">
                Overview
              </a>
              <a
                className="rounded-full border border-slate-700 px-4 py-2"
                href="/dashboard"
              >
                Dashboard
              </a>
              <a
                className="rounded-full border border-slate-700 px-4 py-2"
                href="/login"
              >
                Sign in
              </a>
            </nav>
          </header>
          <main className="mt-10 flex-1">{children}</main>
          <footer className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-500">
            Built with Next.js App Router, Tailwind, and Supabase.
          </footer>
        </div>
      </body>
    </html>
  );
}

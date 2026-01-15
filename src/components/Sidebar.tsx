import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col gap-6 border-r border-slate-800 bg-slate-950 px-6 py-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Krabi Outage App
        </p>
        <h1 className="text-lg font-semibold text-white">Operations</h1>
      </div>
      <nav className="flex flex-col gap-2 text-sm text-slate-200">
        <Link
          className="rounded-lg border border-slate-800 px-3 py-2 transition hover:border-slate-600"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="rounded-lg border border-slate-800 px-3 py-2 transition hover:border-slate-600"
          href="/admin"
        >
          Admin
        </Link>
        <Link
          className="rounded-lg border border-slate-800 px-3 py-2 transition hover:border-slate-600"
          href="/logout"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}

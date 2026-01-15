import Link from "next/link";

type SidebarProps = {
  email: string;
  role: "admin" | "user" | string;
};

export default function Sidebar({ email, role }: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col gap-6 border-r border-slate-800 bg-slate-950 px-6 py-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Krabi Outage App
        </p>
        <h1 className="text-lg font-semibold text-white">Operations</h1>
        <div className="space-y-1 text-sm text-slate-300">
          <p className="truncate">{email}</p>
          <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-300">
            {role}
          </span>
        </div>
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

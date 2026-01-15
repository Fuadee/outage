import Link from "next/link";
import { STATUSES } from "@/lib/types";

export default function HomePage() {
  return (
    <section className="grid gap-10">
      <div className="grid gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Production-ready coordination
        </p>
        <h2 className="text-4xl font-semibold text-white">
          Manage outage job lifecycles with clear ownership.
        </h2>
        <p className="max-w-2xl text-base text-slate-300">
          The Krabi Outage App keeps dispatchers, supervisors, and onsite teams
          aligned with a consistent workflow and auditable job logs.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
          >
            View dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
          >
            Sign in
          </Link>
        </div>
      </div>
      <div className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Job status pipeline</h3>
          <p className="text-sm text-slate-400">
            Roles interact with outage jobs using shared status markers.
          </p>
        </div>
        <ul className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
          {STATUSES.map((status) => (
            <li
              key={status}
              className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3"
            >
              {status}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ROLE_LABELS, STATUSES } from "@/lib/types";
import { createOutageJob } from "@/app/actions/jobs";

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient();
  const { data: sessionData } = await supabase.auth.getSession();
  const role =
    sessionData.session?.user.app_metadata?.role ?? "dispatcher";

  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Operations dashboard</h2>
        <p className="text-sm text-slate-400">
          Logged in as {ROLE_LABELS[role] ?? role}. Assign and monitor outage jobs
          across teams.
        </p>
      </header>

      <form
        action={createOutageJob}
        className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
      >
        <div>
          <h3 className="text-lg font-semibold text-white">Create outage job</h3>
          <p className="text-sm text-slate-400">
            Dispatchers and supervisors can register new outages for review.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-200">
            Job title
            <input
              name="title"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              placeholder="Transformers scheduled maintenance"
              required
            />
          </label>
          <label className="text-sm text-slate-200">
            Area group
            <input
              name="area_group"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              placeholder="Downtown circuit"
              required
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm text-slate-200">
            Start time
            <input
              name="start_time"
              type="datetime-local"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            />
          </label>
          <label className="text-sm text-slate-200">
            End time
            <input
              name="end_time"
              type="datetime-local"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            />
          </label>
          <label className="text-sm text-slate-200">
            Status
            <select
              name="status"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              defaultValue={STATUSES[0]}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-slate-900"
          type="submit"
        >
          Submit job
        </button>
      </form>

      <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h3 className="text-lg font-semibold text-white">Next steps</h3>
        <ul className="grid gap-2 text-sm text-slate-300">
          <li>Connect Supabase Postgres and run the schema file.</li>
          <li>Assign roles to users via app_metadata.role.</li>
          <li>Configure RLS policies to enforce workflow ownership.</li>
        </ul>
      </section>
    </section>
  );
}

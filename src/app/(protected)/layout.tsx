import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { createServerClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar email={user?.email ?? "Unknown"} />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}

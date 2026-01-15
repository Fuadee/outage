import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "user";

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar email={user.email ?? ""} role={role} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}

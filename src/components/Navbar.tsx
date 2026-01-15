"use client";

import { useRouter } from "next/navigation";

type NavbarProps = {
  email: string;
};

export default function Navbar({ email }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4">
      <p className="text-sm text-slate-200">Logged in as: {email}</p>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
      >
        Logout
      </button>
    </header>
  );
}

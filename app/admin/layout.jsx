import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-utils";
import Sidebar from "./_components/Sidebar";

export default async function AdminLayout({ children }) {
  const session = await requireAdmin();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <Sidebar user={session.user} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

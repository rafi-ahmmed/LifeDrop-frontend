import { Users } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ManageUsersSkeleton } from "@/components/modules/admin/manage-users/manage-users-skeleton";
import { ManageUsersTable } from "@/components/modules/admin/manage-users/manage-users-table";

export const metadata: Metadata = {
  title: "Manage Users",
  description:
    "View donor and patient accounts and manage account access from the LifeDrop admin dashboard.",
};

export default function ManageUsersPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary" />

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            User Administration
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Manage Platform Users
          </h1>
          <p className="text-xs text-muted-foreground">
            View user details, monitor donor and patient accounts, and manage
            account access status.
          </p>
        </div>
      </div>

      <Suspense fallback={<ManageUsersSkeleton />}>
        <ManageUsersTable />
      </Suspense>
    </div>
  );
}

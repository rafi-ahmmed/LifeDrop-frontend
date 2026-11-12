import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { UserRole } from "@/types";
import { DashboardSidebar } from "./dashboard-sidebar";

interface IProps {
  children: ReactNode;
  role: UserRole;
}

export default function DashboardShell({ children, role }: IProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        {/* Sticky Header with border synced to Sidebar Header */}
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1 block md:block lg:block" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
        </header>

        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

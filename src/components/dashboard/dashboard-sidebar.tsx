"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes, donorRoutes, patientRoutes } from "@/routes";
import type { UserRole } from "@/types";
import type { SidebarItems } from "@/types/sidebar.type";

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  ADMIN: adminRoutes,
  SUPER_ADMIN: adminRoutes,
  HOSPITAL: adminRoutes,
  DONOR: donorRoutes,
  PATIENT: patientRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const routes: SidebarItems = sidebarRoutes[role] || [];
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center px-4 border-b">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      render={<Link href={subItem.url} />}
                      isActive={pathname === subItem.url}
                    >
                      {subItem.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
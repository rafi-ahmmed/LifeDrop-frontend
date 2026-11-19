"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Droplet, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { AUTH_KEYS } from "@/lib/tanstack-query/query-keys";
import type { UserRole } from "@/types";
import HeaderSkeleton from "./header-skeleton";
import { ThemeToggle } from "./Theme-toggle";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Campaigns", href: "/campaigns" },
  ];

  const dashboardRoutes: Record<UserRole, string> = {
    ADMIN: "admin",
    SUPER_ADMIN: "admin",
    DONOR: "donor",
    PATIENT: "patient",
  };

  const { data: user, isLoading } = useGetMe();
  console.log("User from navbar==", user);
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role = !!user?.data && user.data.role;
  console.log("role user ==", role);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        console.log("Logout Successful");
        queryClient.removeQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
        toast.add({
          title: "Logout Successful",
          description: "You are now logged out",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        console.log(err);
        toast.add({
          title: "Logout Failed",
          description: "Please try again",
          type: "error",
        });
      },
    });
  };

  if (isLoading) return <HeaderSkeleton />;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto  px-4 md:px-4 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* 1. Left: Logo & Site Name */}
          <Logo />

          {/* 2. Middle: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.name}
                  href={route.href}
                  className={`${isActive && "text-primary"} text-sm font-medium text-muted-foreground hover:text-primary transition-colors`}
                >
                  {route.name}
                </Link>
              );
            })}

            {role && (
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                href={dashboardRoutes[role]}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* 3. Right: Theme Toggle Icon, Login Button & Mobile Sheet Trigger */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle Icon (Right Side) */}
            <ThemeToggle />
            {/* Desktop Login Button */}
            {!isLoading && !user && (
              <Button
                nativeButton={false}
                render={<Link href="/login" />}
                className=" hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
              >
                Login
              </Button>
            )}

            {!isLoading && user && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 hover:bg-red-500/25 text-red-500 font-medium text-sm transition-colors"
              >
                <span>Logout</span>
              </Button>
            )}

            {/* Mobile Sheet Menu */}
            <Sheet>
              <SheetTrigger className="md:hidden p-2 rounded-md text-foreground hover:bg-accent transition-colors">
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              {/* Sheet Content opens from Right */}
              <SheetContent
                side="right"
                className="w-75 sm:w-87.5 bg-background border-border"
              >
                <div className="flex flex-col h-full py-6">
                  {/* Sheet Header / Logo inside mobile drawer */}
                  <div className="flex items-center gap-2 px-2 pb-6 border-b border-border">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Droplet className="w-4 h-4 fill-primary" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-foreground">
                      Life<span className="text-primary">Drop</span>
                    </span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-1 pt-2 px-2">
                    {routes.map((route) => (
                      <SheetClose key={route.name} className="text-left">
                        <Link
                          key={route.name}
                          href={route.href}
                          className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/40"
                        >
                          {route.name}
                        </Link>
                      </SheetClose>
                    ))}
                    {role && (
                      <Link
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        href={dashboardRoutes[role]}
                      >
                        Dashboard
                      </Link>
                    )}
                  </nav>

                  {/* Footer Action inside Sheet (Login Button) */}
                  <div className="mt-auto px-2 pt-4">
                    {!user && !isLoading && (
                      <SheetClose
                        render={
                          <Button
                            nativeButton={false}
                            render={<Link href="/login" />}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md bg-gradient-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                          />
                        }
                      >
                        Login
                      </SheetClose>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

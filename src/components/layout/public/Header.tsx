import { Droplet, Menu, Sun } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./Theme-toggle";

export default function Header() {
  const routes = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto  px-4 md:px-4 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* 1. Left: Logo & Site Name */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                <Droplet className="w-5 h-5 fill-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Life<span className="text-primary">Drop</span>
              </span>
            </Link>
          </div>

          {/* 2. Middle: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {route.name}
              </Link>
            ))}
          </nav>

          {/* 3. Right: Theme Toggle Icon, Login Button & Mobile Sheet Trigger */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle Icon (Right Side) */}
            <ThemeToggle />

            {/* Desktop Login Button */}
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
            >
              Login
            </Link>

            {/* Mobile Sheet Menu */}
            <Sheet>
              <SheetTrigger className="md:hidden p-2 rounded-md text-foreground hover:bg-accent transition-colors">
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              {/* Sheet Content opens from Right */}
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-background border-border"
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
                  </nav>

                  {/* Footer Action inside Sheet (Login Button) */}
                  <div className="mt-auto px-2 pt-4">
                    <SheetClose className="w-full">
                      <Link
                        href="/login"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md bg-gradient-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                      >
                        Login
                      </Link>
                    </SheetClose>
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

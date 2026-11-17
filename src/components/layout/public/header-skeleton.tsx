import Logo from "@/assets/svg/Logo";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-4 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* 1. Left: Actual Logo */}
          <Logo />

          {/* 2. Middle: Desktop Nav Links Skeleton */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </nav>

          {/* 3. Right: Theme Toggle, Auth Button & Mobile Trigger Skeleton */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle Circle Skeleton */}
            <Skeleton className="h-9 w-9 rounded-full" />

            {/* Desktop Login/Logout Button Skeleton */}
            <Skeleton className="hidden sm:inline-flex h-9 w-24 rounded-full" />

            {/* Mobile Sheet Menu Trigger Skeleton */}
            <Skeleton className="md:hidden h-9 w-9 rounded-md" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
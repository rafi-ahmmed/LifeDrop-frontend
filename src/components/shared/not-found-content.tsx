import { ArrowLeft, Droplets, SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type NotFoundContentProps = {
  title?: string;
  description?: string;
  /** Optional in-app destination shown next to the home button. */
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * Shared 404 UI. Kept as a Server Component so it is safe to render from the
 * root not-found.tsx (which Next.js sends with every route).
 */
export default function NotFoundContent({
  title = "Page not found",
  description = "The page you are looking for does not exist, has been moved, or is temporarily unavailable.",
  secondaryHref,
  secondaryLabel = "Go back",
}: NotFoundContentProps) {
  return (
    <main className="flex min-h-[70vh] w-full items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-primary via-rose-500 to-primary" />

        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </div>

        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          404 Error
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3 rounded-2xl border bg-muted/40 px-4 py-3">
          <Droplets className="size-5 shrink-0 text-rose-500" />
          <span className="text-left text-xs text-muted-foreground">
            Every drop counts. Let&apos;s get you back to saving lives.
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            size="sm"
            className="h-9 gap-1.5 rounded-xl text-xs"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>

          {secondaryHref && secondaryHref !== "/" ? (
            <Button
              nativeButton={false}
              render={<Link href={secondaryHref} />}
              variant="outline"
              size="sm"
              className="h-9 rounded-xl text-xs"
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}

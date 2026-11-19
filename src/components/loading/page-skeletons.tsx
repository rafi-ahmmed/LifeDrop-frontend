import { Skeleton } from "@/components/ui/skeleton";

// Stable keys for placeholder rows so lint does not flag array indices.
const slots = (count: number) =>
  Array.from({ length: count }, (_, index) => `slot-${index}`);

function PageHeaderSkeleton({ withBadge = true }: { withBadge?: boolean }) {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-zinc-200 bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-primary via-rose-500 to-primary" />
      <div className="space-y-2">
        {withBadge ? <Skeleton className="h-5 w-36 rounded-full" /> : null}
        <Skeleton className="h-7 w-64 max-w-full" />
        <Skeleton className="h-3 w-80 max-w-full" />
      </div>
      <Skeleton className="h-9 w-28 rounded-xl" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex items-center justify-between border-t pt-3">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

function TableRowsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="hidden grid-cols-6 gap-4 rounded-xl bg-muted/40 px-4 py-3 md:grid">
        {slots(6).map((slot) => (
          <Skeleton key={slot} className="h-3 w-full" />
        ))}
      </div>
      {slots(rows).map((slot) => (
        <div
          key={slot}
          className="grid grid-cols-2 items-center gap-4 rounded-xl border bg-card px-4 py-4 md:grid-cols-6"
        >
          <div className="flex items-center gap-3 md:col-span-2">
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-3.5 w-28 max-w-full" />
              <Skeleton className="h-3 w-20 max-w-full" />
            </div>
          </div>
          {slots(4).map((innerSlot) => (
            <Skeleton key={innerSlot} className="h-3 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Public / marketing                                                         */
/* -------------------------------------------------------------------------- */

export function MarketingHomeSkeleton() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero + live emergency board */}
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div className="flex flex-col justify-center gap-4">
          <Skeleton className="h-6 w-44 rounded-full" />
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-12 w-4/5 max-w-md" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-3/4 max-w-sm" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Skeleton className="h-11 w-40 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-80 w-full rounded-3xl md:h-96" />
      </section>

      {/* Blood group matcher */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <Skeleton className="mx-auto h-8 w-72 max-w-full" />
        <Skeleton className="mx-auto mt-3 h-4 w-96 max-w-full" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {slots(8).map((slot) => (
            <Skeleton key={slot} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Featured campaigns */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-64 max-w-full" />
          </div>
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slots(3).map((slot) => (
            <CardSkeleton key={slot} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <Skeleton className="mx-auto h-8 w-56" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {slots(3).map((slot) => (
            <div
              key={slot}
              className="space-y-3 rounded-2xl border bg-card p-6"
            >
              <Skeleton className="size-12 rounded-2xl" />
              <Skeleton className="h-5 w-40 max-w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      </section>

      {/* Impact stats */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-8">
          {slots(4).map((slot) => (
            <div key={slot} className="space-y-2 text-center">
              <Skeleton className="mx-auto h-9 w-24" />
              <Skeleton className="mx-auto h-3 w-32" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials / FAQ + CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {slots(2).map((slot) => (
            <div
              key={slot}
              className="space-y-4 rounded-2xl border bg-card p-6"
            >
              <Skeleton className="h-5 w-48 max-w-full" />
              {slots(4).map((innerSlot) => (
                <Skeleton key={innerSlot} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ))}
        </div>
        <Skeleton className="mt-8 h-40 w-full rounded-3xl" />
      </section>
    </div>
  );
}

export function AboutPageSkeleton() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Skeleton className="mx-auto h-6 w-40 rounded-full" />
          <Skeleton className="mx-auto h-12 w-full max-w-2xl" />
          <Skeleton className="mx-auto h-4 w-3/4 max-w-xl" />
          <Skeleton className="mx-auto h-4 w-1/2 max-w-md" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {slots(4).map((slot) => (
            <Skeleton key={slot} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-8">
        <Skeleton className="h-72 w-full rounded-3xl md:h-96" />
        <div className="flex flex-col justify-center gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        <Skeleton className="mx-auto h-8 w-56" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slots(6).map((slot) => (
            <div
              key={slot}
              className="space-y-3 rounded-2xl border bg-card p-6"
            >
              <Skeleton className="size-12 rounded-2xl" />
              <Skeleton className="h-5 w-40 max-w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        <Skeleton className="mx-auto h-8 w-64" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slots(4).map((slot) => (
            <div
              key={slot}
              className="space-y-3 rounded-2xl border bg-card p-4"
            >
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <Skeleton className="h-4 w-32 max-w-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </section>

      <Skeleton className="mx-auto mb-16 h-40 w-[calc(100%-2rem)] max-w-7xl rounded-3xl" />
    </div>
  );
}

export function CampaignsPageSkeleton() {
  return (
    <div className="container mx-auto space-y-10 px-4 py-8 md:px-4 md:py-10 lg:px-0">
      <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-8 md:flex-row md:p-10">
        <div className="w-full max-w-2xl space-y-3">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-40 w-full rounded-2xl md:w-64" />
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-full max-w-sm rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slots(6).map((slot) => (
            <CardSkeleton key={slot} />
          ))}
        </div>
        <div className="flex justify-center gap-2 pt-4">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Auth                                                                       */
/* -------------------------------------------------------------------------- */

export function AuthPageSkeleton({
  variant = "login",
}: {
  variant?: "login" | "register" | "verify";
}) {
  return (
    <div className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      <div className="flex h-svh flex-col justify-between overflow-y-auto p-6 sm:p-10 md:p-12">
        <Skeleton className="h-8 w-32" />

        <div className="my-auto flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-sm space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>

            {variant === "register" ? (
              <div className="space-y-5">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
            ) : null}

            {variant === "verify" ? (
              <div className="space-y-5">
                <Skeleton className="mx-auto size-14 rounded-2xl" />
                <Skeleton className="mx-auto h-5 w-40" />
                <div className="flex justify-center gap-2">
                  {slots(6).map((slot) => (
                    <Skeleton key={slot} className="size-11 rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {slots(variant === "register" ? 4 : 2).map((slot) => (
                  <div key={slot} className="space-y-2">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="mx-auto h-4 w-48" />
              </div>
            )}
          </div>
        </div>

        <Skeleton className="h-4 w-56 max-w-full" />
      </div>

      <div className="relative hidden flex-col justify-between overflow-hidden border-l bg-muted/40 p-12 lg:flex">
        <div className="max-w-md space-y-4">
          <Skeleton className="h-6 w-44 rounded-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  );
}

export function SimplePageSkeleton() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <Skeleton className="mx-auto size-16 rounded-2xl" />
        <Skeleton className="mx-auto h-8 w-56" />
        <Skeleton className="mx-auto h-4 w-72 max-w-full" />
        <Skeleton className="mx-auto h-10 w-40 rounded-xl" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Payment                                                                    */
/* -------------------------------------------------------------------------- */

export function PaymentStatusSkeleton() {
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden p-4 md:p-8">
      <div className="w-full max-w-md space-y-6 overflow-hidden rounded-3xl border bg-card p-8 text-center shadow-xl">
        <Skeleton className="mx-auto size-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="mx-auto h-7 w-56" />
          <Skeleton className="mx-auto h-4 w-full" />
          <Skeleton className="mx-auto h-4 w-4/5" />
        </div>
        <div className="space-y-3 rounded-2xl border bg-muted/30 p-4">
          {slots(3).map((slot) => (
            <div key={slot} className="flex items-center justify-between gap-4">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-32" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <Skeleton className="h-10 flex-1 rounded-xl" />
          <Skeleton className="h-10 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export function DashboardOverviewSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <PageHeaderSkeleton />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slots(4).map((slot) => (
          <div
            key={slot}
            className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm"
          >
            <Skeleton className="size-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-16" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {slots(2).map((slot) => (
          <div
            key={slot}
            className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {slots(3).map((innerSlot) => (
                <div
                  key={innerSlot}
                  className="space-y-2 rounded-xl bg-muted/50 p-3"
                >
                  <Skeleton className="mx-auto size-4 rounded-full" />
                  <Skeleton className="mx-auto h-2.5 w-12" />
                  <Skeleton className="mx-auto h-5 w-8" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {slots(2).map((slot) => (
          <div
            key={slot}
            className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3 w-64 max-w-full" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TablePageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <PageHeaderSkeleton />

      <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-10 w-full max-w-sm rounded-xl" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
        <TableRowsSkeleton />
      </div>
    </div>
  );
}

export function CardGridPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots(6).map((slot) => (
          <CardSkeleton key={slot} />
        ))}
      </div>
    </div>
  );
}

export function FormPageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-2 sm:p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <Skeleton className="size-12 shrink-0 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-56 max-w-full" />
            <Skeleton className="h-3 w-80 max-w-full" />
          </div>
        </div>
        <Skeleton className="hidden h-8 w-44 rounded-full lg:block" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-16 rounded-lg" />
        <Skeleton className="h-16 rounded-lg" />
      </div>

      <div className="relative space-y-6 overflow-hidden rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-500/50 via-primary to-rose-500/50" />
        <div className="grid gap-5 sm:grid-cols-2">
          {slots(6).map((slot) => (
            <div key={slot} className="space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <PageHeaderSkeleton />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
          <Skeleton className="mx-auto size-24 rounded-full" />
          <Skeleton className="mx-auto h-5 w-40" />
          <Skeleton className="mx-auto h-3 w-28" />
          <div className="space-y-2 pt-4">
            {slots(4).map((slot) => (
              <Skeleton key={slot} className="h-9 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
          <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
            <Skeleton className="h-5 w-48" />
            <div className="grid gap-5 sm:grid-cols-2">
              {slots(6).map((slot) => (
                <div key={slot} className="space-y-2">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MatchingDonorsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-2 sm:p-4 md:p-6">
      <Skeleton className="h-8 w-40 rounded-lg" />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-4">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slots(6).map((slot) => (
          <CardSkeleton key={slot} />
        ))}
      </div>
    </div>
  );
}

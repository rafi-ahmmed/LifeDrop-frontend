"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

export function DonorFilterSwitches() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const exactDistrict = searchParams.get("exactDistrict") === "true";
  const exactLocation = searchParams.get("exactLocation") === "true";

  const updateFilter = useCallback(
    (key: string, value: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, "true");
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card border border-border rounded-xl">
      <p className="text-sm font-medium text-foreground mr-2">Filter by:</p>

      {/* Exact District */}
      <label
        htmlFor="exactDistrict"
        className="flex items-center gap-2.5 cursor-pointer select-none"
      >
        <Switch
          id="exactDistrict"
          checked={exactDistrict}
          onCheckedChange={(checked) => updateFilter("exactDistrict", checked)}
        />
        <span className="text-sm text-foreground">Exact District</span>
      </label>

      {/* Exact Location */}
      <label
        htmlFor="exactLocation"
        className="flex items-center gap-2.5 cursor-pointer select-none"
      >
        <Switch
          id="exactLocation"
          checked={exactLocation}
          onCheckedChange={(checked) => updateFilter("exactLocation", checked)}
        />
        <span className="text-sm text-foreground">Exact Location</span>
      </label>

      {/* Loading indicator while navigation is pending */}
      {isPending && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
          <Spinner />
          Updating…
        </div>
      )}
    </div>
  );
}

"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CampaignsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Campaigns Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg font-extrabold text-foreground">
            Server Unreachable
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We couldn&apos;t load the campaigns right now. Please check if the
            backend server is running and try again.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="text-xs h-9 gap-1.5 rounded-xl"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Button>
          <Button
            size="sm"
            onClick={() => reset()}
            className="text-xs h-9 gap-1.5 rounded-xl"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
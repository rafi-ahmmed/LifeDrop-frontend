"use client";

import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ForbiddenAccess() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-destructive/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-card/80 backdrop-blur-xl border rounded-2xl p-8 shadow-xl text-center flex flex-col items-center space-y-6 ring-1 ring-destructive/20">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-destructive via-rose-500 to-destructive/60 rounded-t-2xl" />

        <div className="relative flex items-center justify-center mt-2">
          <div className="absolute w-20 h-20 rounded-full bg-destructive/10 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold tracking-wide uppercase">
            Error 403
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Access Forbidden
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed px-2">
            Oops! You don’t have the necessary permissions or role to view this
            page. If you think this is a mistake, please contact system support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-8 relative z-10">
        &copy; {new Date().getFullYear()} LifeDrop. All rights reserved.
      </p>
    </div>
  );
}

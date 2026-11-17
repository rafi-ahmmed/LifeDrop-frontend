"use client"; // Error boundaries must be Client Components

import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorContent({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    document.title = "Error - Something Went Wrong | LifeDrop";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "An unexpected error occurred. Please try again or return to the homepage.",
    );

    console.error("Application Error Boundary Caught:", error);
  }, [error]);

  
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unexpected error occurred while processing your request.";

  const isNetworkError =
    errorMessage.includes("Failed to fetch") ||
    errorMessage.includes("NetworkError") ||
    errorMessage.includes("offline");

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full bg-card border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-sm relative overflow-hidden space-y-6">
        {/* ওপরের গ্রেডিয়েন্ট বর্ডার */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-primary to-rose-500" />

        {/* আইকন ব্যাজ */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20 shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* টাইটেল ও কনটেন্ট */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold tracking-wider uppercase">
            {isNetworkError ? "Connection Error" : "System Error"}
          </span>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Something went wrong!
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {isNetworkError
              ? "Unable to connect to the backend server. Please check if your server is running or try again later."
              : errorMessage}
          </p>
        </div>

        {/* ডিজাইন করা বাটনসমূহ */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="h-9 text-xs font-semibold rounded-xl gap-1.5 cursor-pointer border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="h-9 text-xs font-semibold rounded-xl gap-1.5 cursor-pointer border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Button>

          <Button
            type="button"
            onClick={() => retry()}
            className="h-9 text-xs font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

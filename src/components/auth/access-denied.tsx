import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Icon Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive mb-2">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Access Denied
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You do not have the necessary permissions to view this page. If you
            believe this is a mistake, please contact support or switch to an
            authorized account.
          </p>
        </div>

        {/* Action Button (Without asChild) */}
        <div className="pt-2">
          <Link href="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm inline-flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Go to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

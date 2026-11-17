"use client";

import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AccountRestrictedModalProps {
  open: boolean;
  reason: string;
}

export const AccountRestrictedModal = ({
  open,
  reason,
}: AccountRestrictedModalProps) => {
  const router = useRouter();

  return (
    <Dialog open={open}>
      <DialogContent 
        className="sm:max-w-md rounded-2xl p-6 text-center [&>button]:hidden"
        // [&>button]:hidden দিয়ে ওপরের ক্রস (X) বাটনটি হাইড করা হয়েছে যাতে ইউজার মডাল কেটে দিতে না পারে
      >
        <DialogHeader className="space-y-3 items-center">
          <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <DialogTitle className="text-lg font-bold">
            Account Access Restricted
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            {reason} You cannot perform actions or access restricted dashboard features.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="text-xs h-9 gap-1.5 w-full sm:w-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/")}
            className="text-xs h-9 gap-1.5 w-full sm:w-auto"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Page</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
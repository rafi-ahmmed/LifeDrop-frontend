"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Droplet, Trash2 } from "lucide-react";
import { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { formatBloodGroup } from "@/config/blood-request-status";
import { useDeleteBloodRequest } from "@/hooks/blood-request.hook";
import {
  ADMIN_QUERY_KEYS,
  PATIENT_QUERY_KEYS,
} from "@/lib/tanstack-query/query-keys";
import type { TBloodRequest } from "@/types/blood-request.type";

interface DeleteRequestModalProps {
  request: TBloodRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteRequestModal({
  request,
  open,
  onOpenChange,
}: DeleteRequestModalProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteRequest, isPending } = useDeleteBloodRequest();

  if (!request) return null;

  const handleDelete = () => {
    deleteRequest(request.id, {
      onSuccess: (res: any) => {
        queryClient.invalidateQueries({
          queryKey: [PATIENT_QUERY_KEYS.PATIENT_BLOOD_REQ],
        });
        queryClient.invalidateQueries({
          queryKey: [PATIENT_QUERY_KEYS.PATIENT_STATS],
        });
        queryClient.invalidateQueries({
          queryKey: [ADMIN_QUERY_KEYS.ADMIN_BLOOD_REQs],
        });
        onOpenChange(false);
        toast.add({
          title: res?.message || "Blood Request Deleted",
          description: "Your emergency request has been removed.",
          type: "success",
        });
      },
      onError: (err) => {
        const message =
          err instanceof FetchError
            ? err.data?.message || err.message
            : "Failed to delete request";
        toast.add({
          title: "Delete Failed",
          description: message,
          type: "error",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border">
        {/* Red accent bar on top */}
        <div className="h-1.5 w-full bg-destructive" />

        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-2 text-left">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-1">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <DialogTitle className="text-lg font-bold text-foreground">
              Delete Blood Request?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to delete this emergency blood requisition?
              This action cannot be undone and prospective donors will no longer
              see this request.
            </DialogDescription>
          </DialogHeader>

          {/* Request Quick Summary */}
          <div className="p-3.5 rounded-xl bg-muted/50 border text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">
                Patient:
              </span>
              <span className="font-bold text-foreground">
                {request.patientName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">
                Blood Group & Units:
              </span>
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 fill-rose-600" />
                {formatBloodGroup(request.bloodGroup)} ({request.units} Unit
                {request.units > 1 ? "s" : ""})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">
                Hospital / Location:
              </span>
              <span className="text-muted-foreground truncate max-w-[200px]">
                {request.district}
              </span>
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="rounded-xl h-10 px-4 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={handleDelete}
              className="rounded-xl h-10 px-4 text-xs font-semibold gap-1.5"
            >
              {isPending ? (
                <>
                  <Spinner /> Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Request
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

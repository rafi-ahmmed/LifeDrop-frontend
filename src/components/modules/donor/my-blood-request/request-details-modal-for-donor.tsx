"use client";

import { Calendar, Droplet, FileText, MapPin, Phone, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TDonorRequest } from "@/types/donor-request.type";

interface RequestDetailsModalProps {
  request: TDonorRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RequestDetailsModalForDonor = ({
  request,
  open,
  onOpenChange,
}: RequestDetailsModalProps) => {
  if (!request) return null;

  const { bloodRequest, status, message, createdAt } = request;

  const formatBloodGroup = (bg: string) =>
    bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between pr-4">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-extrabold">
                {formatBloodGroup(bloodRequest.bloodGroup)}
              </span>
              <span>Blood Request Details</span>
            </DialogTitle>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {status}
            </span>
          </div>
          <DialogDescription className="text-xs pt-1">
            Requested on{" "}
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          <div className="grid grid-cols-2 gap-3 bg-muted/40 p-3.5 rounded-xl border border-dashed">
            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary" /> Patient Name
              </p>
              <p className="font-bold text-foreground text-sm">
                {bloodRequest.patientName}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-primary" /> Blood & Gender
              </p>
              <p className="font-bold text-foreground text-sm">
                {formatBloodGroup(bloodRequest.bloodGroup)} (
                {bloodRequest.gender})
              </p>
            </div>
          </div>

          <div className="space-y-2.5 bg-card border rounded-xl p-3.5">
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground">Contact Number</p>
                <p className="font-semibold text-foreground">
                  {bloodRequest.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground">Hospital / Location</p>
                <p className="font-semibold text-foreground">
                  {bloodRequest.address}, {bloodRequest.district}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground">Needed Date & Time</p>
                <p className="font-semibold text-foreground">
                  {new Date(bloodRequest.neededAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/40 p-3.5 rounded-xl space-y-1.5">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" /> Medical Reason:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {bloodRequest.reason || "Emergency medical requirement."}
            </p>
            {message && (
              <div className="pt-2 border-t border-dashed mt-2">
                <p className="font-semibold text-foreground">Note:</p>
                <p className="text-muted-foreground">{message}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

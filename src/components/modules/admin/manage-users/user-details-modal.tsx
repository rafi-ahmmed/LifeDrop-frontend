"use client";

import {
  BadgeCheck,
  Calendar,
  Droplet,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TUserItem } from "@/types";

interface UserDetailsModalProps {
  user: TUserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserDetailsModal = ({
  user,
  open,
  onOpenChange,
}: UserDetailsModalProps) => {
  if (!user) return null;

  const formatBloodGroup = (bg: string) =>
    bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");

  const profilePhone = user.donor?.phone || user.patient?.phone || "N/A";
  const profileAddress =
    user.donor?.address || user.patient?.address || "Not provided";
  const profileDistrict =
    user.donor?.district || user.patient?.district || "N/A";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between pr-4">
            <DialogTitle className="text-lg font-bold flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="flex items-center gap-1.5">
                  {user.name}
                  {user.isVerified && (
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                  )}
                </span>
                <p className="text-xs font-normal text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DialogTitle>

            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                user.status === "ACTIVE"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 border-rose-500/20"
              }`}
            >
              {user.status}
            </span>
          </div>
          <DialogDescription className="text-[11px] pt-1">
            User ID: {user.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* অ্যাকাউন্ট ইনফরমেশন */}
          <div className="grid grid-cols-2 gap-3 bg-muted/40 p-3.5 rounded-xl border border-dashed">
            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-primary" /> Role & Provider
              </p>
              <p className="font-bold text-foreground">
                {user.role} ({user.authProvider})
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Joined Date
              </p>
              <p className="font-bold text-foreground">
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* কন্টাক্ট ও লোকেশন (Donor / Patient প্রোফাইল থাকলে) */}
          {(user.donor || user.patient) && (
            <div className="space-y-2.5 bg-card border rounded-xl p-3.5">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <p className="font-semibold text-foreground">
                    {profilePhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Address & District</p>
                  <p className="font-semibold text-foreground">
                    {profileAddress}
                    {profileDistrict !== "N/A" ? `, ${profileDistrict}` : ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* শুধুমাত্র DONOR হলে অতিরিক্ত তথ্য */}
          {user.donor && (
            <div className="grid grid-cols-2 gap-3 bg-primary/5 border border-primary/15 p-3.5 rounded-xl">
              <div className="space-y-1">
                <p className="text-muted-foreground flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-primary" /> Blood Group &
                  Gender
                </p>
                <p className="font-extrabold text-primary text-sm">
                  {formatBloodGroup(user.donor.bloodGroup)} ({user.donor.gender}
                  )
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-primary" /> Availability
                </p>
                <p className="font-bold text-foreground">
                  {user.donor.availability
                    ? "Available to Donate"
                    : "Unavailable"}
                </p>
              </div>

              <div className="col-span-2 pt-2 border-t border-primary/10 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Last Donated:</span>
                <span className="font-semibold text-foreground">
                  {user.donor.lastDonatedAt
                    ? new Date(user.donor.lastDonatedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "Never Donated"}
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

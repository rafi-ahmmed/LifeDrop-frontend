"use client";

import {
  Activity,
  BadgeCheck,
  Cake,
  Calendar,
  Droplet,
  HeartHandshake,
  KeyRound,
  MapPin,
  Pencil,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { ProfileEditForm } from "@/components/from/profile-edit-form";
import { Button } from "@/components/ui/button";
import { useGetMeSuspense } from "@/hooks";
import type { TUserItem } from "@/types";
import { ProfileAvatarUploader } from "../profile-avatar-uploader";

export const DonorProfileContent = () => {
  const { data: response } = useGetMeSuspense();
  const user: TUserItem = response.data;
  const donor = user.donor;
  const [isEditing, setIsEditing] = useState(false);

  const formatBloodGroup = (bg?: string) =>
    bg ? bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-") : "N/A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-4 bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm text-center space-y-5">
        <ProfileAvatarUploader user={user} />

        <div className="space-y-1">
          <h1 className="text-lg font-extrabold text-foreground flex items-center justify-center gap-1.5">
            <span>{user.name}</span>
            {user.isVerified && (
              <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
            )}
          </h1>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {donor?.bloodGroup && (
            <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-primary text-primary-foreground">
              {formatBloodGroup(donor.bloodGroup)}
            </span>
          )}
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
              donor?.availability
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-600 border-rose-500/20"
            }`}
          >
            {donor?.availability ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="border-t pt-4 space-y-2.5 text-left text-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-primary" /> Provider
            </span>
            <span className="font-semibold text-foreground">
              {user.authProvider}
            </span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" /> Joined
            </span>
            <span className="font-semibold text-foreground">
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* ডান কলাম (৮ কলাম): ডোনার মেডিকেল ও কন্টাক্ট ডিটেইলস */}
      <div className="lg:col-span-8 space-y-6">
        {/* সেকশন ১: কন্টাক্ট ও লোকেশন (এডিটেবল) */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3.5">
            <div>
              <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Contact & Location
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Keep your location and phone number updated so patients can
                reach you.
              </p>
            </div>

            {!isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="h-8 text-xs gap-1.5"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Button>
            )}
          </div>

          {isEditing ? (
            <ProfileEditForm user={user} onCancel={() => setIsEditing(false)} />
          ) : (
            <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 text-xs">
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
                </span>
                <span className="font-semibold text-foreground">
                  {donor?.phone || "Not provided"}
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> District
                </span>
                <span className="font-semibold text-foreground">
                  {donor?.district || "Not provided"}
                </span>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Street Address
                </span>
                <span className="font-semibold text-foreground">
                  {donor?.address || "Not provided"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* সেকশন ২: মেডিকেল ও ডোনেশন হিস্ট্রি */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-foreground border-b pb-3.5 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-primary" /> Medical &
            Donation Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-muted/40 space-y-1">
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-primary" /> Group & Gender
              </p>
              <p className="font-bold text-foreground text-sm">
                {formatBloodGroup(donor?.bloodGroup)} • {donor?.gender || "N/A"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 space-y-1">
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Cake className="w-3.5 h-3.5 text-primary" /> Date of Birth
              </p>
              <p className="font-bold text-foreground text-sm">
                {donor?.dateOfBirth
                  ? new Date(donor.dateOfBirth).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not Set"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 space-y-1">
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-primary" /> Last Donated
              </p>
              <p className="font-bold text-foreground text-sm">
                {donor?.lastDonatedAt
                  ? new Date(donor.lastDonatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Never Donated"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

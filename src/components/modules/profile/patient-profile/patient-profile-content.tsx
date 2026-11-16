"use client";

import {
  BadgeCheck,
  Calendar,
  KeyRound,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { ProfileEditForm } from "@/components/from/profile-edit-form";
import { Button } from "@/components/ui/button";
import { useGetMeSuspense } from "@/hooks";
import type { TUserItem } from "@/types";
import { ProfileAvatarUploader } from "../profile-avatar-uploader";

export const PatientProfileContent = () => {
  const { data: response } = useGetMeSuspense();
  const user: TUserItem = response.data;
  const patient = user.patient;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* বাম কলাম (৪ কলাম): আইডেন্টিটি সামারি কার্ড */}
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

        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
            {user.role}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            {user.status}
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

      {/* ডান কলাম (৮ কলাম): ডিটেইলস ও এডিট সেকশন */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3.5">
            <div>
              <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Personal & Contact
                Details
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Manage your phone number and location for emergency blood
                requests.
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
                  <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
                </span>
                <span className="font-semibold text-foreground">
                  {user.email}
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
                </span>
                <span className="font-semibold text-foreground">
                  {patient?.phone || "Not provided"}
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> District
                </span>
                <span className="font-semibold text-foreground">
                  {patient?.district || "Not provided"}
                </span>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Street Address
                </span>
                <span className="font-semibold text-foreground">
                  {patient?.address || "Not provided"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* অ্যাকাউন্ট সিকিউরিটি নোট */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                Verified Patient Account
              </p>
              <p className="text-[11px] text-muted-foreground">
                Last updated on{" "}
                {new Date(user.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

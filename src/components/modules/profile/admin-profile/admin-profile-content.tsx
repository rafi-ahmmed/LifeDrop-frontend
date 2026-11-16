"use client";

import {
  BadgeCheck,
  Calendar,
  KeyRound,
  Mail,
  ShieldAlert,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { useGetMeSuspense } from "@/hooks";
import type { TUserItem } from "@/types";
import { ProfileAvatarUploader } from "../profile-avatar-uploader";

export const AdminProfileContent = () => {
  const { data: response } = useGetMeSuspense();
  const user: TUserItem = response.data;

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

        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
            {user.role}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            {user.status}
          </span>
        </div>
      </div>

      {/* ডান কলাম: সিস্টেম ও সিকিউরিটি ইনফো */}
      <div className="lg:col-span-8 bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="border-b pb-3.5">
          <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
            <UserCog className="w-4 h-4 text-primary" /> Administrator Account
            Details
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            System level credentials and role permissions overview.
          </p>
        </div>

        <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 text-xs">
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground">System User ID</span>
            <span className="font-mono font-semibold text-foreground text-[11px]">
              {user.id}
            </span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
            </span>
            <span className="font-semibold text-foreground">{user.email}</span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <KeyRound className="w-3.5 h-3.5 text-primary" /> Auth Provider
            </span>
            <span className="font-semibold text-foreground">
              {user.authProvider}
            </span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-primary" /> Account Created
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

        <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-2.5 text-[11px] text-muted-foreground">
          <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>
            This account has elevated privileges to manage users, review
            fundraising campaigns, and moderate blood requests.
          </span>
        </div>
      </div>
    </div>
  );
};

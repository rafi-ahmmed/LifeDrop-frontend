import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminProfileContent } from "@/components/modules/profile/admin-profile/admin-profile-content";
import ProfileHeader from "@/components/modules/profile/profile-header";
import { ProfileSkeleton } from "@/components/modules/profile/profile-skeleton";

export const metadata: Metadata = {
  title: "Admin Profile",
  description:
    "Manage your LifeDrop admin account details, contact information and security settings.",
};

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <ProfileHeader name="Admin" />

      <Suspense fallback={<ProfileSkeleton />}>
        <AdminProfileContent />
      </Suspense>
    </div>
  );
}

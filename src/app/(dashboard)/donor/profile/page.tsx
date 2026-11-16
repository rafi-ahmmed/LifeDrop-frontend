import { Suspense } from "react";
import { DonorProfileContent } from "@/components/modules/profile/donor-profile/donor-profile-content";
import ProfileHeader from "@/components/modules/profile/profile-header";
import { ProfileSkeleton } from "@/components/modules/profile/profile-skeleton";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <ProfileHeader name="Donor" />

      <Suspense fallback={<ProfileSkeleton />}>
        <DonorProfileContent />
      </Suspense>
    </div>
  );
}

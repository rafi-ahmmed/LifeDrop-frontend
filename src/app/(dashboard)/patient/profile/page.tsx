import { UserCircle } from "lucide-react";
import { Suspense } from "react";
import { PatientProfileContent } from "@/components/modules/profile/patient-profile/patient-profile-content";
import ProfileHeader from "@/components/modules/profile/profile-header";
import { ProfileSkeleton } from "@/components/modules/profile/profile-skeleton";

export default function PatientProfilePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <ProfileHeader name="Patient" />

      <Suspense fallback={<ProfileSkeleton />}>
        <PatientProfileContent />
      </Suspense>
    </div>
  );
}

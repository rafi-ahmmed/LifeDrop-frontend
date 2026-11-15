"use client";

import { UserRoundSearch } from "lucide-react";
import { useGetMyDonorRequestsSuspense } from "@/hooks";
import type { TBloodRequestWithDonorRequests } from "@/types";
import { DonorRequestBloodRequestCard } from "./donor-request-blood-request-card";

const DonorRequestList = () => {
  const { data: response } = useGetMyDonorRequestsSuspense();

  const bloodRequests: TBloodRequestWithDonorRequests[] = response?.data ?? [];

  // Only blood requests that actually have donor requests need managing.
  const manageableRequests = bloodRequests.filter(
    (bloodRequest) => bloodRequest.donorRequests.length > 0,
  );

  if (manageableRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border rounded-2xl text-center space-y-4 my-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-500/10 text-rose-500">
          <UserRoundSearch className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-foreground">
            No donor requests yet
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Once you notify matching donors for a blood request, their responses
            will appear here for you to accept, complete, or cancel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {manageableRequests.map((bloodRequest) => (
        <DonorRequestBloodRequestCard
          key={bloodRequest.id}
          bloodRequest={bloodRequest}
        />
      ))}
    </div>
  );
};

export default DonorRequestList;

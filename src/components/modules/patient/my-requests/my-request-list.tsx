"use client";

import { Droplet, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetMyBloodRequestsSuspense } from "@/hooks/blood-request.hook";
import type { TBloodRequest } from "@/types/blood-request.type";
import { MyRequestCard } from "./my-request-card";

export function MyRequestList() {
  const { data: response } = useGetMyBloodRequestsSuspense();

  const requestsList: TBloodRequest[] = Array.isArray(response?.data)
    ? response.data
    : (response?.data as any)?.requests || [];

  if (requestsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border rounded-2xl text-center space-y-4 my-8 relative z-10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-500/10 text-rose-500">
          <Droplet className="w-7 h-7 fill-rose-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-foreground">
            No blood requests found
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            You haven&apos;t created any emergency blood requests yet. When you
            need blood, submit a requisition here.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/patient/create-blood-request" />}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <PlusCircle className="w-4 h-4 text-rose-500" />
          <span>Create your first blood request</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
      {requestsList.map((request) => (
        <MyRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}

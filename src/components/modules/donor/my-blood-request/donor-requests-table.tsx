"use client";

import {
  CheckCircle2,
  Eye,
  FolderOpen,
  Loader2,
  MapPin,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetMyDonorRequestForDonorSuspense,
  useRespondToDonorRequest,
} from "@/hooks";
import type { TDonorRequest } from "@/types";
import { RequestDetailsModalForDonor } from "./request-details-modal-for-donor";

export const DonorRequestsTable = () => {
  const { data: response } = useGetMyDonorRequestForDonorSuspense();

  // মিউটেশন হুক থেকে mutate এবং isPending এর পাশাপাশি variables ও আনা হলো কোন আইডি প্রসেস হচ্ছে তা চেক করতে
  const {
    mutate: respondToRequest,
    isPending,
    variables,
  } = useRespondToDonorRequest();

  const requestsList: TDonorRequest[] = response?.data || [];

  const [selectedRequest, setSelectedRequest] = useState<TDonorRequest | null>(
    null,
  );

  const handleStatusChange = (
    requestId: string,
    newStatus: "INTERESTED" | "DECLINED",
  ) => {
    const payload = { status: newStatus };
    respondToRequest({ id: requestId, payload });
  };

  const formatBloodGroup = (bg: string) =>
    bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "INTERESTED":
      case "ACCEPTED":
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "DECLINED":
      case "CANCELLED":
      case "WITHDRAWN":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  if (requestsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-14 bg-card border rounded-2xl text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <FolderOpen className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-base">No Blood Requests Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            You haven&apos;t received any blood donation requests yet. Keep your
            availability active to help patients in need.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-xs font-bold">Patient Info</TableHead>
              <TableHead className="text-xs font-bold">Blood Group</TableHead>
              <TableHead className="text-xs font-bold">Location</TableHead>
              <TableHead className="text-xs font-bold">Needed Date</TableHead>
              <TableHead className="text-xs font-bold">Status</TableHead>
              <TableHead className="text-xs font-bold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestsList.map((req) => {
              const isLocked =
                req.status === "ACCEPTED" ||
                req.status === "COMPLETED" ||
                req.status === "CANCELLED" ||
                req.status === "WITHDRAWN";

              // চেক করা হচ্ছে এই নির্দিষ্ট রো-এর API কল চলছে কি না
              const isThisRowLoading = isPending && variables?.id === req.id;

              const isInterestedDisabled =
                req.status === "INTERESTED" || isLocked || isPending;
              const isDeclineDisabled =
                req.status === "DECLINED" || isLocked || isPending;

              return (
                <TableRow
                  key={req.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* Patient Name & Reason */}
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-bold text-xs text-foreground">
                        {req.bloodRequest.patientName}
                      </p>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">
                        {req.bloodRequest.reason}
                      </p>
                    </div>
                  </TableCell>

                  {/* Blood Group */}
                  <TableCell>
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-extrabold">
                      {formatBloodGroup(req.bloodRequest.bloodGroup)}
                    </span>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {req.bloodRequest.address}, {req.bloodRequest.district}
                      </span>
                    </div>
                  </TableCell>

                  {/* Needed Date */}
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(req.bloodRequest.neededAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadgeStyle(req.status)}`}
                    >
                      {req.status}
                    </span>
                  </TableCell>

                  {/* Actions: Details, Interested, Decline */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Details Modal Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => setSelectedRequest(req)}
                        className="h-8 px-2.5 text-xs font-semibold gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Details</span>
                      </Button>

                      {/* Interested Button */}
                      <Button
                        size="sm"
                        disabled={isInterestedDisabled}
                        onClick={() => handleStatusChange(req.id, "INTERESTED")}
                        className="h-8 px-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 gap-1"
                      >
                        {isThisRowLoading &&
                        variables?.payload.status === "INTERESTED" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        <span>Interested</span>
                      </Button>

                      {/* Decline Button */}
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isDeclineDisabled}
                        onClick={() => handleStatusChange(req.id, "DECLINED")}
                        className="h-8 px-2.5 text-xs font-semibold disabled:opacity-40 gap-1"
                      >
                        {isThisRowLoading &&
                        variables?.payload.status === "DECLINED" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>Decline</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <RequestDetailsModalForDonor
        request={selectedRequest}
        open={!!selectedRequest}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedRequest(null);
        }}
      />
    </>
  );
};

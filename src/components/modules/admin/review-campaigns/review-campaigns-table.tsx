"use client";

import {
  Building2,
  CheckCircle2,
  Eye,
  FileText,
  FolderOpen,
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
  useGetAllAdminCampaignsSuspense,
  useReviewFundCampaign,
} from "@/hooks";
import type { TFundCampaign } from "@/types";
import { CampaignDetailsModal } from "./campaign-details-modal";
import { ReviewConfirmationModal } from "./review-confirmation-modal";

export const ReviewCampaignsTable = () => {
  const { data: response } = useGetAllAdminCampaignsSuspense();
  const { mutate: reviewCampaign, isPending: isSubmitting } =
    useReviewFundCampaign();

  const campaigns: TFundCampaign[] = response?.data || [];

  const [detailsCampaign, setDetailsCampaign] = useState<TFundCampaign | null>(
    null,
  );

  const [confirmState, setConfirmState] = useState<{
    campaign: TFundCampaign | null;
    actionType: "APPROVED" | "REJECTED" | null;
  }>({ campaign: null, actionType: null });

  const openConfirmModal = (
    campaign: TFundCampaign,
    actionType: "APPROVED" | "REJECTED",
  ) => {
    setConfirmState({ campaign, actionType });
  };

  const handleFinalConfirm = (rejectedReason?: string) => {
    if (!confirmState.campaign || !confirmState.actionType) return;

    const payload =
      confirmState.actionType === "REJECTED"
        ? { status: "REJECTED" as const, rejectedReason }
        : { status: "APPROVED" as const };

    reviewCampaign(
      { id: confirmState.campaign.id, payload },
      {
        onSuccess: () => {
          setConfirmState({ campaign: null, actionType: null });
        },
      },
    );
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "REJECTED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <>
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-14 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base">No Campaigns Found</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                There are currently no fundraising campaigns submitted for
                review.
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-xs font-bold">
                  Campaign & Patient
                </TableHead>
                <TableHead className="text-xs font-bold">
                  Hospital & Contact
                </TableHead>
                <TableHead className="text-xs font-bold">
                  Target / Raised
                </TableHead>
                <TableHead className="text-xs font-bold">Documents</TableHead>
                <TableHead className="text-xs font-bold">Status</TableHead>
                <TableHead className="text-xs font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* Title & Patient */}
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-bold text-xs text-foreground line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Patient: {item.patientName}
                      </p>
                    </div>
                  </TableCell>

                  {/* Hospital & Phone */}
                  <TableCell>
                    <div className="space-y-0.5 text-xs">
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate max-w-35">
                          {item.hospitalName}
                        </span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.contactNumber}
                      </p>
                    </div>
                  </TableCell>

                  {/* Target & Collected */}
                  <TableCell>
                    <div className="space-y-0.5 text-xs">
                      <p className="font-bold text-foreground">
                        ৳{Number(item.targetAmount).toLocaleString()}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Raised: ৳{Number(item.collectedAmount).toLocaleString()}
                      </p>
                    </div>
                  </TableCell>

                  {/* Documents Count */}
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      {item.medicalDocuments?.length || 0} File(s)
                    </span>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadgeStyle(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>

                  {/* Actions: Details, Approve, Reject */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDetailsCampaign(item)}
                        className="h-8 px-2.5 text-xs font-semibold gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Details</span>
                      </Button>

                      <Button
                        size="sm"
                        disabled={
                          item.status === "APPROVED" || item.status === "ACTIVE"
                        }
                        onClick={() => openConfirmModal(item, "APPROVED")}
                        className="h-8 px-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={
                          item.status === "REJECTED" || item.status === "ACTIVE"
                        }
                        onClick={() => openConfirmModal(item, "REJECTED")}
                        className="h-8 px-2.5 text-xs font-semibold disabled:opacity-40 gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <CampaignDetailsModal
        campaign={detailsCampaign}
        open={!!detailsCampaign}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDetailsCampaign(null);
        }}
      />

      <ReviewConfirmationModal
        campaign={confirmState.campaign}
        actionType={confirmState.actionType}
        open={!!confirmState.campaign && !!confirmState.actionType}
        isSubmitting={isSubmitting}
        onOpenChange={(isOpen) => {
          if (!isOpen) setConfirmState({ campaign: null, actionType: null });
        }}
        onConfirm={handleFinalConfirm}
      />
    </>
  );
};

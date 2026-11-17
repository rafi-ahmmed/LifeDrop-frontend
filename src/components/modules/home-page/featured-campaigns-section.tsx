"use client";

import {
  ArrowRight,
  Building2,
  Calendar,
  Eye,
  Heart,
  HeartHandshake,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CampaignDetailsModal } from "@/components/modules/campaigns/campaign-details-modal";
import { DonateModal } from "@/components/modules/campaigns/donate-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetAllCampaigns, useGetMe } from "@/hooks";
import type { TUserItem } from "@/types";
import type { TFundCampaign } from "@/types/campaign.type";

export function FeaturedCampaignsSection() {
  const router = useRouter();
  const { data: userResponse } = useGetMe();
  const user: TUserItem | undefined = userResponse?.data;

  const isBlocked = user?.status === "BLOCKED";
  const isUnverified = user?.isVerified === false;
  const isRestricted = isBlocked || isUnverified;

  const restrictionReason = isBlocked
    ? "Your account has been blocked by the administrator."
    : "Your account is unverified. Please verify your account to donate.";


  const { data: campaignResponse, isLoading } = useGetAllCampaigns();
  
  const [selectedCampaign, setSelectedCampaign] =
    useState<TFundCampaign | null>(null);
  const [selectedDonateCampaign, setSelectedDonateCampaign] =
    useState<TFundCampaign | null>(null);

  const handleDonateClick = (campaign: TFundCampaign) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isRestricted) {
      toast.add({
        title: "Action Restricted",
        description: `Cannot donate. ${restrictionReason}`,
        type: "error",
      });
      return;
    }

    setSelectedCampaign(null);
    setSelectedDonateCampaign(campaign);
  };


  const apiCampaigns: TFundCampaign[] = Array.isArray(campaignResponse?.data)
    ? campaignResponse.data
    : (campaignResponse?.data as any)?.campaigns || [];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Medical Emergencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Urgent Medical Fundraising Cases
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              These patients require immediate financial support for
              life-critical surgeries, transplants, and therapies.
            </p>
          </div>

          <Button
            nativeButton={false}
            render={<Link href="/campaigns" />}
            variant="outline"
            className="rounded-xl font-semibold self-start md:self-auto gap-2"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-card border border-border rounded-3xl p-6 h-72 animate-pulse space-y-4"
              >
                <div className="h-8 bg-muted rounded-full w-1/3" />
                <div className="h-6 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="pt-8 space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : apiCampaigns.length === 0 ? (
         
          <div className="text-center py-16 bg-card border rounded-3xl space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">
              No active fundraising campaigns found at the moment.
            </p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiCampaigns.slice(0, 3).map((campaign) => {
              const target = Number(campaign.targetAmount) || 1;
              const collected = Number(campaign.collectedAmount) || 0;
              const progress = Math.min(
                Math.round((collected / target) * 100),
                100,
              );

              return (
                <div
                  key={campaign.id}
                  className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative space-y-5 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary/60" />

                  {/* Card Top Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                        Critical Support
                      </span>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {campaign.status || "ACTIVE"}
                    </span>
                  </div>

                  {/* Patient & Title */}
                  <div className="space-y-2">
                    {campaign.patientName && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
                        <User className="w-3.5 h-3.5" />
                        <span>Patient: {campaign.patientName}</span>
                      </div>
                    )}

                    <h3 className="font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors line-clamp-1">
                      {campaign.title}
                    </h3>

                    {campaign.hospitalName && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                        <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{campaign.hospitalName}</span>
                      </p>
                    )}
                  </div>

                  {/* Progress Bar & Amounts */}
                  <div className="space-y-2 pt-3 border-t border-border/80">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">
                        Raised:{" "}
                        <strong className="text-foreground">
                          ৳{collected.toLocaleString()}
                        </strong>
                      </span>
                      <span className="text-muted-foreground">
                        Goal:{" "}
                        <strong className="text-foreground">
                          ৳{target.toLocaleString()}
                        </strong>
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-0.5">
                      <span className="font-bold text-primary">
                        {progress}% Funded
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {campaign.deadline
                          ? `Ends ${new Date(campaign.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
                          : "Active"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-9 text-xs font-semibold rounded-xl cursor-pointer"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Case Details</span>
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleDonateClick(campaign)}
                      className="h-9 text-xs font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Donate Now</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Details */}
        <CampaignDetailsModal
          campaign={selectedCampaign}
          open={!!selectedCampaign}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedCampaign(null);
          }}
          onDonateClick={() => {
            if (selectedCampaign) {
              const targetCamp = selectedCampaign;
              setSelectedCampaign(null);
              handleDonateClick(targetCamp);
            }
          }}
        />

        {/* Modal for Donation */}
        <DonateModal
          campaign={selectedDonateCampaign}
          open={!!selectedDonateCampaign}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedDonateCampaign(null);
          }}
        />
      </div>
    </section>
  );
}
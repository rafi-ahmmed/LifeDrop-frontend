"use client";

import {
  Activity,
  Ban,
  CheckCircle2,
  Clock,
  Droplet,
  HandCoins,
  HeartHandshake,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAdminStatsSuspense } from "@/hooks";
import type { TAdminStatsData } from "@/types";

export const AdminOverview = () => {
  const { data: response } = useGetAdminStatsSuspense();
  const stats: TAdminStatsData = response.data;
  const {
    users,
    bloodRequests,
    fundCampaigns,
    totalFundingRevenue,
    monthlyFundingData,
    dailyBloodRequestsData,
  } = stats;


  const formattedFundingChartData = useMemo(() => {
    const grouped: Record<
      string,
      { month: string; target: number; collected: number }
    > = {};

    monthlyFundingData.forEach((item) => {
      const date = new Date(item.createdAt);
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (!grouped[monthKey]) {
        grouped[monthKey] = { month: monthKey, target: 0, collected: 0 };
      }
      grouped[monthKey].target += Number(item.targetAmount) || 0;
      grouped[monthKey].collected += Number(item.collectedAmount) || 0;
    });

    return Object.values(grouped).reverse();
  }, [monthlyFundingData]);

  const formattedDailyRequestsData = useMemo(() => {
    const grouped: Record<string, { date: string; requests: number }> = {};

    dailyBloodRequestsData.forEach((item) => {
      const dateStr = new Date(item.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });

      if (!grouped[dateStr]) {
        grouped[dateStr] = { date: dateStr, requests: 0 };
      }
      grouped[dateStr].requests += 1;
    });

    return Object.values(grouped);
  }, [dailyBloodRequestsData]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" /> User Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Active Users
              </p>
              <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
                {users.activeUsers}
              </h3>
            </div>
          </div>

          <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Total Donors
              </p>
              <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
                {users.totalDonors}
              </h3>
            </div>
          </div>

          <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Total Patients
              </p>
              <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
                {users.totalPatients}
              </h3>
            </div>
          </div>

          <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Blocked Users
              </p>
              <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
                {users.blockedUsers}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* সেকশন ২: Blood Requests & Fund Campaigns + Total Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Requests Stats */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Droplet className="w-4 h-4 text-primary" /> Blood Requests
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
              Total: {bloodRequests.total}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <Clock className="w-4 h-4 text-amber-500 mx-auto" />
              <p className="text-[11px] text-muted-foreground">Pending</p>
              <p className="text-lg font-extrabold text-foreground">
                {bloodRequests.pending}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <Activity className="w-4 h-4 text-blue-500 mx-auto" />
              <p className="text-[11px] text-muted-foreground">Approved</p>
              <p className="text-lg font-extrabold text-foreground">
                {bloodRequests.approved}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
              <p className="text-[11px] text-muted-foreground">Fulfilled</p>
              <p className="text-lg font-extrabold text-foreground">
                {bloodRequests.fulfilled}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <HandCoins className="w-4 h-4 text-primary" /> Fund Campaigns
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
              Total: {fundCampaigns.total}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl space-y-1">
              <Wallet className="w-4 h-4 text-emerald-600 mx-auto" />
              <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                Total Revenue
              </p>
              <p className="text-lg font-extrabold text-emerald-600">
                ৳{Number(totalFundingRevenue || 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <Clock className="w-4 h-4 text-amber-500 mx-auto" />
              <p className="text-[11px] text-muted-foreground">Pending</p>
              <p className="text-lg font-extrabold text-foreground">
                {fundCampaigns.pending}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500 mx-auto" />
              <p className="text-[11px] text-muted-foreground">Approved</p>
              <p className="text-lg font-extrabold text-foreground">
                {fundCampaigns.approved}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Monthly Funding */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <HandCoins className="w-4 h-4 text-primary" />
              Monthly Fundraising Overview
            </h3>
            <p className="text-xs text-muted-foreground">
              Comparison of target amount vs collected funds per month.
            </p>
          </div>

          <div className="h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedFundingChartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar
                  dataKey="target"
                  name="Target Amount (৳)"
                  fill="#94a3b8"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="collected"
                  name="Collected Amount (৳)"
                  fill="#e11d48"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Daily Blood Requests Trend
            </h3>
            <p className="text-xs text-muted-foreground">
              Number of blood donation requests submitted over time.
            </p>
          </div>

          <div className="h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedDailyRequestsData}
                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="requests"
                  name="Blood Requests"
                  stroke="#e11d48"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#e11d48" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

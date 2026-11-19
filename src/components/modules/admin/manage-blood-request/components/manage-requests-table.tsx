"use client";

import {
  CheckCircle2,
  Eye,
  Filter,
  FolderOpen,
  Loader2,
  MapPin,
  RotateCcw,
  Search,
  XCircle,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ReloadButton } from "@/components/shared/reload-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetBloodRequestsSuspense,
  useUpdateBloodRequestStatus,
} from "@/hooks";
import { ADMIN_QUERY_KEYS } from "@/lib/tanstack-query/query-keys";
import type { TBloodRequest } from "@/types/blood-request.type";
import { AllRequestDetailsModal } from "../all-request-details-modal";
import { AllRequestsSkeleton } from "../all-requests-skeleton";

export const ManageRequestsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // URL থেকে বর্তমান প্যারামিটারগুলো নেওয়া
  const initialLocation = searchParams.get("location") || "";
  const bloodGroupQuery = searchParams.get("bloodGroup") || "ALL";
  const statusQuery = searchParams.get("status") || "ALL";
  const isUrgentOnly = searchParams.get("urgency") === "true";

  const updateUrlParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "ALL") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (!("page" in updates)) {
      params.set("page", "1");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    updateUrlParams({ location: value || null });
  }, 500);

  const currentQueryString = searchParams.toString() || "page=1";
  const { data: response } = useGetBloodRequestsSuspense(currentQueryString);
  const {
    mutate: updateStatus,
    isPending: isUpdating,
    variables,
  } = useUpdateBloodRequestStatus();

  const requestsList: TBloodRequest[] = response?.data?.data || [];
  const meta = response?.data?.meta;
  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPage || 1;

  const [selectedRequest, setSelectedRequest] = useState<TBloodRequest | null>(
    null,
  );

  const handleResetFilters = () => {
    startTransition(() => {
      router.push(`${pathname}?page=1`);
    });
  };

  const handleStatusUpdate = (id: string, status: "APPROVED" | "REJECTED") => {
    updateStatus({ id, payload: { status } });
  };

  const formatBloodGroup = (bg: string) =>
    bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "APPROVED":
      case "FULFILLED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "REJECTED":
      case "CANCELLED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "MATCHING":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  const hasActiveFilters =
    Boolean(initialLocation) ||
    bloodGroupQuery !== "ALL" ||
    statusQuery !== "ALL" ||
    isUrgentOnly;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground pr-2 border-r">
            <Filter className="w-4 h-4 text-primary" />
            <span>Filters</span>
          </div>

          {/* ১. Debounced Location Search */}
          <div className="relative w-full sm:w-52.5">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search location "
              defaultValue={initialLocation}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-9 pl-8 text-xs"
            />
          </div>

          {/* ২. Blood Group Select */}
          <Select
            value={bloodGroupQuery}
            onValueChange={(val) => updateUrlParams({ bloodGroup: val })}
          >
            <SelectTrigger className="h-9 w-41.25 text-xs">
              <span className="text-muted-foreground mr-1">Group:</span>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Groups</SelectItem>
              <SelectItem value="A_POSITIVE">A+</SelectItem>
              <SelectItem value="A_NEGATIVE">A-</SelectItem>
              <SelectItem value="B_POSITIVE">B+</SelectItem>
              <SelectItem value="B_NEGATIVE">B-</SelectItem>
              <SelectItem value="AB_POSITIVE">AB+</SelectItem>
              <SelectItem value="AB_NEGATIVE">AB-</SelectItem>
              <SelectItem value="O_POSITIVE">O+</SelectItem>
              <SelectItem value="O_NEGATIVE">O-</SelectItem>
            </SelectContent>
          </Select>

          {/* ৩. Status Select */}
          <Select
            value={statusQuery}
            onValueChange={(val) => updateUrlParams({ status: val })}
          >
            <SelectTrigger className="h-9 w-41.25 text-xs">
              <span className="text-muted-foreground mr-1">Status:</span>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="MATCHING">Matching</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="FULFILLED">Fulfilled</SelectItem>
            </SelectContent>
          </Select>

          {/* ৪. Urgency Switch Button */}
          <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg border h-9">
            <Switch
              id="urgency-mode"
              checked={isUrgentOnly}
              onCheckedChange={(checked) =>
                updateUrlParams({ urgency: checked ? "true" : null })
              }
            />
            <Label
              htmlFor="urgency-mode"
              className="text-xs font-semibold cursor-pointer select-none"
            >
              Urgent Only
            </Label>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-9 text-xs text-muted-foreground hover:text-foreground gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
        )}
        <ReloadButton
          queryKey={[ADMIN_QUERY_KEYS.ADMIN_BLOOD_REQs]}
          exact={false}
        />
      </div>

      {isPending ? (
        <AllRequestsSkeleton />
      ) : (
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          {requestsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-14 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <FolderOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base">No Blood Requests Found</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  No requests match your current filter criteria. Try adjusting
                  or resetting the filters.
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">
                    Patient Info
                  </TableHead>
                  <TableHead className="text-xs font-bold">
                    Blood Group
                  </TableHead>
                  <TableHead className="text-xs font-bold">Location</TableHead>
                  <TableHead className="text-xs font-bold">Units</TableHead>
                  <TableHead className="text-xs font-bold">Urgency</TableHead>
                  <TableHead className="text-xs font-bold">Status</TableHead>
                  <TableHead className="text-xs font-bold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestsList.map((req: TBloodRequest) => {
                  const isThisRowLoading =
                    isUpdating && variables?.id === req.id;
                  const isLocked =
                    req.status === "FULFILLED" ||
                    req.status === "CANCELLED" ||
                    req.status === "MATCHING" ||
                    req.status === "APPROVED";

                  return (
                    <TableRow
                      key={req.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-bold text-xs text-foreground">
                            {req.patientName}
                          </p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {req.reason}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-extrabold">
                          {formatBloodGroup(req.bloodGroup)}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate max-w-40">
                            {req.address}, {req.district}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs font-bold text-foreground">
                        {req.units} Bag(s)
                      </TableCell>

                      <TableCell>
                        {req.urgency ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
                            Urgent
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            Normal
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadgeStyle(
                            req.status,
                          )}`}
                        >
                          {req.status}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Details Modal Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedRequest(req)}
                            className="h-8 px-2.5 text-xs font-semibold gap-1"
                          >
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Details</span>
                          </Button>

                          {/* Approve Button */}
                          <Button
                            size="sm"
                            disabled={
                              isLocked ||
                              req.status === "APPROVED" ||
                              isThisRowLoading
                            }
                            onClick={() =>
                              handleStatusUpdate(req.id, "APPROVED")
                            }
                            className="h-8 px-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 gap-1"
                          >
                            {isThisRowLoading &&
                            variables?.payload.status === "APPROVED" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>Approve</span>
                          </Button>

                          {/* Reject Button */}
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={
                              isLocked ||
                              req.status === "REJECTED" ||
                              isThisRowLoading
                            }
                            onClick={() =>
                              handleStatusUpdate(req.id, "REJECTED")
                            }
                            className="h-8 px-2.5 text-xs font-semibold disabled:opacity-40 gap-1"
                          >
                            {isThisRowLoading &&
                            variables?.payload.status === "REJECTED" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            <span>Reject</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      {meta && meta.total > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-muted-foreground">
            Showing page{" "}
            <span className="font-bold text-foreground">{currentPage}</span> of{" "}
            <span className="font-bold text-foreground">{totalPages}</span>{" "}
            (Total{" "}
            <span className="font-bold text-foreground">{meta.total}</span>{" "}
            requests)
          </p>

          {totalPages > 1 && (
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        updateUrlParams({ page: String(currentPage - 1) });
                      }
                    }}
                    aria-disabled={currentPage <= 1}
                    className={
                      currentPage <= 1
                        ? "pointer-events-none opacity-50 text-xs"
                        : "cursor-pointer text-xs"
                    }
                  />
                </PaginationItem>

                {/* Page Number Links (1, 2, 3...) */}
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === pageNum}
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage !== pageNum) {
                            updateUrlParams({ page: String(pageNum) });
                          }
                        }}
                        className="cursor-pointer text-xs h-8 w-8"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        updateUrlParams({ page: String(currentPage + 1) });
                      }
                    }}
                    aria-disabled={currentPage >= totalPages}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50 text-xs"
                        : "cursor-pointer text-xs"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}

      <AllRequestDetailsModal
        request={selectedRequest}
        open={!!selectedRequest}
        onOpenChange={(isOpen: boolean) => {
          if (!isOpen) setSelectedRequest(null);
        }}
      />
    </div>
  );
};

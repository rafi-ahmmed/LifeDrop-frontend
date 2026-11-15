"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PaymentHistorySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Summary Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-7 w-28 rounded-md" />
            <Skeleton className="h-3 w-36 rounded" />
          </div>
        ))}
      </div>

      {/* 2. Table Skeleton */}
      <div className="bg-card border rounded-2xl overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Skeleton className="h-4 w-6 rounded" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32 rounded" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-28 rounded" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20 rounded" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16 rounded" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16 rounded" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24 rounded" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-14 rounded ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                <TableCell>
                  <Skeleton className="h-4 w-4 rounded" />
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36 rounded" />
                    <Skeleton className="h-3.5 w-24 rounded-md" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-3 w-32 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-18 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24 rounded" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-16 rounded-lg ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

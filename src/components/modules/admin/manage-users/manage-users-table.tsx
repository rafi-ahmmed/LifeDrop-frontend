"use client";

import {
  BadgeCheck,
  Ban,
  CheckCircle2,
  Eye,
  FolderOpen,
  Loader2,
  UserCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersSuspense, useUpdateUserStatus } from "@/hooks";
import type { TUserItem, UserStatus } from "@/types";
import { UserDetailsModal } from "./user-details-modal";

export const ManageUsersTable = () => {
  const { data: response } = useGetAllUsersSuspense();
  const {
    mutate: updateStatus,
    isPending: isUpdating,
    variables,
  } = useUpdateUserStatus();

  const usersList: TUserItem[] = response?.data || [];
  const [selectedUser, setSelectedUser] = useState<TUserItem | null>(null);

  const stats = useMemo(() => {
    const total = usersList.length;
    const active = usersList.filter((u) => u.status === "ACTIVE").length;
    const banned = usersList.filter((u) => u.status === "BLOCKED").length;
    return { total, active, banned };
  }, [usersList]);

  const handleStatusChange = (id: string, status: UserStatus) => {
    updateStatus({ id, payload: { status } });
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "ADMIN":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "DONOR":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Total Users
            </p>
            <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
              {stats.total}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Active Users
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">
              {stats.active}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Banned Users
            </p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-0.5">
              {stats.banned}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <Ban className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        {usersList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-14 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base">No Users Found</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                There are currently no registered users in the system.
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-xs font-bold">User Info</TableHead>
                <TableHead className="text-xs font-bold">Role</TableHead>
                <TableHead className="text-xs font-bold">
                  Auth Provider
                </TableHead>
                <TableHead className="text-xs font-bold">Status</TableHead>
                <TableHead className="text-xs font-bold">Joined Date</TableHead>
                <TableHead className="text-xs font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersList.map((user) => {
                const isThisRowLoading =
                  isUpdating && variables?.id === user.id;
                const isActive = user.status === "ACTIVE";
                const isBanned = user.status === "BLOCKED";

                return (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {/* User Name, Avatar & Email */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-bold text-xs text-foreground flex items-center gap-1">
                            <span>{user.name}</span>
                            {user.isVerified && (
                              <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            )}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role Badge */}
                    <TableCell>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${getRoleBadgeStyle(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </TableCell>

                    {/* Auth Provider */}
                    <TableCell className="text-xs text-muted-foreground font-medium">
                      {user.authProvider}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>

                    {/* Joined Date */}
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Actions: Details, Active, Ban */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Details Modal Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                          className="h-8 px-2.5 text-xs font-semibold gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Details</span>
                        </Button>

                        <Button
                          size="sm"
                          disabled={isActive || isThisRowLoading}
                          onClick={() => handleStatusChange(user.id, "ACTIVE")}
                          className="h-8 px-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 gap-1"
                        >
                          {isThisRowLoading &&
                          variables?.payload.status === "ACTIVE" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          <span>Active</span>
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isBanned || isThisRowLoading}
                          onClick={() => handleStatusChange(user.id, "BLOCKED")}
                          className="h-8 px-2.5 text-xs font-semibold disabled:opacity-40 gap-1"
                        >
                          {isThisRowLoading &&
                          variables?.payload.status === "BLOCKED" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Ban className="w-3.5 h-3.5" />
                          )}
                          <span>Block</span>
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

      <UserDetailsModal
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedUser(null);
        }}
      />
    </div>
  );
};

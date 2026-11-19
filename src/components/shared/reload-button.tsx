"use client";

import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReloadButtonProps {
  queryKey: QueryKey;
  onClick?: () => void;
  exact?: boolean;
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
}

export function ReloadButton({
  queryKey,
  onClick,
  exact = true,
  isLoading = false,
  label = "Reload",
  loadingLabel = "Reloading...",
  variant = "outline",
  size = "sm",
  className = "",
  showIcon = true,
}: ReloadButtonProps) {
  const queryClient = useQueryClient();
  const handleReload = async () => {
    if (onClick) {
      onClick();
    }
    if (queryKey) {
      console.log("click");
      await queryClient.refetchQueries({
        queryKey: queryKey,
        exact,
      });
    } else {
      window.location.reload();
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={isLoading}
      onClick={handleReload}
      className={`rounded-xl font-semibold gap-1.5 cursor-pointer transition-all ${className}`}
    >
      {showIcon && (
        <RefreshCw
          className={`w-3.5 h-3.5 shrink-0 ${isLoading ? "animate-spin" : ""}`}
        />
      )}
      {size !== "icon" && <span>{isLoading ? loadingLabel : label}</span>}
    </Button>
  );
}

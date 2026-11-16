"use client";

import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useUploadProfileImage } from "@/hooks/profile.hook";
import type { TUserItem } from "@/types";

export const ProfileAvatarUploader = ({ user }: { user: TUserItem }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage, isPending } = useUploadProfileImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    uploadImage(formData);
  };

  return (
    <div className="relative mx-auto w-28 h-28">
      <div className="relative w-28 h-28 rounded-full ring-4 ring-primary/15 overflow-hidden bg-muted flex items-center justify-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        ) : (
          <span className="text-3xl font-extrabold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}

        {isPending && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* ফ্লোটিং ক্যামেরা বাটন */}
      <button
        type="button"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
        title="Change Profile Photo"
        className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center hover:scale-105 transition-transform cursor-pointer border-2 border-background disabled:opacity-50"
      >
        <Camera className="w-4 h-4" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

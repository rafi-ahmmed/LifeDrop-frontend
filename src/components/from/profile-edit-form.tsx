"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Phone, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateDonorProfile,
  useUpdatePatientProfile,
} from "@/hooks/profile.hook";
import type { TUpdateProfilePayload, TUserItem } from "@/types";
import {
  type TUpdateProfileFormValues,
  updateProfileSchema,
} from "@/validation";

interface ProfileEditFormProps {
  user: TUserItem;
  onCancel: () => void;
}

export const ProfileEditForm = ({ user, onCancel }: ProfileEditFormProps) => {
  const isDonor = user.role === "DONOR";
  const profileData = isDonor ? user.donor : user.patient;

  const { mutate: updatePatient, isPending: isPatientUpdating } =
    useUpdatePatientProfile();
  const { mutate: updateDonor, isPending: isDonorUpdating } =
    useUpdateDonorProfile();

  const isPending = isPatientUpdating || isDonorUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TUpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      phone: profileData?.phone || "",
      district: profileData?.district || "",
      address: profileData?.address || "",
    },
  });

  const onSubmit = (values: TUpdateProfileFormValues) => {
    const payload: TUpdateProfilePayload = {};
    if (values.phone?.trim()) payload.phone = values.phone.trim();
    if (values.district?.trim()) payload.district = values.district.trim();
    if (values.address?.trim()) payload.address = values.address.trim();

    const options = {
      onSuccess: () => onCancel(),
    };

    if (isDonor) {
      updateDonor(payload, options);
    } else {
      updatePatient(payload, options);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Field */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="phone"
              placeholder="018XXXXXXXX"
              {...register("phone")}
              className="pl-9 h-9 text-xs"
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-rose-500">{errors.phone.message}</p>
          )}
        </div>

        {/* District Field */}
        <div className="space-y-1.5">
          <Label htmlFor="district" className="text-xs font-semibold">
            District
          </Label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="district"
              placeholder="e.g. Mirpur, Dhaka"
              {...register("district")}
              className="pl-9 h-9 text-xs"
            />
          </div>
          {errors.district && (
            <p className="text-[11px] text-rose-500">
              {errors.district.message}
            </p>
          )}
        </div>
      </div>

      {/* Address Field */}
      <div className="space-y-1.5">
        <Label htmlFor="address" className="text-xs font-semibold">
          Full Street Address
        </Label>
        <Input
          id="address"
          placeholder="e.g. Mirpur Kajipara, Dhaka"
          {...register("address")}
          className="h-9 text-xs"
        />
        {errors.address && (
          <p className="text-[11px] text-rose-500">{errors.address.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={onCancel}
          className="h-8 text-xs gap-1"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </Button>

        <Button
          type="submit"
          size="sm"
          disabled={isPending || !isDirty}
          className="h-8 text-xs gap-1.5"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save Changes</span>
        </Button>
      </div>
    </form>
  );
};

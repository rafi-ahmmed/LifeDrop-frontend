"use client";

import { Loader2, MapPin, Phone, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateDonorProfile,
  useUpdatePatientProfile,
} from "@/hooks/profile.hook";
import type { TUpdateProfilePayload, TUserItem } from "@/types";

interface EditProfileModalProps {
  user: TUserItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditProfileModal = ({
  user,
  open,
  onOpenChange,
}: EditProfileModalProps) => {
  const isDonor = user.role === "DONOR";
  const profileData = isDonor ? user.donor : user.patient;

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");

  const { mutate: updatePatient, isPending: isPatientUpdating } =
    useUpdatePatientProfile();
  const { mutate: updateDonor, isPending: isDonorUpdating } =
    useUpdateDonorProfile();

  const isPending = isPatientUpdating || isDonorUpdating;

  useEffect(() => {
    if (open) {
      setPhone(profileData?.phone || "");
      setAddress(profileData?.address || "");
      setDistrict(profileData?.district || "");
    }
  }, [open, profileData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: TUpdateProfilePayload = {};
    if (phone.trim()) payload.phone = phone.trim();
    if (address.trim()) payload.address = address.trim();
    if (district.trim()) payload.district = district.trim();

    const options = {
      onSuccess: () => onOpenChange(false),
    };

    if (isDonor) {
      updateDonor(payload, options);
    } else {
      updatePatient(payload, options);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Edit Profile Information
          </DialogTitle>
          <DialogDescription className="text-xs">
            Update your contact number, street address, or district.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="phone"
                placeholder="018XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="district" className="text-xs font-semibold">
              District
            </Label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="district"
                placeholder="e.g. Dhaka, Bogura"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-semibold">
              Full Address
            </Label>
            <Input
              id="address"
              placeholder="e.g. Mirpur Kajipara, Dhaka"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="text-xs h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="text-xs h-9 gap-1.5"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

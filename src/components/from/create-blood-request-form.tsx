"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateBloodRequest } from "@/hooks";
import {
  ADMIN_QUERY_KEYS,
  PATIENT_QUERY_KEYS,
} from "@/lib/tanstack-query/query-keys";
import { createBloodRequestZodSchema } from "@/validation";

type BloodRequestInput = z.input<typeof createBloodRequestZodSchema>;
type BloodRequestPayload = z.output<typeof createBloodRequestZodSchema>;

export function CreateBloodRequestForm() {
  const { mutate: createBloodRequest, isPending } = useCreateBloodRequest();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BloodRequestInput, unknown, BloodRequestPayload>({
    resolver: zodResolver(createBloodRequestZodSchema),
    mode: "onBlur",
    defaultValues: {
      patientName: "",
      bloodGroup: undefined,
      gender: undefined,
      reason: "",
      phone: "",
      units: undefined as unknown as number,
      address: "",
      district: "",
      neededAt: "",
      urgency: false,
      description: "",
    },
  });

  const onSubmit: SubmitHandler<BloodRequestPayload> = (data) => {
    createBloodRequest(data, {
      onSuccess: async (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Please try again",
            type: "error",
          });
          return;
        }

        reset();

        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [PATIENT_QUERY_KEYS.PATIENT_BLOOD_REQ],
          }),
          queryClient.invalidateQueries({
            queryKey: [ADMIN_QUERY_KEYS.ADMIN_BLOOD_REQs],
          }),
        ]);

        toast.add({
          title: res.message || "Blood Request Created Successfully",
          description:
            "Your emergency blood request has been submitted. Matching donors will be notified shortly.",
          type: "success",
        });

        router.push("/patient/my-requests");
      },
      onError: (err) => {
        const message =
          err instanceof FetchError
            ? err.data?.message || err.message
            : "Something went wrong";
        toast.add({
          title: message,
          description: "Please try again",
          type: "error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Patient Name */}
        <div className="space-y-2">
          <Label htmlFor="patientName">
            Patient Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="patientName"
            type="text"
            placeholder="e.g. Kalam Hosen"
            {...register("patientName")}
          />
          {errors.patientName && (
            <p className="text-xs text-destructive">
              {errors.patientName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Contact Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="01712345678"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Blood Group & Gender (2 columns) */}
        <div className="space-y-2">
          <Label>
            Blood Group <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
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
            )}
          />
          {errors.bloodGroup && (
            <p className="text-xs text-destructive">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>
            Gender <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender.message}</p>
          )}
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <Label htmlFor="reason">
            Reason <span className="text-destructive">*</span>
          </Label>
          <Input
            id="reason"
            type="text"
            placeholder="e.g. Thalassemia, Surgery, Accident"
            {...register("reason")}
          />
          {errors.reason && (
            <p className="text-xs text-destructive">{errors.reason.message}</p>
          )}
        </div>

        {/* Units */}
        <div className="space-y-2">
          <Label htmlFor="units">
            Units Needed <span className="text-destructive">*</span>
          </Label>
          <Input
            id="units"
            type="number"
            min={1}
            placeholder="e.g. 1"
            {...register("units")}
          />
          {errors.units && (
            <p className="text-xs text-destructive">{errors.units.message}</p>
          )}
        </div>

        {/* District & Needed At (2 columns) */}
        <div className="space-y-2">
          <Label htmlFor="district">
            District <span className="text-destructive">*</span>
          </Label>
          <Input
            id="district"
            type="text"
            placeholder="e.g. Dhaka"
            {...register("district")}
          />
          {errors.district && (
            <p className="text-xs text-destructive">
              {errors.district.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="neededAt">
            Needed By <span className="text-destructive">*</span>
          </Label>
          <Input
            id="neededAt"
            type="datetime-local"
            {...register("neededAt")}
          />
          {errors.neededAt && (
            <p className="text-xs text-destructive">
              {errors.neededAt.message}
            </p>
          )}
        </div>

        {/* Address (full width) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">
            Hospital / Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="e.g. Kajipara, Mirpur, Dhaka"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address.message}</p>
          )}
        </div>

        {/* Description (full width) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">
            Additional Details{" "}
            <span className="text-muted-foreground text-[10px]">
              (Optional)
            </span>
          </Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Provide any extra details about the patient's condition..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Urgency Toggle (full width) */}
        <div className="md:col-span-2">
          <Controller
            name="urgency"
            control={control}
            render={({ field }) => (
              <label
                htmlFor="urgency-toggle"
                className="flex items-center gap-3 cursor-pointer select-none p-4 rounded-xl border border-border/80 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Switch
                  id="urgency-toggle"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    Mark as Urgent Emergency
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Enable this if blood is needed within the next few hours for
                    surgery or critical condition.
                  </span>
                </div>
              </label>
            )}
          />
          {errors.urgency && (
            <p className="text-xs text-destructive mt-1">
              {errors.urgency.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 mt-4 shadow-sm"
      >
        {isPending ? (
          <>
            <Spinner /> Submitting...
          </>
        ) : (
          "Submit Blood Request"
        )}
      </Button>
    </form>
  );
}

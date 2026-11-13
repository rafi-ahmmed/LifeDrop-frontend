"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import { FetchError } from "ofetch";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCampaign } from "@/hooks";
import { formatFileSize } from "@/utils/formate-file-size";
import { createCampaignZodSchema } from "@/validation";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

type CreateCampaignInput = z.input<typeof createCampaignZodSchema>;
type CreateCampaignPayload = z.output<typeof createCampaignZodSchema>;

export function CreateCampaignForm() {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [medicalReportFiles, setMedicalReportFiles] = useState<File[]>([]);
  const { mutate: createCampaign, isPending: createCampaignLoading } =
    useCreateCampaign();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCampaignInput, undefined, CreateCampaignPayload>({
    resolver: zodResolver(createCampaignZodSchema),
    mode: "onBlur",
    defaultValues: {
      patientName: "",
      hospitalName: "",
      contactNumber: "",
      title: "",
      description: "",
      targetAmount: undefined as unknown as number,
      deadline: "" as unknown as Date,
      prescription: undefined as File | undefined,
      medicalReport: undefined as File[] | undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateCampaignPayload> = (data) => {
    console.log("Campaign Form Payload:", data);

    createCampaign(data, {
      onSuccess: (res) => {
        console.log(res);
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Please try again",
            type: "error",
          });
        }

        reset();

        toast.add({
          title: res.message || "Campaign Created Successfully",
          description:
            "An admin will review it shortly. You will be notified once it's approved.",
          type: "success",
        });
      },
      onError: (err) => {
        console.log(err);
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
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            type="text"
            placeholder="e.g. Rahim Ahmed"
            {...register("patientName")}
          />
          {errors.patientName && (
            <p className="text-xs text-destructive">
              {errors.patientName.message}
            </p>
          )}
        </div>

        {/* Hospital Name */}
        <div className="space-y-2">
          <Label htmlFor="hospitalName">
            Hospital Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="hospitalName"
            type="text"
            placeholder="e.g. Dhaka Medical College"
            {...register("hospitalName")}
          />
          {errors.hospitalName && (
            <p className="text-xs text-destructive">
              {errors.hospitalName.message}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            type="tel"
            placeholder="01712345678"
            {...register("contactNumber")}
          />
          {errors.contactNumber && (
            <p className="text-xs text-destructive">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        {/* Target Amount */}
        <div className="space-y-2">
          <Label htmlFor="targetAmount">Target Amount (BDT)</Label>
          <Input
            id="targetAmount"
            type="number"
            placeholder="20000"
            {...register("targetAmount")}
          />
          {errors.targetAmount && (
            <p className="text-xs text-destructive">
              {errors.targetAmount.message}
            </p>
          )}
        </div>

        {/* Campaign Title */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Campaign Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g. Emergency Treatment Fund"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Provide details about the medical emergency..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Campaign Deadline & Prescription Upload (Side-by-side in 2 columns) */}

        {/* 1. Campaign Deadline */}
        <div className="space-y-2">
          <Label htmlFor="deadline">Campaign Deadline</Label>
          <Input id="deadline" type="date" {...register("deadline")} />
          {errors.deadline && (
            <p className="text-xs text-destructive">
              {errors.deadline.message?.toString()}
            </p>
          )}
        </div>

        {/* 2. Prescription Upload (Required) */}
        <div className="space-y-2">
          <Label htmlFor="prescription">
            Prescription <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            {prescriptionFile ? (
              <div className="flex items-center justify-between rounded-lg border-2 border-dashed p-3 bg-muted/30">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <UploadCloud className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs truncate font-medium">
                      {prescriptionFile.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatFileSize(prescriptionFile.size)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPrescriptionFile(null);
                    setValue("prescription", undefined, {
                      shouldValidate: true,
                    });
                  }}
                  className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="prescriptionInput"
                className="flex items-center justify-between cursor-pointer rounded-lg border-2 border-dashed p-3 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <UploadCloud className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium">
                      Upload Prescription
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      PDF, PNG, JPG (Max 5MB)
                    </span>
                  </div>
                </div>
              </label>
            )}
          </div>
          <input
            id="prescriptionInput"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setPrescriptionFile(file);
              setValue("prescription", file as any, {
                shouldValidate: true,
              });
            }}
          />
          {errors.prescription && (
            <p className="text-xs text-destructive">
              {errors.prescription.message?.toString()}
            </p>
          )}
        </div>

        {/* Medical Report Upload (Optional/Multiple - Full width or separate column) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="medicalReportInput">
            Medical Reports{" "}
            <span className="text-muted-foreground text-[10px]">
              (Min 1, Max 2 reports)
            </span>
          </Label>

          {medicalReportFiles.length > 0 ? (
            <div className="space-y-2">
              {medicalReportFiles.map((file, index: number) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="flex items-center justify-between rounded-lg border-2 border-dashed p-3 bg-muted/30"
                >
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <UploadCloud className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs truncate font-medium">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const updatedFiles = medicalReportFiles.filter(
                        (_, i) => i !== index,
                      );
                      setMedicalReportFiles(updatedFiles);
                      setValue(
                        "medicalReport",
                        updatedFiles.length > 0
                          ? (updatedFiles as any)
                          : ([] as any),
                        { shouldValidate: updatedFiles.length > 0 },
                      );
                    }}
                    className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <label
              htmlFor="medicalReportInput"
              className="flex items-center justify-between cursor-pointer rounded-lg border-2 border-dashed p-3 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <UploadCloud className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium">
                    Upload Medical Reports
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    PDF, PNG, JPG (Max 5MB each)
                  </span>
                </div>
              </div>
            </label>
          )}

          <input
            id="medicalReportInput"
            type="file"
            multiple={true}
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) {
                const combinedFiles = [...medicalReportFiles, ...files].slice(
                  0,
                  2,
                );
                setMedicalReportFiles(combinedFiles);
                setValue("medicalReport", combinedFiles as any, {
                  shouldValidate: true,
                });
              }
              e.target.value = "";
            }}
          />

          {errors.medicalReport && (
            <p className="text-xs text-destructive">
              {errors.medicalReport.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={createCampaignLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 mt-4 shadow-sm"
      >
        {createCampaignLoading ? (
          <>
            <Spinner /> Submitting...
          </>
        ) : (
          "Submit Campaign"
        )}
      </Button>
    </form>
  );
}

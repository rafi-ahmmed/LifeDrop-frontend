"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
import { hospitalRegistrationInputZodSchema } from "@/validation";

export function HospitalRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [additionalDocFile, setAdditionalDocFile] = useState<File | null>(null);

  type HospitalRegistrationInput = z.input<
    typeof hospitalRegistrationInputZodSchema
  >;

  type HospitalRegistrationPayload = z.output<
    typeof hospitalRegistrationInputZodSchema
  >;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<
    HospitalRegistrationInput,
    undefined,
    HospitalRegistrationPayload
  >({
    resolver: zodResolver(hospitalRegistrationInputZodSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      regNum: "",
      address: "",
      phone: "",
      type: "",
      license: undefined as File | undefined,
      additionalDoc: undefined as File | undefined,
    },
  });

  const onSubmit: SubmitHandler<HospitalRegistrationPayload> = (data) => {
    console.log("Hospital Registration Payload:", data);
    // API Call বা ফর্ম সাবমিশন লজিক এখানে হবে
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Hospital Name (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="name">Hospital Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g. Hospital Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Official Email (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="email">Official Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="info@hospital.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Registration Number & Hospital Type (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="regNum">Reg. Number</Label>
            <Input
              id="regNum"
              type="text"
              placeholder="REG-******"
              {...register("regNum")}
            />
            {errors.regNum && (
              <p className="text-xs text-destructive">
                {errors.regNum.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Hospital Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL">General Hospital</SelectItem>
                    <SelectItem value="SPECIALIZED">
                      Specialized Hospital
                    </SelectItem>
                    <SelectItem value="CLINIC">Diagnostic & Clinic</SelectItem>
                    <SelectItem value="MEDICAL_COLLEGE">
                      Medical College
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-xs text-destructive">{errors.type.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="01845485858"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Address (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="Mirpur, Dhaka, Bangladesh"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address.message}</p>
          )}
        </div>

        {/* Document URL & License Upload (2 Columns with Custom Upload Box) */}
        <div className="grid grid-cols-2 gap-3">
          {/* License Upload */}
          <div className="space-y-2">
            <Label htmlFor="license">Upload License</Label>

            <div className="relative">
              {licenseFile ? (
                <div className="flex items-center justify-between rounded-lg border-2 border-dashed p-3 bg-muted/30">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <UploadCloud className="h-5 w-5 text-primary shrink-0" />

                    <div className="flex flex-col text-left">
                      <span className="text-xs truncate font-medium">
                        {licenseFile.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {(licenseFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setLicenseFile(null);
                      setValue("license", undefined, { shouldValidate: true });
                    }}
                    className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="license"
                  className="flex items-center justify-between cursor-pointer rounded-lg border-2 border-dashed p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <UploadCloud className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-medium">
                        Click to upload license
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        PDF, PNG, JPG
                      </span>
                    </div>
                  </div>
                </label>
              )}
            </div>

            <input
              {...register("license")}
              id="license"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setLicenseFile(file);
                setValue("license", file as any, { shouldValidate: true });
              }}
            />

            {errors.license && (
              <p className="text-xs text-destructive">
                {errors.license.message}
              </p>
            )}
          </div>

          {/* Document Upload (docUrl) */}
          <div className="space-y-2">
            <Label htmlFor="additionalDoc">Upload Document</Label>

            <div className="relative">
              {additionalDocFile ? (
                <div className="flex items-center justify-between rounded-lg border-2 border-dashed p-3 bg-muted/30">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <UploadCloud className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs truncate font-medium">
                        {additionalDocFile.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {(additionalDocFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setAdditionalDocFile(null);
                      setValue("additionalDoc", undefined, {
                        shouldValidate: true,
                      });
                    }}
                    className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="additionalDoc"
                  className="flex items-center justify-between cursor-pointer rounded-lg border-2 border-dashed p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <UploadCloud className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-medium">
                        Click to upload document
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        PDF, PNG, JPG
                      </span>
                    </div>
                  </div>
                </label>
              )}
            </div>

            <input
              {...register("additionalDoc")}
              id="additionalDoc"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setAdditionalDocFile(file);
                setValue("additionalDoc", file as any, {
                  shouldValidate: true,
                });
              }}
            />

            {errors.additionalDoc && (
              <p className="text-xs text-destructive">
                {errors.additionalDoc.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
          {isSubmitting ? "Registering..." : "Register Hospital"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center text-xs text-muted-foreground pt-1">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

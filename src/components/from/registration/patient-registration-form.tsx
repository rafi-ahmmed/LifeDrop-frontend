"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { patientRegistrationPayload } from "@/types";
import { patientRegistrationZodSchema } from "@/validation";

export function PatientRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<patientRegistrationPayload>({
    resolver: zodResolver(patientRegistrationZodSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<patientRegistrationPayload> = async (data) => {
    // TODO: Connect your patient registration API.
    console.log(data);
  };

  return (
    <div className="w-full space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <Field>
          <FieldLabel htmlFor="patient-name">Full Name</FieldLabel>
          <Input
            {...register("name")}
            id="patient-name"
            type="text"
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-[12px] text-red-500">
              <TriangleAlert size={13} />
              {errors.name.message}
            </p>
          )}
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="patient-email">Email Address</FieldLabel>
          <Input
            {...register("email")}
            id="patient-email"
            type="email"
            placeholder="Enter your valid email address"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="flex items-center gap-1 text-[12px] text-red-500">
              <TriangleAlert size={13} />
              {errors.email.message}
            </p>
          )}
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="patient-password">Password</FieldLabel>
          <div className="relative">
            <Input
              {...register("password")}
              id="patient-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="pr-10"
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="flex items-center gap-1 text-[12px] text-red-500">
              <TriangleAlert size={13} />
              {errors.password.message}
            </p>
          )}
        </Field>

        {/* Phone */}
        <Field>
          <FieldLabel htmlFor="patient-phone">Phone Number</FieldLabel>
          <Input
            {...register("phone")}
            id="patient-phone"
            type="tel"
            placeholder="01********"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="flex items-center gap-1 text-[12px] text-red-500">
              <TriangleAlert size={13} />
              {errors.phone.message}
            </p>
          )}
        </Field>

        {/* Address */}
        <Field>
          <FieldLabel htmlFor="patient-address">Address</FieldLabel>
          <Input
            {...register("address")}
            id="patient-address"
            type="text"
            placeholder="Enter your address"
            aria-invalid={!!errors.address}
          />
          {errors.address && (
            <p className="flex items-center gap-1 text-[12px] text-red-500">
              <TriangleAlert size={13} />
              {errors.address.message}
            </p>
          )}
        </Field>

        {/* Submit */}
        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register as Patient"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="pt-1 text-center text-xs text-muted-foreground">
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

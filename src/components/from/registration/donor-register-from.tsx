"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FetchError } from "ofetch";
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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRegisterDonor } from "@/hooks";
import { donorRegistrationZodSchema } from "@/validation";

export function DonorRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  type DonorFormInput = z.input<typeof donorRegistrationZodSchema>;
  type DonorFormOutput = z.output<typeof donorRegistrationZodSchema>;

  const { mutate: registerDonor, isPending: registerDonorPending } =
    useRegisterDonor();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DonorFormInput, unknown, DonorFormOutput>({
    resolver: zodResolver(donorRegistrationZodSchema),
    mode: "onChange",
    defaultValues: {
      name: "Rafi Rahman",
      email: "rafi.dev920@gmail.com",
      password: "@123Aa",
      bloodGroup: undefined,
      gender: undefined,
      phone: "01844566545",
      address: "",
      district: "",
      dateOfBirth: "",
    },
  });

  const onSubmit: SubmitHandler<DonorFormOutput> = async (data) => {


    const donorData = {
      name: data.name,
      email: data.email,
      password: data.password,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      district: data.district,
      dateOfBirth: data.dateOfBirth,
    };

    registerDonor(donorData, {
      onSuccess: (res) => {
        console.log(res);
        // router.push("/"); TODO: Redirect to OTP page

        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Please try again",
            type: "error",
          });
        }

        toast.add({
          title: res.message || "Registration Successful",
          description: "We have sent you an OTP to your email",
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
    <div className="w-full space-y-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="donor-name">Full Name</Label>
          <Input
            id="donor-name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="donor-email">Email Address</Label>
          <Input
            id="donor-email"
            type="email"
            placeholder="Enter your valid email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="donor-password">Password</Label>
          <div className="relative">
            <Input
              id="donor-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

        {/* Blood Group & Gender Grid (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Blood Group Select */}
          <div className="space-y-2">
            <Label>Blood Group</Label>
            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Blood" />
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

          {/* Gender Select */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
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
              <p className="text-xs text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="donor-phone">Phone Number</Label>
          <Input
            id="donor-phone"
            type="tel"
            placeholder="01********"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="donor-address">Address</Label>
          <Input
            id="donor-address"
            type="text"
            placeholder="Enter your address"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address.message}</p>
          )}
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor="donor-district">District</Label>
          <Input
            id="donor-district"
            type="text"
            placeholder="Enter your district"
            {...register("district")}
          />
          {errors.district && (
            <p className="text-xs text-destructive">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="donor-dob">Date of Birth</Label>
          <Input id="donor-dob" type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && (
            <p className="text-xs text-destructive">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={registerDonorPending}
          className="w-full mt-2"
        >
          {registerDonorPending ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            "Register as Donor"
          )}
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

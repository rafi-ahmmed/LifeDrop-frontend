"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "ofetch";
import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useVerifyEmail } from "@/hooks";
import type { verifyEmailPayload } from "@/types";
import { verifyEmailZodSchema } from "@/validation";

const VerifyAccountForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const { mutate: verifyEmail, isPending: verifyPending } = useVerifyEmail();

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<verifyEmailPayload>({
    resolver: zodResolver(verifyEmailZodSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<verifyEmailPayload> = async (data) => {
    const verifyData = {
      email: email as string,
      otp: data.otp,
    };

    verifyEmail(verifyData, {
      onSuccess: (res) => {
        console.log(res);
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Please try again",
            type: "error",
          });
          return;
        }

        toast.add({
          title: res.message || "Verification Successful",
          description: "You can now login",
          type: "success",
        });

        router.push("/");
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

  if (!email) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field className="w-full space-y-2">
        <FieldLabel
          htmlFor="otp"
          className="text-xs font-medium text-foreground"
        >
          Verification Code (OTP){" "}
          {email && <span className="text-muted-foreground">({email})</span>}
        </FieldLabel>

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <InputOTP
              id="otp"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value}
              onChange={field.onChange}
              className="w-full"
            >
              <InputOTPGroup className="grid grid-cols-6 gap-2 w-full justify-between">
                <InputOTPSlot
                  index={0}
                  className="h-12 w-full text-center text-lg font-bold rounded-md border"
                />
                <InputOTPSlot
                  index={1}
                  className="h-12 w-full text-center text-lg font-bold rounded-md border"
                />
                <InputOTPSlot
                  index={2}
                  className="h-12 w-full text-center text-lg font-bold rounded-md border"
                />
                <InputOTPSlot
                  index={3}
                  className="h-12 w-full text-center text-lg font-bold rounded-md border"
                />
                <InputOTPSlot
                  index={4}
                  className="h-12 w-full text-center text-lg font-bold rounded-md border"
                />
                <InputOTPSlot
                  index={5}
                  className="h-12 w-full text-center text-lg font-bold rounded-md border"
                />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.otp && (
          <p className="text-xs text-destructive mt-1">{errors.otp.message}</p>
        )}
      </Field>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
      >
        {verifyPending ? (
          <>
            <Spinner /> Verifying...
          </>
        ) : (
          "Verify & Continue"
        )}
      </Button>
    </form>
  );
};

export default VerifyAccountForm;

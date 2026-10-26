"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VerifyAccountForm = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");


  // 1. Single digit input & auto-focus
  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // 2. Backspace focus transfer
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // 3. Paste event for full code auto-fill (Ctrl + V)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    const targetIndex = Math.min(digits.length, 5);
    const targetInput = document.getElementById(`otp-input-${targetIndex}`);
    targetInput?.focus();
  };

  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="otp-input-0"
          className="text-xs font-medium text-foreground"
        >
          Verification Code (OTP) {email}
        </Label>
        {/* 6 Digit Input Grid */}
        <div className="grid grid-cols-6 gap-2">
          {otp.map((digit, index) => (
            <Input
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="h-12 text-center text-lg font-bold"
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="button"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
      >
        Verify & Continue
      </Button>
    </form>
  );
};

export default VerifyAccountForm;

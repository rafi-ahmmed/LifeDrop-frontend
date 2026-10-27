"use client";

import { Eye, EyeOff, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

export function HospitalRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-4 ">
      <form className="space-y-5">
        {/* Hospital Name (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="name">Hospital Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g. City General Hospital"
          />
        </div>

        {/* Official Email (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="email">Official Email</Label>
          <Input id="email" type="email" placeholder="info@hospital.com" />
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
        </div>

        {/* Registration Number & Hospital Type (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="rehNum">Reg. Number</Label>
            <Input id="rehNum" type="text" placeholder="REG-987654" />
          </div>

          <div className="space-y-2">
            <Label>Hospital Type</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GENERAL">General Hospital</SelectItem>
                <SelectItem value="SPECIALIZED">
                  Specialized Hospital
                </SelectItem>
                <SelectItem value="CLINIC">Diagnostic & Clinic</SelectItem>
                <SelectItem value="MEDICAL_COLLEGE">Medical College</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Phone Number (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="01845485858" />
        </div>

        {/* Address (1 Column) */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="Mirpur, Dhaka, Bangladesh"
          />
        </div>

        {/* Document URL & License Upload (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          {/* License Upload */}
          <div className="space-y-2">
            <Label htmlFor="license">Upload License</Label>
            <label
              htmlFor="license"
              className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-border rounded-lg cursor-pointer bg-card hover:bg-muted/50 transition-colors text-center group"
            >
              <UploadCloud className="w-5 h-5 text-muted-foreground group-hover:text-primary mb-1 transition-colors" />
              <span className="text-xs font-medium text-foreground">
                Click to upload license
              </span>
              <span className="text-[10px] text-muted-foreground">
                PDF, PNG, JPG
              </span>
              <input id="license" type="file" className="hidden" />
            </label>
          </div>
          {/* Document Upload (docUrl) */}
          <div className="space-y-2">
            <Label htmlFor="docUrl">Upload Document</Label>
            <label
              htmlFor="docUrl"
              className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-border rounded-lg cursor-pointer bg-card hover:bg-muted/50 transition-colors text-center group"
            >
              <UploadCloud className="w-5 h-5 text-muted-foreground group-hover:text-primary mb-1 transition-colors" />
              <span className="text-xs font-medium text-foreground">
                Click to upload doc
              </span>
              <span className="text-[10px] text-muted-foreground">
                PDF, PNG, JPG
              </span>
              <input id="docUrl" type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="button" className="w-full mt-2">
          Register Hospital
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

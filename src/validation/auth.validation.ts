import z from "zod";
import { BLOOD_GROUPS, GENDERS } from "@/constance";

export const loginZodSchema = z.object({
  email: z.string().email("Not a valid email"),
  password: z
    .string("Password is required!")
    .min(6, "Password must be at least 6 characters"),
});

export const patientRegistrationZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(12, "Name must be at most 12 characters"),
  email: z.email("Not a valid email"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    )
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),

  phone: z
    .string()
    .refine(
      (phone) => phone === "" || /^(013|014|015|016|017|018)\d{8}$/.test(phone),
      {
        message: "Enter a valid Bangladeshi phone number",
      },
    )
    .optional(),

  address: z
    .string("Enter your address")
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address must be at most 100 characters")
    .optional(),
});

export const donorRegistrationZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(12, "Name must be at most 12 characters"),
  email: z.email("Not a valid email"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    )
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),

  bloodGroup: z.enum(BLOOD_GROUPS, {
    message: "Please select your blood group.",
  }),

  gender: z.enum(GENDERS, {
    message: "Please select your gender.",
  }),

  phone: z
    .string("Phone number is required")
    .refine((phone) => /^(013|014|015|016|017|018)\d{8}$/.test(phone), {
      message: "Enter a valid Bangladeshi phone number",
    }),

  address: z
    .string("address is not a string or is empty")
    .trim()
    .min(5, "Address must be at least 5 characters."),

  district: z
    .string("district is not a string or is empty")
    .trim()
    .min(2, "District must be at least 2 characters."),

  dateOfBirth: z.coerce
    .date("date Of Birth is not a date or is empty")
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future.",
    })
    .refine(
      (date) => {
        const today = new Date();
        const eighteenthBirthday = new Date(date);
        eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);

        return eighteenthBirthday <= today;
      },
      {
        message: "Donor must be at least 18 years old.",
      },
    ),
});

export const verifyEmailZodSchema = z.object({
  otp: z.string("OTP is required").length(6, "OTP must be 6 digits"),
});

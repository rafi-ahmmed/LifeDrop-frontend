import z from "zod";
import { BLOOD_GROUPS, GENDERS } from "@/constance";

export const createBloodRequestZodSchema = z.object({
  patientName: z
    .string("Patient name is required")
    .trim()
    .min(1, "Patient name is required"),

  bloodGroup: z.enum(BLOOD_GROUPS, {
    message: "Please select a valid blood group",
  }),

  gender: z.enum(GENDERS, {
    message: "Please select a valid gender",
  }),

  reason: z.string("Reason is required").trim().min(1, "Reason is required"),

  phone: z
    .string("Phone number is required")
    .trim()
    .min(11, "Phone number must be at least 11 characters")
    .max(15, "Phone number cannot exceed 15 characters"),

  units: z.coerce
    .number("Units is required")
    .int("Units must be an integer")
    .positive("Units must be greater than 0"),

  address: z.string().trim().min(1, "Address is required"),

  district: z.string().trim().min(1, "District is required"),

  neededAt: z
    .string("Needed date is required")
    .min(1, "Needed date is required")
    .refine((value) => {
      const d = new Date(value);
      return !Number.isNaN(d.getTime()) && d > new Date();
    }, "Needed date must be in the future"),

  urgency: z.boolean("Please specify urgency"),

  description: z.string().optional().default("I need blood"),
});

export type CreateBloodRequestPayload = z.infer<
  typeof createBloodRequestZodSchema
>;

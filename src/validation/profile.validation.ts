import z from "zod";

export const updateProfileSchema = z.object({
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  district: z
    .string()
    .min(2, "District name is too short")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .optional()
    .or(z.literal("")),
});

export type TUpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

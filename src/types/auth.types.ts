import type z from "zod";
import type {
  loginZodSchema,
  patientRegistrationZodSchema,
} from "@/validation";

export type LoginInput = z.infer<typeof loginZodSchema>;

export type patientRegistrationPayload = z.infer<
  typeof patientRegistrationZodSchema
>;

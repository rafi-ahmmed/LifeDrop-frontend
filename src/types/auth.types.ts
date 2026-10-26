import type z from "zod";
import type {
  donorRegistrationZodSchema,
  loginZodSchema,
  patientRegistrationZodSchema,
  verifyEmailZodSchema,
} from "@/validation";

export type LoginInput = z.infer<typeof loginZodSchema>;

export type patientRegistrationPayload = z.infer<
  typeof patientRegistrationZodSchema
>;

export type donorRegistrationPayload = z.infer<
  typeof donorRegistrationZodSchema
>;

export type verifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;

export interface verifyEmailPayloadForApi {
  email: string;
  otp: string;
}

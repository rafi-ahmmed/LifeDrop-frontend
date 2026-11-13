import z from "zod";

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileValidation = (fieldName: string) =>
  z.preprocess(
    (value) => {
      if (value instanceof FileList) {
        return value.length > 0 ? value[0] : undefined;
      }

      return value;
    },
    z
      .instanceof(File, {
        message: `Please upload ${fieldName}`,
      })
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `${fieldName} must be less than 7 MB`,
      )
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        `${fieldName} must be a PDF, PNG, or JPG file`,
      )
      .optional(),
  );

export const createCampaignZodSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  hospitalName: z
    .string()
    .min(2, "Hospital name must be at least 2 characters")
    .optional(),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  title: z.string().min(5, "Campaign title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  targetAmount: z.coerce
    .number()
    .positive("Target amount must be a positive number"),
  deadline: z.coerce
    .date("Deadline is required")
    .refine((date) => date > new Date(), "Deadline must be in the future"),
  prescription: fileValidation("Prescription"),
  medicalReport: z
    .array(fileValidation("Medical Report"))
    .min(1, "Please upload at least one medical report")
    .max(2, "You can upload maximum 2 medical reports"),
});

export type CreateCampaignPayload = z.infer<typeof createCampaignZodSchema>;

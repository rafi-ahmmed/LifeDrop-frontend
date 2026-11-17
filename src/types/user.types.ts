export type UserRole =
  | "ADMIN"
  | "SUPER_ADMIN"
  | "DONOR"
  | "PATIENT";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface TDonorProfile {
  id: string;
  userId: string;
  bloodGroup: string;
  gender: string;
  phone: string;
  address: string;
  district: string;
  availability: boolean;
  dateOfBirth: string;
  lastDonatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TPatientProfile {
  id: string;
  userId: string;
  phone: string;
  address: string;
  district: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TUserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  authProvider: "CREDENTIALS" | "GOOGLE";
  status: UserStatus;
  googleId: string | null;
  image: string | null;
  imagePublicId: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  donor?: TDonorProfile | null;
  patient?: TPatientProfile | null;
}

export interface TGetMeResponse {
  success: boolean;
  message: string;
  data: TUserItem;
}

export interface TUpdateProfilePayload {
  phone?: string;
  address?: string;
  district?: string;
}

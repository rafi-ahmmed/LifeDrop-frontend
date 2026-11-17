export const PUBLIC_KEYS = {
  ALL_CAMPAIGNS: "all-campaigns",
} as const;

export const AUTH_KEYS = {
  CURRENT_USER: "user",
} as const;

export const PATIENT_QUERY_KEYS = {
  PATIENT_STATS: "patient-stats",
  PATIENT_PAYMENTS: "my-payments",
  PATIENT_BLOOD_REQ: "my-blood-requests",
  PATIENT_MATCHING_DONOR_RES: "matched-donor",
  PATIENT_DONOR_REQ: "my-donor-requests",
  PATIENT_CAMPAIGNS: "my-campaigns",
} as const;

export const DONOR_QUERY_KEYS = {
  DONOR_STATS: "donor-stats",
  DONORs_DONOR_REQ: "donor's-donor-requests",
} as const;

export const ADMIN_QUERY_KEYS = {
  ADMIN_STATS: "admin-stats",
  ADMIN_BLOOD_REQs: "blood-requests",
  ADMIN_ALL_USERS: "admin-users",
  ADMIN_ALL_CAMPAIGNS: "admin-all-campaigns",
} as const;

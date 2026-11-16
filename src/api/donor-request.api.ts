import apiClient from "@/lib/api-client";
import type {
  TBloodRequestInfoForDonorResponse,
  TRespondPayload,
} from "@/types";

export const getMyDonorRequestForDonor = () => {
  return apiClient<TBloodRequestInfoForDonorResponse>(
    "/donor-requests/my-requests",
  );
};

export const respondToDonorRequest = ({
  id,
  payload,
}: {
  id: string;
  payload: TRespondPayload;
}) => {
  return apiClient(`/donor-requests/respond/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

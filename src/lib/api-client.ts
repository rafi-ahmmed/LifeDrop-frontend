import { toast } from "@/components/ui/toast";
import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  async onResponseError({ response }) {
    if (response.status === 0 || !response._data) {
      toast.add({
        title: "Server Connection Error",
        description: "The backend server is currently offline.",
        type: "error",
      });
    }
  },
});

export default apiClient;

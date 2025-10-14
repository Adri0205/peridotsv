import { apiClient } from "./api";

export async function getPulseras(params) {
  const response = await apiClient.get("/pulseras", {
    params,
  });
  const data = response.data;
  return data;
}

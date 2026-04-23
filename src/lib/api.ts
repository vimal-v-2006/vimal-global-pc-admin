const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:4100";

export const HEALTH_ENDPOINT = `${API_BASE_URL}/health`;

export const REQUESTS_ENDPOINT = `${API_BASE_URL}/requests`;

export function requestByIdEndpoint(id: string) {
  return `${REQUESTS_ENDPOINT}/${id}`;
}

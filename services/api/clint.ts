import { API_URL } from "../config";

async function fetchAPI(
  endpoint: string,
  options: RequestInit = {},
  retry: boolean = true,
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
    },
  });

  if (response.status === 401 && retry) {
    try {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        return fetchAPI(endpoint, options, false);
      }
    } catch (error) {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const api = {
  get: (url: string) => fetchAPI(url, { method: "GET" }),
  post: (url: string, data?: any, isFormData?: boolean) =>
    fetchAPI(url, {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    }),
  patch: (url: string, data?: any) =>
    fetchAPI(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  put: (url: string, data?: any, isFormData?: boolean) =>
    fetchAPI(url, {
      method: "PUT",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    }),
  delete: (url: string) => fetchAPI(url, { method: "DELETE" }),
};

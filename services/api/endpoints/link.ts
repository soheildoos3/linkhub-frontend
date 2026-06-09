import { LinkCreate, LinkUpdate } from "@/types/link";
import { api } from "../clint";

export const linkService = {
  createLink: (data: LinkCreate) => api.post("/links/", data),
  getLinks: (params?: { skip?: number; limit?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const queryString = searchParams.toString();
    return api.get(`/links/${queryString ? `?${queryString}` : ""}`);
  },
  clickLink: (username: string, linkId: number) =>
    api.get(`/links/${username}/${linkId}`),
  getLink: (username: string) => api.get(`/links/${username}`),
  updateLink: (link_id: number, data: LinkUpdate) =>
    api.patch(`/links/${link_id}`, data),
  deleteLink: (link_id: number) => api.delete(`/links/${link_id}`),
  deleteLinks: () => api.delete("/links/"),
};

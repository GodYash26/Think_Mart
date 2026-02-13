import apiClient from "../axios";
import type { User } from "@/types/auth";

export interface UsersResponse {
  message: string;
  users: User[];
}

export const userApi = {
  // Get all users (admin only)
  getAllUsers: async (): Promise<UsersResponse> => {
    const response = await apiClient.get<UsersResponse>("/user");
    return response.data;
  },
};

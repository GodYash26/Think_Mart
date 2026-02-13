import apiClient from "../axios";
import type { LoginCredentials, LoginResponse, User } from "@/types/auth";

export interface RegisterCredentials {
  fullname: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

export interface RegisterResponse extends LoginResponse {}

export const authApi = {
  // Register user
  register: async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      credentials
    );
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/profile");
    return response.data;
  },

  // Logout user
  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>("/auth/logout");
    return response.data;
  },

  // Refresh tokens
  refreshTokens: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/auth/refresh"
    );
    return response.data;
  },
};


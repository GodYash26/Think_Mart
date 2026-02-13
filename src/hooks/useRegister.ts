import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi, type RegisterCredentials } from "@/lib/api/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      return authApi.register(credentials);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "profile"], data.user);
      toast.success(data.message || "Account created successfully!");
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard", {
        replace: true,
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    },
  });
};

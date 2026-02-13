import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi, type RegisterCredentials } from "@/lib/api/auth";
import type { AuthContextType, LoginCredentials, User } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: authApi.getProfile,
    retry: false,
    enabled: false, 
    staleTime: 5 * 60 * 1000, 
  });

  useEffect(() => {
    refetchUser().catch(() => {
    });
  }, []);

  useEffect(() => {
    if (profileData) {
      setUser(profileData);
    }
  }, [profileData]);

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["auth", "profile"], data.user);
      toast.success(data.message || "Account created successfully!");
      const route = data.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
      navigate(route, { replace: true });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["auth", "profile"], data.user);
      toast.success(data.message);
      const route = data.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
      navigate(route, { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message || "Login failed. Please try again.");
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      setUser(null);
      queryClient.clear();
      toast.success(data.message || "Logged out successfully!");
      navigate("/login-form", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.message || "Logout failed.");
    },
  });

  const register = async (credentials: RegisterCredentials) => {
    await registerMutation.mutateAsync(credentials);
  };

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const handleRefetchUser = async () => {
    await refetchUser();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    refetchUser: handleRefetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

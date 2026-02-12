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
import { authApi } from "@/lib/api/auth";
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

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["auth", "profile"], data.user);
      toast.success(data.message);
      navigate("/admin/dashboard", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed. Please try again.");
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

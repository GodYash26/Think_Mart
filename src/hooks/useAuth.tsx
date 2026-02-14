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
  const [isInitializing, setIsInitializing] = useState(true);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isProfileLoading, refetch: refetchUser } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: authApi.getProfile,
    retry: false,
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const result = await refetchUser();

        if (result.data) {
          setUser(result.data);
          queryClient.setQueryData(["auth", "profile"], result.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Auth check failed - user not authenticated");
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      console.log("Registration successful:", data.user);
      setUser(data.user);
      queryClient.setQueryData(["auth", "profile"], data.user);
      toast.success(data.message || "Account created successfully!");

      setTimeout(() => {
        const route =
          data.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
        console.log("Navigating to:", route, "User role:", data.user.role);
        navigate(route, { replace: true });
      }, 100);
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log("Login successful:", data.user);
      setUser(data.user);
      queryClient.setQueryData(["auth", "profile"], data.user);
      toast.success(data.message);

      setTimeout(() => {
        const route =
          data.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
        console.log("Navigating to:", route, "User role:", data.user.role);
        navigate(route, { replace: true });
      }, 100);
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      setUser(null);
      queryClient.clear();
      toast.success(data.message || "Logged out successfully!");
      navigate("/", { replace: true });
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

  const openAuthSheet = (tab: "signin" | "signup" = "signin") => {
    setAuthTab(tab);
    setAuthSheetOpen(true);
  };

  const closeAuthSheet = () => {
    setAuthSheetOpen(false);
  };

  const value: AuthContextType = {
    user,
    isLoading: isInitializing || isProfileLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    refetchUser: handleRefetchUser,
    authSheetOpen,
    setAuthSheetOpen,
    authTab,
    setAuthTab,
    openAuthSheet,
    closeAuthSheet,
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

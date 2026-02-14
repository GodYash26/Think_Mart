export const UserRole = {
  CUSTOMER: "customer",
  ADMIN: "admin",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  fullname: string;
  address?: string;
  phone?: string;
  role: UserRole;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullname: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
  authSheetOpen: boolean;
  setAuthSheetOpen: (open: boolean) => void;
  authTab: "signin" | "signup";
  setAuthTab: (tab: "signin" | "signup") => void;
  openAuthSheet: (tab?: "signin" | "signup") => void;
  closeAuthSheet: () => void;
}

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/auth";
import { Button } from "./ui/button";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role-based access
  if (allowedRoles && user) {
    console.log('ProtectedRoute Debug:', {
      userRole: user.role,
      allowedRoles: allowedRoles,
      includes: allowedRoles.includes(user.role),
      roleType: typeof user.role
    });
    
    if (!allowedRoles.includes(user.role)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
            <p className="mt-2 text-muted-foreground">
              You don't have permission to access this page.
            </p>
            <Button
            
              onClick={() => window.history.back()}
              className="mt-4 bg-destructive text-white hover:bg-destructive/90"
            >
              Go Back
            </Button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

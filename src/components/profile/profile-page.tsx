import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
          </CardHeader>
          <CardContent>Please log in to view your profile.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Full Name
              </label>
              <p className="text-lg font-medium">{user.fullname}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Email
              </label>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Phone
              </label>
              <p className="text-lg font-medium">{user.phone || "N/A"}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Address
              </label>
              <p className="text-lg font-medium">{user.address || "N/A"}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Role
              </label>
              <p className="text-lg font-medium capitalize">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user.role}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Account Type
              </label>
              <p className="text-lg font-medium capitalize">
                {user.provider || "Local"}
              </p>
            </div>
          </div>

          {/* Account Dates */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600">
              Account created on{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Role-Based Actions */}
          {user.role === "admin" && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Admin Actions</h3>
              <p className="text-sm text-gray-600">
                You have admin access to manage products, categories, and users.
              </p>
            </div>
          )}

          {user.role === "customer" && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Customer Features</h3>
              <p className="text-sm text-gray-600">
                View your orders, manage favorites, and track purchases.
              </p>
            </div>
          )}

          {/* Logout Button */}
          <div className="border-t pt-6 flex gap-3">
            <Button variant="outline" className="flex-1">
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

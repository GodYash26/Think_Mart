import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/lib/api/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Users } from "lucide-react";
import type { User } from "@/types/auth";

export function AdminCustomersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["customers"],
    queryFn: userApi.getAllUsers,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load customers</p>
          <p className="text-sm text-gray-600">{(error as any).message}</p>
        </div>
      </div>
    );
  }

  const users = data?.users || [];
  const customers = users.filter((user: User) => user.role === "customer");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customers</h1>
        <p className="text-gray-600">Manage and view all registered users</p>
      </div>

      {customers.length === 0 ? (
        <div className="flex items-center justify-center min-h-75">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No customers found
            </h3>
            <p className="text-gray-600">
              Customers will appear here once they register.
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>{user.address || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

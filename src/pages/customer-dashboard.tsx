import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingBag, Heart, Package, Calendar, CreditCard, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "@/types/order";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.PAID]: "bg-blue-100 text-blue-800",
  [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-800",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
};

export default function CustomerDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getMyOrders,
    enabled: !!user,
  });

  const isLoading = authLoading || ordersLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user || user.role !== "customer") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            You don't have permission to access this page.
          </CardContent>
        </Card>
      </div>
    );
  }

  const orders = ordersData?.orders || [];
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.fullname}!</h1>
        <p className="text-gray-600">Manage your purchases and account here.</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Orders Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              My Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600 mb-2">{totalOrders}</p>
            <p className="text-gray-600 mb-4">
              {totalOrders === 0 ? "No orders yet" : "View and track your orders"}
            </p>
            <Button
              onClick={() => navigate("/customer/orders")}
              className="w-full"
            >
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Favorites Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-600 mb-2">0</p>
            <p className="text-gray-600 mb-4">
              Your saved favorite products
            </p>
            <Button
              onClick={() => navigate("/customer/favorites")}
              variant="outline"
              className="w-full"
            >
              View Favorites
            </Button>
          </CardContent>
        </Card>

        {/* Total Spent Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-green-600" />
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600 mb-2">${totalSpent.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">
              Continue shopping for more
            </p>
            <Button
              onClick={() => navigate("/products")}
              variant="outline"
              className="w-full"
            >
              Shop Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      {totalOrders > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            {totalOrders > 3 && (
              <Button
                onClick={() => navigate("/customer/orders")}
                variant="ghost"
                className="flex items-center gap-2"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {recentOrders.map((order) => (
              <Card key={order._id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between p-4 bordered">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold text-lg">Order #{order._id.slice(-8)}</p>
                        <Badge className={statusColors[order.status]}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          {order.paymentMethod}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {order.items.map((item) => item.productName).join(", ")}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-green-600">
                        ${order.totalAmount?.toFixed(2) || "0.00"}
                      </p>
                      <Button
                        onClick={() => navigate("/customer/orders")}
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalOrders === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to place your first order!</p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-green-600 hover:bg-green-700"
            >
              Browse Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

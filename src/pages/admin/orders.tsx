import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Package } from "lucide-react";
import { OrderStatus } from "@/types/order";
import { toast } from "sonner";
import { useState } from "react";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.PAID]: "bg-blue-100 text-blue-800",
  [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-800",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
};

export function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: orderApi.getAllOrders,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setUpdatingOrderId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update order status");
      setUpdatingOrderId(null);
    },
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    updateStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load orders</p>
          <p className="text-sm text-gray-600">{(error as any).message}</p>
        </div>
      </div>
    );
  }

  const orders = data?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600">Orders will appear here once customers start ordering.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order._id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg mb-2">Order #{order._id.slice(-8)}</CardTitle>
                  <div className="text-sm text-gray-600">
                    <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>User ID: {order.userId}</p>
                    {order.user && (
                      <>
                        <p className="font-medium mt-2">Customer Details:</p>
                        <p>Name: {order.user.fullname}</p>
                        <p>Email: {order.user.email}</p>
                        <p>Phone: {order.user.phone}</p>
                      </>
                    )}
                    <p className="mt-2">Payment: {order.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[order.status]}>
                    {order.status.toUpperCase()}
                  </Badge>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order._id, value)}
                    disabled={updatingOrderId === order._id}
                  >
                    <SelectTrigger className="w-37.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                      <SelectItem value={OrderStatus.PAID}>Paid</SelectItem>
                      <SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
                      <SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
                      <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Order Items:</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => {
                    const originalTotal = (item.originalPrice || 0) * item.quantity;
                    const discountAmount = item.discountedPrice || 0;
                    const totalDiscount = discountAmount * item.quantity;
                    const priceAfterDiscount = item.priceAfterDiscount || ((item.originalPrice || 0) - discountAmount);
                    
                    return (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <p className="font-medium text-base">{item.productName}</p>
                            {item.unit && <p className="text-sm text-gray-500">{item.unit}</p>}
                          </div>
                          <p className="font-semibold text-lg text-green-600">${item.subtotal?.toFixed(2) || "0.00"}</p>
                        </div>
                        {item.originalPrice && item.discountedPrice ? (
                          <div className="space-y-1.5 text-sm border-t pt-3">
                            <div className="flex justify-between text-gray-700">
                              <span>Original Price: ${item.originalPrice.toFixed(2)} × {item.quantity}</span>
                              <span className="font-medium">${originalTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                              <span>Discount: ${discountAmount.toFixed(2)} × {item.quantity}</span>
                              <span className="font-medium">-${totalDiscount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              <span>Price After Discount: ${priceAfterDiscount.toFixed(2)} × {item.quantity}</span>
                              <span className="font-semibold">${item.subtotal?.toFixed(2) || "0.00"}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600 border-t pt-2">
                            Quantity: × {item.quantity}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t pt-4 mb-4">
                <h4 className="font-semibold mb-2">Shipping Address:</h4>
                <p className="text-gray-600">{order.shippingAddress}</p>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 space-y-2">
                {order.subtotalAmount !== undefined && (
                  <>
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-medium">${order.subtotalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Charge:</span>
                      <span className="font-medium">${(order.deliveryCharge || 0).toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${order.totalAmount?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

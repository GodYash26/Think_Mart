import apiClient from "../axios";
import type { CreateOrderDto, CreateOrderResponse, OrdersResponse, Order } from "@/types/order";

export const orderApi = {
  // Create a new order
  create: async (orderData: CreateOrderDto): Promise<CreateOrderResponse> => {
    const response = await apiClient.post<CreateOrderResponse>(
      "/orders",
      orderData
    );
    return response.data;
  },

  // Get all orders for current user
  getMyOrders: async (): Promise<OrdersResponse> => {
    const response = await apiClient.get<OrdersResponse>("/orders/my-orders");
    return response.data;
  },

  // Get all orders (admin only)
  getAllOrders: async (): Promise<OrdersResponse> => {
    const response = await apiClient.get<OrdersResponse>("/orders");
    return response.data;
  },

  // Get a single order by ID
  getOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  // Update order status (admin only)
  updateStatus: async (id: string, status: string): Promise<{ message: string; order: Order }> => {
    const response = await apiClient.patch<{ message: string; order: Order }>(
      `/orders/${id}`,
      { status }
    );
    return response.data;
  },

  // Delete an order (admin only)
  deleteOrder: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/orders/${id}`);
    return response.data;
  },
};

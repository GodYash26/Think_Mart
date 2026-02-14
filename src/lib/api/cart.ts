import apiClient from "../axios";
import type { CartResponse, AddToCartPayload, RemoveFromCartPayload, UpdateCartItemPayload } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const cartApi = {
  // Add item to cart
  addToCart: async (payload: AddToCartPayload): Promise<CartResponse> => {
    const response = await apiClient.post<CartResponse>(
      "/cart/add",
      payload
    );
    return response.data;
  },

  // Get user's cart
  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get<CartResponse>("/cart");
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (payload: UpdateCartItemPayload): Promise<CartResponse> => {
    const response = await apiClient.patch<CartResponse>(
      "/cart/update",
      payload
    );
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (payload: RemoveFromCartPayload): Promise<CartResponse> => {
    const response = await apiClient.delete<CartResponse>(
      "/cart/remove",
      { data: payload }
    );
    return response.data;
  },

  // Clear entire cart
  clearCart: async (): Promise<CartResponse> => {
    const response = await apiClient.delete<CartResponse>("/cart/clear");
    return response.data;
  },
};


export const useGetCart = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    staleTime: 1 * 60 * 1000, 
    retry: false,
    enabled,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: (data) => {
      toast.success("Item added to cart!");
      queryClient.setQueryData(["cart"], data);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Failed to add item to cart";
      toast.error(message);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: (data) => {
      toast.success("Item removed from cart");
      queryClient.setQueryData(["cart"], data);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Failed to remove item";
      toast.error(message);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.updateCartItem,
    onSuccess: (data) => {
      toast.success("Cart updated");
      queryClient.setQueryData(["cart"], data);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Failed to update cart";
      toast.error(message);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Failed to clear cart";
      toast.error(message);
    },
  });
};

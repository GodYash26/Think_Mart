export interface OrderItem {
  productId: string;
  productName: string;
  unit?: string;
  originalPrice?: number;
  discountedPrice?: number;  priceAfterDiscount?: number;  discountPercentage?: number;
  quantity: number;
  subtotal: number;
}

export const OrderStatus = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface OrderUser {
  fullname: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  userId: string;
  user: OrderUser | null;
  items: OrderItem[];
  subtotalAmount?: number;
  deliveryCharge?: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
}

export interface CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: string;
  paymentMethod?: string;
}

export interface CreateOrderResponse {
  message: string;
  order: Order;
}

export interface OrdersResponse {
  message: string;
  orders: Order[];
}

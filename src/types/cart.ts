export interface CartItem {
  _id: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
  deliveryCharge: number;
  originalPrice: number;
  discountedPrice: number;
  totalPrice: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  totalAmount: number;
  updatedAt: Date;
}

export interface CartResponse {
  message: string;
  cart: Cart;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: string;
}

export interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}

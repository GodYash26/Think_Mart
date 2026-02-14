import { useGetCart, useRemoveFromCart, useUpdateCartItem } from "@/lib/api/cart";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2, Minus, Plus, Loader2 } from "lucide-react";

export function CartDropdown() {
  const { data: cartResponse, isLoading: isLoadingCart } = useGetCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: updateCartItem, isPending: isUpdating } = useUpdateCartItem();

  const cart = cartResponse?.cart;
  const isEmpty = !cart || cart.items.length === 0;

  const handleRemove = (productId: string) => {
    removeFromCart({ productId });
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove(productId);
      return;
    }
    updateCartItem({ productId, quantity: newQuantity });
  };

  if (isLoadingCart) {
    return (
      <div className="p-4 space-y-2">
        <h4 className="font-semibold text-sm">Shopping Cart</h4>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-md">
      <h4 className="font-semibold text-sm px-4 pt-4">Shopping Cart</h4>

      {isEmpty ? (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="px-4 space-y-3 max-h-96 overflow-y-auto">
            {cart!.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 p-2 border border-gray-200 rounded-lg"
              >
                {/* Product Image */}
                <div className="w-16 h-16 shrink-0 overflow-hidden rounded bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-medium text-gray-900 truncate">
                    {item.productName}
                  </h5>
                  <p className="text-xs text-gray-600 mt-1">
                    ${item.price ? item.price.toFixed(2) : '0.00'}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 mt-2">
                    <Button
                      onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                      disabled={isUpdating || isRemoving}
                      className="h-6 w-6 p-0 rounded flex items-center justify-center bg-gray-20 hover:bg-gray-300"
                      size="sm"
                    >
                      <Minus className="h-3 w-3 text-gray-600" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          handleQuantityChange(item._id, val);
                        }
                      }}
                      className="h-6 w-10 text-center text-xs p-0 border-gray-300"
                      disabled={isUpdating || isRemoving}
                    />
                    <Button
                      onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                      disabled={isUpdating || isRemoving}
                      className="h-6 w-6 p-0 rounded flex items-center justify-center  bg-gray-20 hover:bg-gray-300"
                      size="sm"
                    >
                      <Plus className="h-3 w-3 text-gray-600" />
                    </Button>
                  </div>

                  {/* Total Price */}
                  <p className="text-xs font-semibold text-gray-900 mt-2">
                    ${(item.totalPrice || item.price * (item.quantity || 1) || 0).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  onClick={() => handleRemove(item._id)}
                  disabled={isRemoving}
                  className="h-6 w-6 p-0 rounded text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center shrink-0"
                  variant="ghost"
                  size="sm"
                >
                  {isRemoving ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="px-4 py-3 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm font-semibold text-gray-900">
              <span>Total:</span>
              <span>${(cart!.totalAmount || 0).toFixed(2)}</span>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

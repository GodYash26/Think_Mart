import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/order";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    deliveryCharge?: number;
  };
  initialQuantity?: number;
}

export function OrderDialog({
  open,
  onOpenChange,
  product,
  initialQuantity = 1,
}: OrderDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [quantityInput, setQuantityInput] = useState(String(initialQuantity));
  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Update quantity when initialQuantity prop changes or dialog opens
  useEffect(() => {
    if (open) {
      setQuantity(initialQuantity);
      setQuantityInput(String(initialQuantity));
      setShippingAddress(user?.address || "");
      setPaymentMethod("Cash on Delivery");
    }
  }, [open, initialQuantity, user?.address]);

  const createOrderMutation = useMutation({
    mutationFn: orderApi.create,
    onSuccess: (data) => {
      toast.success(data.message || "Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onOpenChange(false);
      // Reset form
      setQuantity(1);
      setShippingAddress(user?.address || "");
      setPaymentMethod("Cash on Delivery");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to place order");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }

    createOrderMutation.mutate({
      items: [
        {
          productId: product.id,
          quantity,
        },
      ],
      shippingAddress,
      paymentMethod,
    });
  };

  // product.price is already the price after discount from the product card
  const subtotal = product.price * quantity;
  const deliveryCharge = product.deliveryCharge || 0;
  const totalAmount = subtotal + deliveryCharge;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
          <DialogDescription>
            Complete your order details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Summary */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex gap-3 mb-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  ${product.price.toFixed(2)} × {quantity}
                </p>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-2 border-t pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge:</span>
                <span className="font-medium">${deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-base">
                <span>Total Amount:</span>
                <span className="text-green-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantityInput}
              onChange={(e) => {
                const value = e.target.value;
                setQuantityInput(value);
                
                // Update quantity state if valid
                if (value !== '') {
                  const parsed = parseInt(value, 10);
                  if (!isNaN(parsed) && parsed >= 1) {
                    setQuantity(parsed);
                  }
                }
              }}
              onBlur={(e) => {
                // Ensure valid value on blur (when user clicks away)
                const value = e.target.value;
                if (value === '' || parseInt(value, 10) < 1 || isNaN(parseInt(value, 10))) {
                  setQuantity(1);
                  setQuantityInput('1');
                } else {
                  // Sync input with parsed value
                  const parsed = parseInt(value, 10);
                  setQuantity(parsed);
                  setQuantityInput(String(parsed));
                }
              }}
              required
            />
          </div>

          {/* Shipping Address */}
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Shipping Address *</Label>
            <Textarea
              id="shippingAddress"
              placeholder="Enter your complete shipping address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash on Delivery">Cash on Delivery (Available Now)</SelectItem>
                <SelectItem disabled value="Credit Card">Credit Card (Available Soon)</SelectItem>
                <SelectItem disabled value="Esewa">Esewa (Available Soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={createOrderMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={createOrderMutation.isPending}
            >
              {createOrderMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

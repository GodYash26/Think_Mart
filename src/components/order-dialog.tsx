import { useState } from "react";
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
  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

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
  const totalAmount = product.price * quantity;

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
            <div className="flex gap-3">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  ${product.price.toFixed(2)} × {quantity}
                </p>
                <p className="text-lg font-semibold text-green-600 mt-1">
                  Total: ${totalAmount.toFixed(2)}
                </p>
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
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                // Allow typing by not immediately rejecting partial inputs
                if (value === '') {
                  return; // Keep previous value while input is empty
                }
                const parsed = parseInt(value, 10);
                if (!isNaN(parsed) && parsed >= 1) {
                  setQuantity(parsed);
                }
              }}
              onBlur={(e) => {
                // Ensure valid value on blur
                const value = e.target.value;
                if (value === '' || parseInt(value, 10) < 1) {
                  setQuantity(1);
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
                <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
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

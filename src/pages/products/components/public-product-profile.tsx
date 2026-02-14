import { useState } from "react"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { OrderDialog } from "@/components/order-dialog"
import { useAuth } from "@/hooks/useAuth"
import { ShoppingBag, Minus, Plus, Star, User, ShoppingCart } from "lucide-react"
import { useAddToCart } from "@/lib/api/cart"
import { toast } from "sonner"

interface PublicProductProfileProps {
  product: Product
}

export function PublicProductProfile({ product }: PublicProductProfileProps) {
  const { user, openAuthSheet } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [quantityInput, setQuantityInput] = useState('1')
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()

  const formatValue = (value?: string | number | null) =>
    value === null || value === undefined || value === "" ? "-" : value

  const handleIncrement = () => {
    const newQty = quantity + 1
    setQuantity(newQty)
    setQuantityInput(String(newQty))
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1
      setQuantity(newQty)
      setQuantityInput(String(newQty))
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuantityInput(value)

    // Update quantity state if valid
    if (value !== '') {
      const parsed = parseInt(value, 10)
      if (!isNaN(parsed) && parsed >= 1) {
        setQuantity(parsed)
      }
    }
  }

  const handleQuantityBlur = () => {
    // Ensure valid value on blur
    if (quantityInput === '' || parseInt(quantityInput, 10) < 1 || isNaN(parseInt(quantityInput, 10))) {
      setQuantity(1)
      setQuantityInput('1')
    } else {
      const parsed = parseInt(quantityInput, 10)
      setQuantity(parsed)
      setQuantityInput(String(parsed))
    }
  }

  const handleOrderNow = () => {
    if (!user) {
      openAuthSheet("signin")
      return
    }
    setOrderDialogOpen(true)
  }

  const handleAddToCart = () => {
    if (!user) {
      openAuthSheet("signin")
      return
    }

    if (user.role !== "customer") {
      toast.error("Only customers can add items to cart")
      return
    }

    addToCart({
      productId: product._id,
      quantity,
    })
  }

  const priceAfterDiscount = product.priceAfterDiscount || (product.originalPrice - (product.discountedPrice || 0))

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="w-full rounded-xl bg-white p-6 border border-gray-200">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            {product.imageUrl || product.images ? (
              <img
                src={product.imageUrl ?? product.images}
                alt={product.productName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                No image available
              </div>
            )}
          </div>
        </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">{product.categoryName ?? "Category"}</p>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.productName}
              </h1>
              <p className="mt-3 text-gray-600">
                {product.description || "No description provided."}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">Original Price:</span>
                  <span className="text-sm text-gray-400 line-through font-medium">
                    ${formatValue(product.originalPrice)}
                  </span>
                </div>
                {product.discountedPrice && product.discountedPrice > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-500">Discount:</span>
                    <span className="text-sm text-red-600 font-medium">
                      -${product.discountedPrice.toFixed(2)}
                    </span>
                    {product.discountPercentage && product.discountPercentage > 0 && (
                      <span className="text-xs text-red-600">({product.discountPercentage}% off)</span>
                    )}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-700">Price After Discount:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${priceAfterDiscount.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.unit ? `/${product.unit}` : ""}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                Delivery: ${formatValue(product.deliveryCharge)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-white p-5 text-sm">
              <div>
                <div className="text-gray-500">Category</div>
                <div className="font-medium text-gray-900">
                  {product.categoryName ?? product.category}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Unit</div>
                <div className="font-medium text-gray-900">
                  {product.unit}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Stock</div>
                <div className="font-medium text-gray-900">
                  {formatValue(product.remainingStock ?? product.totalStock)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Status</div>
                <div className="font-medium text-gray-900">
                  {product.isActive === false ? "Inactive" : "Available"}
                </div>
              </div>
            </div>

            {/* Quantity and Order Button */}
        {user?.role !== "admin" && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <Button
                      onClick={handleDecrement}
                      className="h-10 w-10 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Input
                      value={quantityInput}
                      onChange={handleQuantityChange}
                      onBlur={handleQuantityBlur}
                      className="w-16 h-10 text-center text-base font-medium focus:outline-none shadow-none border-none"
                      min="1"
                      type="number"
                    />
                    <Button
                      onClick={handleIncrement}
                      className="h-10 w-10 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: ${(priceAfterDiscount * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleOrderNow}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {user ? 'Order Now' : 'Login to Order'}
                </Button>
              </div>
            </div>
          )}
          </div>
      </div>

      {/* Reviews and Comments Section */}
      <div className="mt-12 space-y-8">
        {/* Reviews Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

            {/* Average Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">4.5</div>
                <div className="flex items-center justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4.5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-1">Based on 24 reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{rating} ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{rating === 5 ? 17 : rating === 4 ? 5 : rating === 3 ? 1 : rating === 2 ? 1 : 0}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">
                      Excellent quality! The product arrived fresh and well-packaged. Highly recommend this seller.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="text-gray-700">
                      Good product overall. Could be slightly better packaged but the quality is great.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">
                      Amazing! This has become my go-to product. Fast delivery and excellent customer service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">David Williams</h4>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      Is this product available for bulk orders? I need at least 50 units for my restaurant.
                    </p>
                    <div className="mt-3 ml-6 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-green-600">Seller</span>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Yes, absolutely! Please contact us directly for bulk order pricing and availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">Jessica Martinez</h4>
                      <span className="text-sm text-gray-500">5 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      How long is the shelf life of this product?
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">Robert Brown</h4>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great product! Been using it for months now. Consistent quality every time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500 text-center">
                Sign in to leave a comment
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Dialog */}
      {user && (
        <OrderDialog
          open={orderDialogOpen}
          onOpenChange={setOrderDialogOpen}
          product={{
            id: product._id,
            name: product.productName,
            price: priceAfterDiscount,
            image: product.imageUrl ?? product.images,
            deliveryCharge: product.deliveryCharge,
          }}
          initialQuantity={quantity}
        />
      )}
    </>
  )
}

import type { Product } from "@/types/product"

interface ProductProfileProps {
  product: Product
}

export function ProductProfile({ product }: ProductProfileProps) {
  const formatValue = (value?: string | number | null) =>
    value === null || value === undefined || value === "" ? "-" : value

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleString() : "-"

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          {(product.imageUrl || product.images) && (
            <img
              src={product.imageUrl ?? product.images}
              alt={product.productName}
              className="h-20 w-20 rounded-md object-cover bg-muted"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{product.productName}</h2>
            <p className="text-muted-foreground">
              {product.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm text-muted-foreground">Category</div>
          <div className="font-medium">
            {product.categoryName ?? product.category}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Unit</div>
          <div className="font-medium">{product.unit}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Original Price</div>
          <div className="font-medium">{product.originalPrice}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Discounted Price</div>
          <div className="font-medium">
            {formatValue(product.discountedPrice)}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Discount %</div>
          <div className="font-medium">
            {formatValue(product.discountPercentage)}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Delivery Charge</div>
          <div className="font-medium">{formatValue(product.deliveryCharge)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Rating</div>
          <div className="font-medium">{formatValue(product.rating)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Total Stock</div>
          <div className="font-medium">{formatValue(product.totalStock)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Remaining Stock</div>
          <div className="font-medium">{formatValue(product.remainingStock)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Sold Quantity</div>
          <div className="font-medium">{formatValue(product.soldQuantity)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="font-medium">
            {product.isActive === false ? "Inactive" : "Active"}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Featured</div>
          <div className="font-medium">
            {product.isFeatured ? "Yes" : "No"}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Popular</div>
          <div className="font-medium">
            {product.isPopular ? "Yes" : "No"}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Offer</div>
          <div className="font-medium">
            {product.isOffer ? "Yes" : "No"}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Created At</div>
          <div className="font-medium">{formatDate(product.createdAt)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Updated At</div>
          <div className="font-medium">{formatDate(product.updatedAt)}</div>
        </div>
      </div>
    </div>
  )
}

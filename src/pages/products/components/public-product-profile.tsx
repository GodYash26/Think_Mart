import type { Product } from "@/types/product"

interface PublicProductProfileProps {
  product: Product
}

export function PublicProductProfile({ product }: PublicProductProfileProps) {
  const formatValue = (value?: string | number | null) =>
    value === null || value === undefined || value === "" ? "-" : value

  return (
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
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-gray-900">
              ${formatValue(product.discountedPrice ?? product.originalPrice)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${formatValue(product.originalPrice)}
            </span>
            <span className="text-sm text-gray-500">
              {product.unit ? `/${product.unit}` : ""}
            </span>
          </div>
          <div className="mt-2 text-sm text-green-600">
            {product.discountPercentage ? `${product.discountPercentage}% off` : ""}
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
      </div>
    </div>
  )
}

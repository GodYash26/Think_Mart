import { useMemo } from "react"
import { ProductCard } from "@/components/product_card"
import { useProducts } from "@/hooks/products/useProducts"
import type { ProductListParams } from "@/types/product"

interface FlaggedProductsSectionProps {
  title: string
  queryParams: ProductListParams
  limit?: number
  gridClassName?: string
  emptyMessage?: string
}

export function FlaggedProductsSection({
  title,
  queryParams,
  limit = 10,
  gridClassName =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6",
  emptyMessage = "No products found.",
}: FlaggedProductsSectionProps) {
  const params = useMemo(
    () => ({
      ...queryParams,
      page: 1,
      limit,
    }),
    [queryParams, limit]
  )

  const { data, isLoading } = useProducts(params)
  const products = data?.products ?? []

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {title}
        </h2>

        {isLoading ? (
          <div className={gridClassName}>
            {[...Array(limit)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse rounded-lg h-96"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 text-lg">{emptyMessage}</p>
            </div>
          </div>
        ) : (
          <div className={gridClassName}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.productName}
                image={product.imageUrl ?? product.images ?? ""}
                originalPrice={product.originalPrice}
                discountedPrice={product.discountedPrice ?? product.originalPrice}
                discountPercentage={product.discountPercentage || 0}
                deliveryCharge={product.deliveryCharge ?? 0}
                unit={product.unit}
                href={`/products/${product._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

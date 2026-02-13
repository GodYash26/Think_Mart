import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useProduct } from "@/hooks/products/useProduct"
import { PublicProductProfile } from "./components/public-product-profile"

export function ProductDetailsPage() {
  const { id } = useParams()
  const { data: product, isLoading } = useProduct(id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="w-fit">
            <Link to="/products">Back to products</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading || !product ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            Loading product...
          </div>
        ) : (
          <PublicProductProfile product={product} />
        )}
      </div>
    </div>
  )
}

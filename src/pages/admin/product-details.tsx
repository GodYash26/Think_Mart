import { useMemo } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ProductProfile } from "@/components/admin/products/product-profile"
import { ProductForm } from "@/components/admin/products/product-form"
import { useProduct } from "@/hooks/products/useProduct"
import type { CreateProductFormData } from "@/validations/product"

const cleanPayload = (values: CreateProductFormData) => {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== "" && value !== undefined)
  )
}

export function AdminProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateProduct: updateMutation, deleteProduct: deleteMutation, getProducts } = useProduct(id as string)
  const { data: product, isLoading } = getProducts

  const initialValues = useMemo(() => {
    if (!product) {
      return undefined
    }

    return {
      productName: product.productName,
      description: product.description,
      images: product.images,
      originalPrice: product.originalPrice,
      discountedPrice: product.discountedPrice,
      deliveryCharge: product.deliveryCharge,
      category: product.category,
      rating: product.rating,
      unit: product.unit,
      totalStock: product.totalStock,
      remainingStock: product.remainingStock,
      soldQuantity: product.soldQuantity,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isOffer: product.isOffer,
      isDeleted: product.isDeleted,
    }
  }, [product])

  const handleUpdate = (values: CreateProductFormData) => {
    const priceAfterDiscount = values.originalPrice - (values.discountedPrice || 0);
    updateMutation.mutate(cleanPayload({
      ...values,
      priceAfterDiscount,
    }))
  }

  const handleDelete = async () => {
    if (!id) {
      return
    }

    deleteMutation.mutate(id, {
      onSuccess: () => {
        navigate("/admin/products")
      },
    })
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-6 py-4 px-3 lg:px-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Button asChild variant="ghost" className="w-fit">
            <Link to="/admin/products">Back to products</Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete Product"}
        </Button>
      </div>

      {isLoading || !product ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading product...
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <ProductProfile product={product} />
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <ProductForm
              initialValues={initialValues}
              initialImageUrl={product.imageUrl}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
              submitLabel="Update Product"
            />
          </div>
        </div>
      )}
    </div>
  )
}

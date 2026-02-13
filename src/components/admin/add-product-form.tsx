
import { ProductForm } from "@/components/admin/products/product-form"
import { useCreateProduct } from "@/hooks/useCreateProduct"
import type { CreateProductFormData } from "@/validations/product"

export function AddProductForm() {
  const createProductMutation = useCreateProduct()
  const isLoading = createProductMutation.isPending

  async function onSubmit(values: CreateProductFormData) {
    createProductMutation.mutate(values)
  }

  return (
    <ProductForm
      onSubmit={onSubmit}
      isSubmitting={isLoading}
      submitLabel="Create Product"
    />
  )
}

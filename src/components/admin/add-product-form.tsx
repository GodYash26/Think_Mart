
import { ProductForm } from "@/components/admin/products/product-form"
import { useCreateProduct } from "@/hooks/useCreateProduct"
import type { CreateProductFormData } from "@/validations/product"

export function AddProductForm() {
  const createProductMutation = useCreateProduct()
  const isLoading = createProductMutation.isPending

  async function onSubmit(values: CreateProductFormData) {
    const priceAfterDiscount = values.originalPrice - (values.discountedPrice || 0);
    createProductMutation.mutate({
      ...values,
      priceAfterDiscount,
    })
  }

  return (
    <ProductForm
      onSubmit={onSubmit}
      isSubmitting={isLoading}
      submitLabel="Create Product"
    />
  )
}

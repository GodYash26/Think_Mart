import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { productAPI } from "@/lib/api/product"
import type { CreateProductInput } from "@/types/product"

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductInput) => productAPI.createProduct(data),
    onSuccess: (data) => {
      toast.success(data.message || "Product created successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to create product"
      toast.error(errorMessage)
    },
  })
}

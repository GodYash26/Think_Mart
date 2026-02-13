import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { productApi } from "@/lib/api/product"
import type { CreateProductInput } from "@/types/product"
import { useNavigate } from "react-router-dom"

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateProductInput) => productApi.create(data),
    onSuccess: () => {
      toast.success("Product created successfully")
      navigate("/admin/products")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create product")
    },
  })
}

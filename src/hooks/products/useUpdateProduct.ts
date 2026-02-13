import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { productApi } from "@/lib/api/product"
import type { UpdateProductInput } from "@/types/product"

export function useUpdateProduct(id?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProductInput) => productApi.update(id as string, data),
    onSuccess: () => {
      toast.success("Product updated successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", id] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product")
    },
  })
}

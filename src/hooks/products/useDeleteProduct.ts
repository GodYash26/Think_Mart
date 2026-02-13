import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { productApi } from "@/lib/api/product"

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productApi.remove(id),
    onSuccess: () => {
      toast.success("Product deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete product")
    },
  })
}

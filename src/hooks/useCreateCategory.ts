import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { categoryApi } from "@/lib/api/category"
import type { CreateCategoryInput } from "@/types/category"

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => categoryApi.create(data),
    onSuccess: () => {
      toast.success("Category created successfully")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Failed to create category"
      toast.error(errorMessage)
    },
  })
}

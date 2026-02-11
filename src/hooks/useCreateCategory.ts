import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { categoryAPI } from "@/lib/api/category"
import type { CreateCategoryInput } from "@/types/category"

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => categoryAPI.createCategory(data),
    onSuccess: (data) => {
      toast.success(data.message || "Category created successfully")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to create category"
      toast.error(errorMessage)
    },
  })
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { categoryApi } from "@/lib/api/category"
import { toast } from "sonner"
import type { CategoryFormData } from "@/validations/category"

export function useCreateCategory(onSuccess?: () => void) {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => 
      categoryApi.create({ category_name: data.category_name }),
    onSuccess: () => {
      toast.success("Category created successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      onSuccess?.()
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create category")
    },
  })

  return createMutation
}

export function useUpdateCategory(categoryId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (data: CategoryFormData) =>
      categoryApi.update(categoryId, { category_name: data.category_name }),
    onSuccess: () => {
      toast.success("Category updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] })
      onSuccess?.()
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update category")
    },
  })

  return updateMutation
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: () => {
      toast.success("Category deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete category")
    },
  })

  return deleteMutation
}

export function useGetCategory(categoryId?: string) {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => categoryApi.getById(categoryId!),
    enabled: !!categoryId,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
    staleTime: 3 * 60 * 1000,
  })
}
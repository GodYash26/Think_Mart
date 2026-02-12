
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { categorySchema, type CategoryFormData } from "@/validations/category"
import { categoryApi } from "@/lib/api/category"

interface AddCategoryFormProps {
  categoryId?: string
  initialData?: {
    category_name: string
  }
  onSuccess?: () => void
}

export function AddCategoryForm({ categoryId, initialData, onSuccess }: AddCategoryFormProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: initialData?.category_name || "",
    },
  })

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => 
      categoryApi.create({ category_name: data.category_name }),
    onSuccess: () => {
      toast.success("Category created successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      form.reset()
      onSuccess?.()
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create category")
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: CategoryFormData) =>
      categoryApi.update(categoryId!, { category_name: data.category_name }),
    onSuccess: () => {
      toast.success("Category updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      onSuccess?.()
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update category")
    },
  })

  const isLoading = createMutation.isPending || updateMutation.isPending
  const isEditing = !!categoryId

  async function onSubmit(values: CategoryFormData) {
    if (isEditing) {
      updateMutation.mutate(values)
    } else {
      createMutation.mutate(values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Category Name Field */}
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                Category name must be between 2 and 100 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? isEditing
              ? "Updating Category..."
              : "Creating Category..."
            : isEditing
            ? "Update Category"
            : "Create Category"}
        </Button>
      </form>
    </Form>
  )
}

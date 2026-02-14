
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useCreateCategory, useUpdateCategory, useGetCategory } from "@/hooks/categories/useCategories"
import { useEffect } from "react"

interface AddCategoryFormProps {
  categoryId?: string
  onSuccess?: () => void
}

export function AddCategoryForm({ categoryId, onSuccess }: AddCategoryFormProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
    },
  })

  const isEditing = !!categoryId
  const { data: categoryData, isLoading: isFetching } = useGetCategory(categoryId)
  const createMutation = useCreateCategory(() => {
    form.reset()
    onSuccess?.()
  })
  const updateMutation = useUpdateCategory(categoryId || "", onSuccess)

  const isLoading = createMutation.isPending || updateMutation.isPending || isFetching

  // Prefill form when editing
  useEffect(() => {
    if (isEditing && categoryData) {
      form.reset({
        category_name: categoryData.category_name || "",
      })
    }
  }, [categoryData, isEditing, form])

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

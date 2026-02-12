import { useState } from "react"
import { AddCategoryForm } from "@/components/admin/add-category"
import { CategoryTable } from "@/components/admin/category-table"
import type { Category } from "@/types/category"

export const AddCategoryPage = () => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFormSuccess = () => {
    setEditingCategory(null)
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-6 py-4 px-3 lg:px-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {editingCategory ? "Update Category" : "Add New Category"}
        </h1>
        <p className="text-muted-foreground">
          {editingCategory
            ? "Update the category details below"
            : "Create a new product category by filling out the form below"}
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <AddCategoryForm
            categoryId={editingCategory?.id}
            initialData={
              editingCategory
                ? { category_name: editingCategory.category_name }
                : undefined
            }
            onSuccess={handleFormSuccess}
          />
          {editingCategory && (
            <button
              onClick={() => setEditingCategory(null)}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground underline"
            >
              ← Back to Create New
            </button>
          )}
        </div>
      </div>

      {/* Categories Table Section */}
      <div className="mt-8">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">All Categories</h2>
          <p className="text-muted-foreground">Manage your product categories</p>
        </div>
        <CategoryTable onEdit={handleEdit} />
      </div>
    </div>
  )
}

import { AddCategoryForm } from "@/components/admin/add-category"

export const AddCategoryPage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-6 py-4 px-3 lg:px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Category</h1>
        <p className="text-muted-foreground">
          Create a new product category by filling out the form below
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <AddCategoryForm />
        </div>
      </div>
    </div>
  )
}

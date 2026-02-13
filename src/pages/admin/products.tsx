import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductsTable } from "@/components/admin/products/products-table"
import { useProducts } from "@/hooks/products/useProducts"
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct"
import { useCategories } from "@/hooks/categories/useCategories"
import { productApi } from "@/lib/api/product"
import type { UpdateProductInput } from "@/types/product"

export function AdminProductsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const queryParams = useMemo(
    () => ({
      search: search.trim() ? search.trim() : undefined,
      category: category === "all" ? undefined : category,
      page,
      limit,
    }),
    [search, category, page, limit]
  )

  const { data, isLoading } = useProducts(queryParams)
  const { data: categories = [] } = useCategories()
  const deleteMutation = useDeleteProduct()
  const queryClient = useQueryClient()

  const statusMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) =>
      productApi.update(id, data),
    onSuccess: () => {
      toast.success("Product status updated")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product status")
    },
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  useEffect(() => {
    setPage(1)
  }, [search, category, limit])

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleStatusChange = (id: string, data: UpdateProductInput) => {
    statusMutation.mutate({ id, data })
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-6 py-4 px-3 lg:px-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/add-product">Add Product</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
            className="w-full max-w-sm"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full max-w-55">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(limit)}
            onValueChange={(value) => setLimit(Number(value))}
          >
            <SelectTrigger className="w-full max-w-40">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            Loading products...
          </div>
        ) : (
          <ProductsTable
            products={products}
            onDelete={handleDelete}
            isDeletingId={deleteMutation.variables ?? null}
            isUpdatingId={statusMutation.variables?.id ?? null}
            onStatusChange={handleStatusChange}
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

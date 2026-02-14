import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query"
import { productApi } from "@/lib/api/product"
import { toast } from "sonner"
import type { CreateProductInput, UpdateProductInput, ProductListResponse, ProductListParams } from "@/types/product"
import { useNavigate } from "react-router-dom"


export function useProduct(id?: string | undefined, queryParams?: ProductListParams) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const getProducts = useQuery<ProductListResponse>({
    queryKey: ["product", id, queryParams],
    queryFn: async () => {
      if (id) {
        return await productApi.getById(id)
      }
      return await productApi.list(queryParams)
    },
    enabled: Boolean(id) || Boolean(queryParams),
  } as any)

  const createProduct = useMutation({
    mutationFn: (data: CreateProductInput) => productApi.create(data),
    onSuccess: () => {
      toast.success("Product created successfully")
      navigate("/admin/products")
      queryClient.invalidateQueries({ queryKey: ["product"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create product")
    },
  })

  const updateProduct = useMutation({
    mutationFn: (data: UpdateProductInput) => productApi.update(id as string, data),
    onSuccess: () => {
      toast.success("Product updated successfully")
      queryClient.invalidateQueries({ queryKey: ["product"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product")
    },
  })

  const deleteProduct = useMutation({
    mutationFn: (id: string) => productApi.remove(id),
    onSuccess: () => {
      toast.success("Product deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["product"] })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete product")
    },
  })

  return {
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct,
  }
}

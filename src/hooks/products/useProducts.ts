import { useQuery } from "@tanstack/react-query"
import { productApi } from "@/lib/api/product"
import type { ProductListParams } from "@/types/product"

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.list(params),
  })
}

import { useQuery } from "@tanstack/react-query"
import { productApi } from "@/lib/api/product"
import type { ProductListParams } from "@/types/product"

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.list(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

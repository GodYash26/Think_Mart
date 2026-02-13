import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "@/lib/api/category"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
    staleTime: 3 * 60 * 1000,
  })
}

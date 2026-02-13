import apiClient from "@/lib/axios"
import type {
  CreateProductInput,
  Product,
  ProductListParams,
  ProductListResponse,
  UpdateProductInput,
} from "@/types/product"

const buildQuery = (params?: ProductListParams) => {
  if (!params) {
    return undefined
  }

  const query: Record<string, string | number | boolean> = {}

  if (params.category) {
    query.category = params.category
  }

  if (params.search) {
    query.search = params.search
  }

  if (params.minPrice !== undefined) {
    query.minPrice = params.minPrice
  }

  if (params.maxPrice !== undefined) {
    query.maxPrice = params.maxPrice
  }

  if (params.isFeatured !== undefined) {
    query.isFeatured = params.isFeatured
  }

  if (params.isPopular !== undefined) {
    query.isPopular = params.isPopular
  }

  if (params.isOffer !== undefined) {
    query.isOffer = params.isOffer
  }

  if (params.page !== undefined) {
    query.page = params.page
  }

  if (params.limit !== undefined) {
    query.limit = params.limit
  }

  return query
}

export const productApi = {
  async create(data: CreateProductInput): Promise<Product> {
    const response = await apiClient.post("/products", data)
    return response.data?.product ?? response.data
  },

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`)
    return response.data?.product ?? response.data
  },

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const response = await apiClient.patch(`/products/${id}`, data)
    return response.data?.product ?? response.data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`)
  },

  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const response = await apiClient.get("/products", {
      params: buildQuery(params),
    })
    if (response.data?.products) {
      return response.data
    }

    return {
      products: response.data ?? [],
      total: response.data?.length ?? 0,
      page: params?.page ?? 1,
      limit: params?.limit ?? (response.data?.length ?? 0),
    }
  },
}

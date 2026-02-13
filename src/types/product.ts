export interface Product {
  _id: string
  productName: string
  description?: string
  images?: string
  imageUrl?: string
  originalPrice: number
  discountedPrice?: number
  discountPercentage?: number
  deliveryCharge?: number
  category: string
  categoryName?: string
  rating?: number
  unit: string
  totalStock?: number
  remainingStock?: number
  soldQuantity?: number
  isActive?: boolean
  isFeatured?: boolean
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductInput {
  productName: string
  description?: string
  images?: string
  originalPrice: number
  discountedPrice?: number
  deliveryCharge?: number
  category: string
  rating?: number
  unit: string
  totalStock?: number
  remainingStock?: number
  soldQuantity?: number
  isActive?: boolean
  isFeatured?: boolean
  isDeleted?: boolean
}

export type UpdateProductInput = Partial<CreateProductInput>

export interface ProductListParams {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

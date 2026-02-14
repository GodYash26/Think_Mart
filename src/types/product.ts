export interface Product {
  _id?: string
  productName: string
  description?: string
  images?: string
  imageUrl?: string
  originalPrice: number
  discountedPrice?: number
  priceAfterDiscount?: number
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
  isPopular?: boolean
  isOffer?: boolean
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductInput {
  _id?: string
  productName: string
  description?: string
  images?: string
  originalPrice: number
  discountedPrice?: number
  priceAfterDiscount?: number
  deliveryCharge?: number
  category: string
  rating?: number
  unit: string
  totalStock?: number
  remainingStock?: number
  soldQuantity?: number
  isActive?: boolean
  isFeatured?: boolean
  isOffer?: boolean
  isDeleted?: boolean
}

export type UpdateProductInput = Partial<CreateProductInput>

export interface ProductListParams {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  isFeatured?: boolean
  isPopular?: boolean
  isOffer?: boolean
  page?: number
  limit?: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

export interface Product {
  id: string
  name: string
  price: number
  discountedPrice: number
  description: string
  category: string
  rating: number
  image: string
  stock: number
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductInput {
  name: string
  price: number
  discountedPrice: number
  description: string
  category: string
  rating: number
  image: string
  stock: number
}

export interface ProductResponse {
  success: boolean
  message: string
  data?: Product
  error?: string
}

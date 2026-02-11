export interface Category {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCategoryInput {
  name: string

}

export interface CategoryResponse {
  success: boolean
  message: string
  data?: Category
  error?: string
}

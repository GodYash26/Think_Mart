export interface Category {
  id: string
  category_name: string
}

export interface CreateCategoryInput {
  category_name: string
}

export interface UpdateCategoryInput {
  category_name: string
}

export interface CategoryResponse {
  success: boolean
  message: string
  data?: Category
  error?: string
}

export interface CategoriesListResponse {
  data: Category[]
  count: number
}

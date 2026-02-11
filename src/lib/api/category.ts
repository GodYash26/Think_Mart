import axios from "axios"
import type { AxiosInstance } from "axios"
import type { CategoryResponse, CreateCategoryInput } from "@/types/category"

const API_BASE_URL = "http://localhost:3000/api" // Update this to your backend URL

class CategoryAPI {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  async createCategory(data: CreateCategoryInput): Promise<CategoryResponse> {
    const response = await this.api.post("/categories", data)
    return response.data
  }

  async getCategory(id: string): Promise<CategoryResponse> {
    const response = await this.api.get(`/categories/${id}`)
    return response.data
  }

  async updateCategory(
    id: string,
    data: CreateCategoryInput
  ): Promise<CategoryResponse> {
    const response = await this.api.put(`/categories/${id}`, data)
    return response.data
  }

  async getCategories(): Promise<CategoryResponse> {
    const response = await this.api.get("/categories")
    return response.data
  }
}

export const categoryAPI = new CategoryAPI()

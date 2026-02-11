import axios from "axios"
import type { AxiosInstance } from "axios"
import type { ProductResponse, CreateProductInput } from "@/types/product"

const API_BASE_URL = "http://localhost:3000/api" // Update this to your backend URL

class ProductAPI {
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

  async createProduct(data: CreateProductInput): Promise<ProductResponse> {
    const response = await this.api.post("/products", data)
    return response.data
  }

  async getProduct(id: string): Promise<ProductResponse> {
    const response = await this.api.get(`/products/${id}`)
    return response.data
  }

  async updateProduct(
    id: string,
    data: CreateProductInput
  ): Promise<ProductResponse> {
    const response = await this.api.put(`/products/${id}`, data)
    return response.data
  }

  async getProducts(): Promise<ProductResponse> {
    const response = await this.api.get("/products")
    return response.data
  }
}

export const productAPI = new ProductAPI()

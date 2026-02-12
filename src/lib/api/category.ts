import apiClient from "../axios";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

export const categoryApi = {
  // Create new category
  create: async (data: CreateCategoryInput): Promise<Category> => {
    const response = await apiClient.post<any>("/categories", data);
    const cat = response.data;
    return {
      id: cat._id || cat.id,
      category_name: cat.category_name,
    };
  },

  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<any>("/categories");
    const categories = Array.isArray(response.data) ? response.data : response.data.data || [];
    return categories.map((cat: any) => ({
      id: cat._id || cat.id,
      category_name: cat.category_name,
    }));
  },

  // Get single category
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<any>(`/categories/${id}`);
    const cat = response.data;
    return {
      id: cat._id || cat.id,
      category_name: cat.category_name,
    };
  },

  // Update category
  update: async (id: string, data: UpdateCategoryInput): Promise<Category> => {
    const response = await apiClient.patch<any>(`/categories/${id}`, data);
    const cat = response.data;
    return {
      id: cat._id || cat.id,
      category_name: cat.category_name,
    };
  },

  // Delete category
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/categories/${id}`);
    return response.data;
  },
};

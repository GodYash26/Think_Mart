import { z } from "zod"

export const createProductSchema = z.object({
    name: z
        .string()
        .min(1, "Product name is required")
        .min(3, "Product name must be at least 3 characters")
        .max(100, "Product name must not exceed 100 characters"),
    price: z
        .number()
        .min(0, "Price must be greater than or equal to 0")
        .positive("Price must be a positive number"),
    discountedPrice: z
        .number()
        .min(0, "Discounted price must be greater than or equal to 0"),
    description: z
        .string()
        .min(1, "Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must not exceed 1000 characters"),
    category: z
        .string()
        .min(1, "Category is required")
        .min(2, "Category must be at least 2 characters"),
    rating: z
        .number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating must not exceed 5"),
    stock: z
        .number()
        .int("Stock must be a whole number")
        .min(0, "Stock must be 0 or greater"),
    image: z
        .string()
        .min(1, "Image URL is required")
        .url("Please enter a valid image URL"),
})

export type CreateProductFormData = z.infer<typeof createProductSchema>

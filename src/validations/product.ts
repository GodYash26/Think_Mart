import { z } from "zod"

const numberFromInput = (value: unknown) =>
    value === "" || value === null || value === undefined ? undefined : Number(value)

const optionalNumber = (min: number, message: string) =>
    z.preprocess(numberFromInput, z.number().min(min, message).optional())

const optionalInt = (min: number, message: string) =>
    z.preprocess(
        numberFromInput,
        z.number().int("Value must be a whole number").min(min, message).optional()
    )

const optionalString = (schema: z.ZodString) =>
    z.preprocess(
        (value) => (value === "" || value === null || value === undefined ? undefined : value),
        schema.optional()
    )

export const createProductSchema = z.object({
    productName: z
        .string()
        .min(1, "Product name is required")
        .max(120, "Product name must not exceed 120 characters"),
    description: optionalString(
        z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(1000, "Description must not exceed 1000 characters")
    ),
    images: optionalString(z.string()),
    originalPrice: z.coerce
        .number()
        .min(0, "Original price must be 0 or greater"),
    discountedPrice: optionalNumber(
        0,
        "Discounted price must be 0 or greater"
    ),
    deliveryCharge: optionalNumber(0, "Delivery charge must be 0 or greater"),
    category: z.string().min(1, "Category is required"),
    unit: z.string().min(1, "Unit is required"),
    totalStock: optionalInt(1, "Stock must be 1 or greater"),
    isActive: z.boolean().optional(),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductFormValues = {
    productName: string
    description?: string
    images?: string
    originalPrice: number | string
    discountedPrice?: number | string
    deliveryCharge?: number | string
    category: string
    unit: string
    totalStock?: number | string
    isActive?: boolean
}

export type CreateProductFormData = z.infer<typeof createProductSchema>
export type UpdateProductFormData = z.infer<typeof updateProductSchema>

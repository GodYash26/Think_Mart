import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  createProductSchema,
  type CreateProductFormData,
  type CreateProductFormValues,
} from "@/validations/product"
import { useCategories } from "@/hooks/categories/useCategories"
import { MediaUploadField } from "@/components/admin/media/media-upload-field"

const UNIT_OPTIONS = ["kg", "gram", "ml", "ltr"]

interface ProductFormProps {
  initialValues?: Partial<CreateProductFormValues>
  initialImageUrl?: string
  onSubmit: SubmitHandler<CreateProductFormData>
  submitLabel?: string
  isSubmitting?: boolean
}

export function ProductForm({
  initialValues,
  initialImageUrl,
  onSubmit,
  submitLabel = "Save Product",
  isSubmitting = false,
}: ProductFormProps) {
  const form = useForm<CreateProductFormValues, any, CreateProductFormData>({
    resolver: zodResolver(createProductSchema) as Resolver<
      CreateProductFormValues,
      any,
      CreateProductFormData
    >,
    defaultValues: {
      productName: "",
      description: "",
      images: "",
      originalPrice: 0,
      discountedPrice: undefined,
      deliveryCharge: undefined,
      category: "",
      unit: "",
      totalStock: undefined,
      isActive: true,
      ...initialValues,
    },
  })

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <MediaUploadField
                value={field.value}
                initialUrl={initialImageUrl}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Price</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discounted Price</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryCharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Charge</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isCategoriesLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isCategoriesLoading
                            ? "Loading categories..."
                            : "Select category"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UNIT_OPTIONS.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="totalStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Stock</FormLabel>
              <FormControl>
                <Input type="number" min={1} step="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </form>
    </Form>
  )
}
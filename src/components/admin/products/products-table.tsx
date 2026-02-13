import { Link } from "react-router-dom"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ProductsTableProps {
  products: Product[]
  isDeletingId?: string | null
  isUpdatingId?: string | null
  onDelete: (id: string) => void
  onStatusChange: (
    id: string,
    updates: Partial<Pick<Product, "isFeatured" | "isPopular" | "isOffer">>
  ) => void
}

export function ProductsTable({
  products,
  isDeletingId,
  isUpdatingId,
  onDelete,
  onStatusChange,
}: ProductsTableProps) {
  const formatStock = (value?: number) =>
    value === null || value === undefined ? "N/A" : value

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Original Price</TableHead>
            <TableHead>Discount Price</TableHead>
            <TableHead>Delivery Charge</TableHead>
            <TableHead>Total Stock</TableHead>
            <TableHead>Remaining Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead>Offer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {product.imageUrl || product.images ? (
                      <img
                        src={product.imageUrl ?? product.images}
                        alt={product.productName}
                        className="h-10 w-10 rounded object-cover bg-muted"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted text-[10px] text-muted-foreground flex items-center justify-center">
                        No image
                      </div>
                    )}
                    <span className="font-medium">{product.productName}</span>
                  </div>
                </TableCell>
                <TableCell>{product.categoryName ?? product.category}</TableCell>
                <TableCell>{product.originalPrice}</TableCell>
                <TableCell>{product.discountedPrice ?? "-"}</TableCell>
                <TableCell>{product.deliveryCharge ?? "-"}</TableCell>
                <TableCell>{formatStock(product.totalStock)}</TableCell>
                <TableCell>{formatStock(product.remainingStock)}</TableCell>
                <TableCell>
                  {product.isActive === false ? "Inactive" : "Active"}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={product.isFeatured ?? false}
                    disabled={isUpdatingId === product._id}
                    onChange={(event) =>
                      onStatusChange(product._id, {
                        isFeatured: event.target.checked,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={product.isPopular ?? false}
                    disabled={isUpdatingId === product._id}
                    onChange={(event) =>
                      onStatusChange(product._id, {
                        isPopular: event.target.checked,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={product.isOffer ?? false}
                    disabled={isUpdatingId === product._id}
                    onChange={(event) =>
                      onStatusChange(product._id, {
                        isOffer: event.target.checked,
                      })
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/admin/products/${product._id}`}>View</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isDeletingId === product._id}
                      onClick={() => onDelete(product._id)}
                    >
                      {isDeletingId === product._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

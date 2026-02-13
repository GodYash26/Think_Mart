import { ProductCard } from '@/components/product_card';
import type { Product } from '@/types/product';

interface ProductsGridProps {
    products: Product[];
    onAddToCart?: (productId: string, quantity: number) => void;
    onToggleFavorite?: (productId: string, isFavorite: boolean) => void;
    isLoading?: boolean;
    emptyMessage?: string;
}

export function ProductsGrid({
    products,
    onAddToCart,
    onToggleFavorite,
    isLoading = false,
    emptyMessage = "No products found. Try adjusting your filters.",
}: ProductsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96" />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-gray-500 text-lg">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard
                    key={product._id}
                    _id={product._id}
                    name={product.productName}
                    image={product.imageUrl ?? product.images ?? ""}
                    originalPrice={product.originalPrice}
                    discountedPrice={product.discountedPrice ?? product.originalPrice}
                    discountPercentage={product.discountPercentage || 0}
                    deliveryCharge={product.deliveryCharge ?? 0}
                    unit={product.unit}
                    href={`/products/${product._id}`}
                    onAddToCart={(quantity) => onAddToCart?.(product._id, quantity)}
                    onToggleFavorite={(isFavorite) => onToggleFavorite?.(product._id, isFavorite)}
                />
            ))}
        </div>
    );
}

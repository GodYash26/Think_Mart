import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface ProductCardProps {
    name: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage?: number;
    deliveryCharge: number;
    unit?: string;
    href?: string;
    onAddToCart?: (quantity: number) => void;
    onToggleFavorite?: (isFavorite: boolean) => void;
}

export function ProductCard({
    name,
    image,
    originalPrice,
    discountedPrice,
    discountPercentage,
    deliveryCharge,
    unit = "/kg",
    href,
    onAddToCart,
    onToggleFavorite,
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        onAddToCart?.(quantity);
    };

    const handleToggleFavorite = () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        onToggleFavorite?.(newFavoriteState);
    };

    return (
        <Card className="relative overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-300 group">
            {/* Discount Badge */}
            {discountPercentage !== undefined && discountPercentage > 0 && (
                <Badge
                    className="absolute top-3 left-3 z-10 bg-green-600 hover:bg-green-600 text-white font-medium px-2.5 py-1 text-xs"
                >
                    {discountPercentage}% Off
                </Badge>
            )}

            {/* Favorite Button */}
            <Button
                onClick={handleToggleFavorite}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border border-orange-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Add to favorites"
            >
                <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-green-600 text-green-600" : "text-gray-600"
                        } transition-colors`}
                />
            </Button>

            <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative flex items-center justify-center h-36 pt-2">
                    {href ? (
                        <Link to={href} className="block w-full h-full">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                    ) : (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    )}
                </div>

                {/* Product Details */}
                <div className="px-4 py-2">
                    {href ? (
                        <Link to={href} className="block">
                            <h3 className="text-base font-normal text-gray-900 mb-2">{name}</h3>
                        </Link>
                    ) : (
                        <h3 className="text-base font-normal text-gray-900 mb-2">{name}</h3>
                    )}

                    {/* Price Section */}
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">{unit}</span>
                    </div>

                    {/* Delivery Charge */}
                    <p className="text-xs text-gray-500 mb-4">
                        Delivery: ${deliveryCharge.toFixed(2)}
                    </p>

                    {/* Quantity Controls and Add to Cart */}
                    <div className="flex items-center justify-between gap-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                            <Button
                                onClick={handleDecrement}
                                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-3.5 h-3.5 text-gray-600" />
                            </Button>
                            <Input
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-10 h-8 text-center text-sm font-medium focus:outline-none shadow-none border-none"
                                min="1"
                            />
                            <Button
                                onClick={handleIncrement}
                                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-3.5 h-3.5 text-gray-600" />
                            </Button>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleAddToCart}
                            className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors"
                            aria-label="Add to cart"
                        >
                            <ShoppingCart className="w-4.5 h-4.5 text-white" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
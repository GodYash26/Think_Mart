import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { OrderDialog } from "./order-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useAddToCart } from "@/lib/api/cart";
import { toast } from "sonner";

export interface ProductCardProps {
    _id?: string;
    name: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage?: number;
    deliveryCharge: number;
    unit?: string;
    href?: string;
    onToggleFavorite?: (isFavorite: boolean) => void;
}

export function ProductCard({
    _id,
    name,
    image,
    originalPrice,
    discountedPrice,
    discountPercentage,
    deliveryCharge,
    unit = "/kg",
    href,
    onToggleFavorite,
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);
    const [quantityInput, setQuantityInput] = useState('1');
    const [isFavorite, setIsFavorite] = useState(false);
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const { user, openAuthSheet } = useAuth();
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        setQuantityInput(String(newQty));
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            setQuantityInput(String(newQty));
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuantityInput(value);
        
        // Update quantity state if valid
        if (value !== '') {
            const parsed = parseInt(value, 10);
            if (!isNaN(parsed) && parsed >= 1) {
                setQuantity(parsed);
            }
        }
    };

    const handleQuantityBlur = () => {
        // Ensure valid value on blur
        if (quantityInput === '' || parseInt(quantityInput, 10) < 1 || isNaN(parseInt(quantityInput, 10))) {
            setQuantity(1);
            setQuantityInput('1');
        } else {
            const parsed = parseInt(quantityInput, 10);
            setQuantity(parsed);
            setQuantityInput(String(parsed));
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            openAuthSheet("signin");
            return;
        }

        if (user.role !== "customer") {
            toast.error("Only customers can add items to cart");
            return;
        }

        if (!_id) {
            toast.error("Product not found");
            return;
        }

        addToCart({
            productId: _id,
            quantity,
        });
    };

    const handleToggleFavorite = () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        onToggleFavorite?.(newFavoriteState);
    };

    const handleOrderNow = () => {
        if (!user) {
            openAuthSheet("signin");
            return;
        }
        setOrderDialogOpen(true);
    };

    return (
        <>
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
                        <div className=" flex gap-2 mb-3">
                            <div className=" mb-1">
                                <span className="text-sm text-gray-400 line-through font-medium">
                                    ${originalPrice.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-lg font-bold text-green-600">
                                    ${(originalPrice - (discountedPrice || 0)).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">{unit}</span>
                            </div>
                        </div>

                        {/* Delivery Charge */}
                        <p className="text-xs text-gray-500 mb-3">
                            Delivery: ${deliveryCharge.toFixed(2)}
                        </p>

                        {/* Quantity Controls and Add to Cart */}
                        <div className="space-y-2">
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
                                        value={quantityInput}
                                        onChange={handleQuantityChange}
                                        onBlur={handleQuantityBlur}
                                        className="w-12 h-8 text-center text-sm font-medium focus:outline-none shadow-none border-none"
                                        min="1"
                                        type="number"
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
                                    disabled={isAddingToCart}
                                    className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors disabled:opacity-50"
                                    aria-label="Add to cart"
                                >
                                    {isAddingToCart ? (
                                        <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <ShoppingCart className="w-4.5 h-4.5 text-white" />
                                    )}
                                </Button>
                            </div>

                            {/* Order Now Button */}
                            {_id && (
                                <Button
                                    onClick={handleOrderNow}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    {user ? 'Order Now' : 'Login to Order'}
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Order Dialog */}
            {_id && user && (
                <OrderDialog
                    open={orderDialogOpen}
                    onOpenChange={setOrderDialogOpen}
                    product={{
                        id: _id,
                        name,
                        price: originalPrice - (discountedPrice || 0),
                        image,
                        deliveryCharge,
                    }}
                    initialQuantity={quantity}
                />
            )}
        </>
    );
}
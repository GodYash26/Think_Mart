import { ProductCard } from "../../components/product_card";
import Image1 from "@/assets/p1.png";  
import Image2 from "@/assets/p2.png";

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    image: Image1,
    originalPrice: 4.99,
    discountedPrice: 3.49,
    discountPercentage: 8,
    deliveryCharge: 2.0,
    unit: "/kg",
  },
  {
    id: 2,
    name: "Potatoes",
    image: Image2,
    originalPrice: 4.99,
    discountedPrice: 3.49,
    discountPercentage: 8,
    deliveryCharge: 2.0,
    unit: "/kg",
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    image: Image1,
    originalPrice: 4.99,
    discountedPrice: 3.49,
    discountPercentage: 8,
    deliveryCharge: 2.0,
    unit: "/kg",
  },
  {
    id: 4,
    name: "Fresh Tomatoes",
    image: Image2,
    originalPrice: 4.99,
    discountedPrice: 3.49,
    discountPercentage: 8,
    deliveryCharge: 2.0,
    unit: "/kg",
  },
  {
    id: 5,
    name: "Fresh Tomatoes",
    image: Image1,
    originalPrice: 4.99,
    discountedPrice: 3.49,
    discountPercentage: 8,
    deliveryCharge: 2.0,
    unit: "/kg",
  },
];

export const OfferProducts = () => {
  const handleAddToCart = (productId: number, quantity: number) => {
    console.log(`Added ${quantity} of product ${productId} to cart`);
  };

  const handleToggleFavorite = (productId: number, isFavorite: boolean) => {
    console.log(`Product ${productId} favorite status: ${isFavorite}`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Offer Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              discountPercentage={product.discountPercentage}
              deliveryCharge={product.deliveryCharge}
              unit={product.unit}
              onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
              onToggleFavorite={(isFavorite) => handleToggleFavorite(product.id, isFavorite)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
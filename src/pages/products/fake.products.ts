
import Image1 from "@/assets/p1.png";  
import Image2 from "@/assets/p2.png";
import Image3 from "@/assets/p3.png";

export interface Product {
    id: string;
    name: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage?: number;
    deliveryCharge: number;
    category: string;
    rating: number;
    unit?: string;
}

export const fakeProducts: Product[] = [
    {
        id: "1",
        name: "Fresh Tomatoes",
        image: Image1,
        originalPrice: 4.99,
        discountedPrice: 3.49,
        deliveryCharge: 2.00,
        category: "Vegetables",
        rating: 4.5,
        unit: "/kg",
    },
    {
        id: "2",
        name: "Potatoes",
        image: Image2,
        originalPrice: 3.99,
        discountedPrice: 2.49,
        deliveryCharge: 1.50,
        category: "Vegetables",
        rating: 4.2,
        unit: "/kg",
    },
    {
        id: "3",
        name: "Radish",
        image: Image3,
        originalPrice: 2.99,
        discountedPrice: 1.99,
        discountPercentage: 33,
        deliveryCharge: 1.00,
        category: "Vegetables",
        rating: 3.8,
        unit: "/kg",
    },
    {
        id: "4",
        name: "Apple",
        image: Image1,
        originalPrice: 5.99,
        discountedPrice: 4.49,
        discountPercentage: 25,
        deliveryCharge: 2.00,
        category: "Fruits",
        rating: 4.7,
        unit: "/kg",
    },
    {
        id: "5",
        name: "Banana",
        image: Image2,
        originalPrice: 2.49,
        discountedPrice: 1.99,
        discountPercentage: 20,
        deliveryCharge: 1.00,
        category: "Fruits",
        rating: 4.4,
        unit: "/kg",
    },
    {
        id: "6",
        name: "Orange",
        image: Image3,
        originalPrice: 4.99,
        discountedPrice: 3.99,
        discountPercentage: 20,
        deliveryCharge: 1.50,
        category: "Fruits",
        rating: 4.3,
        unit: "/kg",
    },
    {
        id: "7",
        name: "Broccoli",
        image: Image1,
        originalPrice: 5.49,
        discountedPrice: 3.99,
        discountPercentage: 27,
        deliveryCharge: 2.00,
        category: "Vegetables",
        rating: 4.6,
        unit: "/kg",
    },
    {
        id: "8",
        name: "Carrot",
        image: Image2,
        originalPrice: 3.49,
        discountedPrice: 2.49,
        discountPercentage: 28,
        deliveryCharge: 1.50,
        category: "Vegetables",
        rating: 4.4,
        unit: "/kg",
    },
    {
        id: "9",
        name: "Spinach",
        image: Image3,
        originalPrice: 4.99,
        discountedPrice: 3.49,
        discountPercentage: 30,
        deliveryCharge: 1.50,
        category: "Vegetables",
        rating: 4.5,
        unit: "/kg",
    },
    {
        id: "10",
        name: "Mango",
        image: Image2,
        originalPrice: 6.99,
        discountedPrice: 5.49,
        discountPercentage: 21,
        deliveryCharge: 2.50,
        category: "Fruits",
        rating: 4.8,
        unit: "/kg",
    },
    {
        id: "11",
        name: "Grapes",
        image: Image3,
        originalPrice: 7.99,
        discountedPrice: 5.99,
        discountPercentage: 25,
        deliveryCharge: 2.00,
        category: "Fruits",
        rating: 4.7,
        unit: "/kg",
    },
    {
        id: "12",
        name: "Lettuce",
        image: Image1,
        originalPrice: 3.99,
        discountedPrice: 2.99,
        deliveryCharge: 1.50,
        category: "Vegetables",
        rating: 4.3,
        unit: "/kg",
    },
];

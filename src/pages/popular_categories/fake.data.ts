
import image1 from "@/assets/img1.png";
import image2 from "@/assets/img2.png";
import image3 from "@/assets/img3.png";
import image4 from "@/assets/img4.png";
import image5 from "@/assets/img5.png";


export interface Category {
    id: string;
    name: string;
    itemCount: number;
    image: string;
}

export const popularCategoriesData: Category[] = [
    {
        id: "1",
        name: "Vegetables",
        itemCount: 120,
        image: image1
    },
    {
        id: "2",
        name: "Fruits",
        itemCount: 20,
        image: image2
    },
    {
        id: "3",
        name: "Beverages",
        itemCount: 10,
        image: image3
    },
    {
        id: "4",
        name: "Meat & Fish",
        itemCount: 12,
        image: image4
    },
    {
        id: "5",
        name: "Packed Food",
        itemCount: 20,
        image: image5
    },
];

import { CategoryCard } from "@/components/category-card";
import { popularCategoriesData } from "./fake.data";

export const PopularCategories = () => {
    return (
        <section className="w-full py-2" id="popular-categories">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Popular Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {popularCategoriesData.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            itemCount={category.itemCount}
                            image={category.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
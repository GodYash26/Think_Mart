import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CategoryOption {
    id: string;
    name: string;
}

interface ProductFiltersProps {
    categories: CategoryOption[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: [number, number];
    maxPrice: number;
    onPriceChange: (range: [number, number]) => void;
    onResetFilters: () => void;
}

export function ProductFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    maxPrice,
    onPriceChange,
    onResetFilters,
}: ProductFiltersProps) {
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (value <= priceRange[1]) {
            onPriceChange([value, priceRange[1]]);
        }
    };

    const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (value >= priceRange[0]) {
            onPriceChange([priceRange[0], value]);
        }
    };

    return (
        <div className="space-y-4">
            {/* Categories Filter */}
            <Card className="border-gray-200">
                <CardHeader className="pb-3">
                    <Button
                        onClick={() => toggleSection('categories')}
                        className="flex items-center justify-between w-full bg-white hover:bg-white text-gray-700"
                    >
                        <CardTitle className="text-base  font-semibold">Product Categories</CardTitle>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
                        />
                    </Button>
                </CardHeader>
                {expandedSections.categories && (
                    <CardContent className="space-y-3">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                                <Checkbox
                                    checked={selectedCategory === category.id}
                                    onChange={() => onCategoryChange(category.id)}
                                />
                                <span className="text-sm text-gray-700">{category.name}</span>
                            </label>
                        ))}
                    </CardContent>
                )}
            </Card>

            {/* Price Filter */}
            <Card className="border-gray-200">
                <CardHeader className="pb-3">
                    <Button
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between w-full bg-white hover:bg-white text-gray-700"
                    >
                        <CardTitle className="text-base font-semibold">Price</CardTitle>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
                        />
                    </Button>
                </CardHeader>
                {expandedSections.price && (
                    <CardContent className="space-y-4">
                        {/* Price Range Slider */}
                        <div className="space-y-3">
                            <input
                                type="range"
                                min="0"
                                max={maxPrice}
                                value={priceRange[0]}
                                onChange={handlePriceMinChange}
                                className="w-full accent-green-600"
                            />
                            <input
                                type="range"
                                min="0"
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={handlePriceMaxChange}
                                className="w-full accent-green-600"
                            />
                        </div>

                        {/* Price Display */}
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                                ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
                            </span>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Reset Button */}
            <Button
                onClick={onResetFilters}
                className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
            >
                Clear All Filters
            </Button>
        </div>
    );
}

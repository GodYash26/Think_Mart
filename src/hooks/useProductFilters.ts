import { useState, useMemo } from 'react';
import type { Product } from '@/pages/products/fake.products';

export interface FilterState {
    searchQuery: string;
    selectedCategory: string;
    priceRange: [number, number];
    minRating: number;
}

export function useProductFilters(products: Product[]) {
    const [filters, setFilters] = useState<FilterState>({
        searchQuery: '',
        selectedCategory: 'All',
        priceRange: [0, 100],
        minRating: 0,
    });

    const categories = useMemo(() => {
        const cats = ['All', ...new Set(products.map(p => p.category))];
        return cats;
    }, [products]);

    const maxPrice = useMemo(() => {
        return Math.max(...products.map(p => p.discountedPrice), 100);
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Filter by search query
            const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

            // Filter by category
            const matchesCategory = filters.selectedCategory === 'All' || product.category === filters.selectedCategory;

            // Filter by price range
            const matchesPrice = product.discountedPrice >= filters.priceRange[0] && product.discountedPrice <= filters.priceRange[1];

            // Filter by rating
            const matchesRating = product.rating >= filters.minRating;

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });
    }, [products, filters]);

    const setSearchQuery = (query: string) => {
        setFilters(prev => ({ ...prev, searchQuery: query }));
    };

    const setSelectedCategory = (category: string) => {
        setFilters(prev => ({ ...prev, selectedCategory: category }));
    };

    const setPriceRange = (range: [number, number]) => {
        setFilters(prev => ({ ...prev, priceRange: range }));
    };

    const setMinRating = (rating: number) => {
        setFilters(prev => ({ ...prev, minRating: rating }));
    };

    const resetFilters = () => {
        setFilters({
            searchQuery: '',
            selectedCategory: 'All',
            priceRange: [0, maxPrice],
            minRating: 0,
        });
    };

    return {
        filters,
        filteredProducts,
        categories,
        maxPrice,
        setSearchQuery,
        setSelectedCategory,
        setPriceRange,
        setMinRating,
        resetFilters,
    };
}

import { useEffect, useMemo, useState } from 'react';
import { ProductFilters } from './components/product-filters';
import { ProductsGrid } from './components/products-grid';
import { ActiveFilters } from './components/active-filters';
import SearchBar from '@/components/header/search';
import { useProduct } from '@/hooks/products/useProduct';
import { useCategories } from '@/hooks/categories/useCategories';

export function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);

    const { data: categories = [] } = useCategories();

    const queryParams = useMemo(
        () => ({
            search: searchQuery.trim() ? searchQuery.trim() : undefined,
            category: selectedCategory === 'All' ? undefined : selectedCategory,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            page,
            limit,
        }),
        [searchQuery, selectedCategory, priceRange, page, limit]
    );

    const { getProducts } = useProduct(undefined, queryParams);
    const { data, isLoading, error } = getProducts;
    const products = data?.products ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const maxPrice = useMemo(() => {
        if (products.length === 0) {
            return 100;
        }

        const max = Math.max(
            ...products.map((product) => product.discountedPrice ?? product.originalPrice)
        );

        return Math.max(max, 100);
    }, [products]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedCategory, priceRange, limit]);

    useEffect(() => {
        setPriceRange((currentRange) => [
            currentRange[0],
            Math.min(currentRange[1], maxPrice),
        ]);
    }, [maxPrice]);

    const categoryOptions = useMemo(
        () => [
            { id: 'All', name: 'All' },
            ...categories.map((category) => ({
                id: category.id,
                name: category.category_name,
            })),
        ],
        [categories]
    );

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setPriceRange([0, maxPrice]);
    };

    const handleToggleFavorite = (productId: string, isFavorite: boolean) => {
        console.log(`Product ${productId} favorite status: ${isFavorite}`);
    };

    // Build active filters list
    const activeFiltersList = [];

    if (searchQuery) {
        activeFiltersList.push({
            id: 'search',
            label: `"${searchQuery}"`,
            onRemove: () => setSearchQuery(''),
        });
    }

    if (selectedCategory !== 'All') {
        const activeCategory = categoryOptions.find(
            (option) => option.id === selectedCategory
        );
        activeFiltersList.push({
            id: 'category',
            label: activeCategory?.name ?? 'Category',
            onRemove: () => setSelectedCategory('All'),
        });
    }

    if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
        activeFiltersList.push({
            id: 'price',
            label: `$${priceRange[0].toFixed(2)} - $${priceRange[1].toFixed(2)}`,
            onRemove: () => setPriceRange([0, maxPrice]),
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Bar Section */}
            <div className="bg-white border-b border-gray-200 pt-5 pb-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Items Sold by Rice Spice and Dice</h1>
                </div>
            </div>
            <div className='mt-4'>
                <SearchBar onSearch={setSearchQuery} />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Active Filters Display */}
                {activeFiltersList.length > 0 && (
                    <ActiveFilters
                        filters={activeFiltersList}
                        onClearAll={resetFilters}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <ProductFilters
                                categories={categoryOptions}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                priceRange={priceRange}
                                maxPrice={maxPrice}
                                onPriceChange={setPriceRange}
                                onResetFilters={resetFilters}
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Results Info */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-600 text-sm">
                                Showing <span className="font-semibold">{products.length}</span> of{' '}
                                <span className="font-semibold">{total}</span> products
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Page {page} of {totalPages}</span>
                            </div>
                        </div>

                    {/* Products Grid */}
                    <ProductsGrid
                        products={products}
                        isLoading={isLoading}
                        error={error as Error | null}
                        isError={!!error}
                        onToggleFavorite={handleToggleFavorite}
                    />

                        {/* Pagination */}
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span>Rows</span>
                                <select
                                    value={limit}
                                    onChange={(event) => setLimit(Number(event.target.value))}
                                    className="border border-gray-200 rounded-md px-2 py-1 bg-white"
                                >
                                    <option value={9}>9</option>
                                    <option value={12}>12</option>
                                    <option value={18}>18</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="border border-gray-200 rounded-md px-3 py-1 bg-white disabled:opacity-50"
                                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                    disabled={page <= 1}
                                >
                                    Previous
                                </button>
                                <button
                                    className="border border-gray-200 rounded-md px-3 py-1 bg-white disabled:opacity-50"
                                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                                    disabled={page >= totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;

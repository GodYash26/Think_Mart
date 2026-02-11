import { ProductFilters } from './components/product-filters';
import { ProductsGrid } from './components/products-grid';
import { ActiveFilters } from './components/active-filters';
import { useProductFilters } from '@/hooks/useProductFilters';
import { fakeProducts } from './fake.products';
import SearchBar from '@/components/header/search';
import { MainLayout } from '@/layout/main.layout';

export function ProductsPage() {
    const {
        filters,
        filteredProducts,
        categories,
        maxPrice,
        setSearchQuery,
        setSelectedCategory,
        setPriceRange,
        setMinRating,
        resetFilters,
    } = useProductFilters(fakeProducts);

    const handleAddToCart = (productId: string, quantity: number) => {
        console.log(`Added ${quantity} of product ${productId} to cart`);
        // TODO: Implement cart logic here
    };

    const handleToggleFavorite = (productId: string, isFavorite: boolean) => {
        console.log(`Product ${productId} favorite status: ${isFavorite}`);
        // TODO: Implement favorites logic here
    };

    // Build active filters list
    const activeFiltersList = [];

    if (filters.searchQuery) {
        activeFiltersList.push({
            id: 'search',
            label: `"${filters.searchQuery}"`,
            onRemove: () => setSearchQuery(''),
        });
    }

    if (filters.selectedCategory !== 'All') {
        activeFiltersList.push({
            id: 'category',
            label: filters.selectedCategory,
            onRemove: () => setSelectedCategory('All'),
        });
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) {
        activeFiltersList.push({
            id: 'price',
            label: `$${filters.priceRange[0].toFixed(2)} - $${filters.priceRange[1].toFixed(2)}`,
            onRemove: () => setPriceRange([0, maxPrice]),
        });
    }

    if (filters.minRating > 0) {
        activeFiltersList.push({
            id: 'rating',
            label: `${filters.minRating}★ & up`,
            onRemove: () => setMinRating(0),
        });
    }

    return (
        <MainLayout>
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
                                    categories={categories}
                                    selectedCategory={filters.selectedCategory}
                                    onCategoryChange={setSelectedCategory}
                                    priceRange={filters.priceRange}
                                    maxPrice={maxPrice}
                                    onPriceChange={setPriceRange}
                                    minRating={filters.minRating}
                                    onRatingChange={setMinRating}
                                    onResetFilters={resetFilters}
                                />
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {/* Results Info */}
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-gray-600 text-sm">
                                    Showing <span className="font-semibold">{filteredProducts.length}</span> products
                                </p>
                            </div>

                            {/* Products Grid */}
                            <ProductsGrid
                                products={filteredProducts}
                                onAddToCart={handleAddToCart}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ProductsPage;

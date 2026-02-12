import FAQ from '@/components/faqs/faqs'
import StoreLocation from '@/components/location/location'
import { Hero } from '@/pages/hero/hero'
import { PopularCategories } from '@/pages/popular_categories/popular-categories'
import { OfferProducts } from '@/pages/offer_products/offer-products'
import { FeatureProducts } from '@/pages/feature_products/feature-products'
import { ProductsPage } from '../products/products'
import { MainLayout } from '@/layout/main-layout'

export const HomePage = () => {
    return (
        <MainLayout>
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <Hero />
                <PopularCategories />
                <OfferProducts />
                <FeatureProducts />
                <ProductsPage />
                <StoreLocation />
                <FAQ />
            </main>
        </MainLayout>
    )
}


import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Navbar from '@/components/header/navbar'
import FAQ from '@/components/faqs/faqs'
import StoreLocation from '@/components/location/location'
import { Hero } from '@/pages/hero/hero'
import { PopularCategories } from '@/pages/popular_categories/popular_categories'
import { OfferProducts } from '@/pages/offer_products/offer_products'

export const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Navbar />
            <Hero />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
                {/* Your page content goes here */}
            </main>
            <PopularCategories />
            <OfferProducts />
            <StoreLocation />
            <FAQ />
            <Footer />
        </div>
    )
}
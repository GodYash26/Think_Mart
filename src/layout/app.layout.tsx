
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Navbar from '@/components/header/navbar'
import FAQ from '@/components/faqs/faqs'
import StoreLocation from '@/components/location/location'

export const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />
            <Navbar />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
                {/* Your page content goes here */}
            </main>
            <StoreLocation />
            <FAQ />
            <Footer />
        </div>
    )
}
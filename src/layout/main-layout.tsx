import type { ReactNode } from 'react'
import Header from '@/components/header/header'
import Navbar from '@/components/header/navbar'
import Footer from '@/components/footer/footer'

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layout/main-layout'
import { ScrollToTop } from '@/components/scroll-to-top'
import { AdminDashboardPage } from './pages/admin/dashboard'
import { HomePage } from './pages/home/home'
import { ProductsPage } from './pages/products/products'
import { ProductDetailsPage } from './pages/products/product-details'
import { DashboardLayout } from './layout/dashboard-layout'
import { AddProductPage } from './pages/admin/add-product'
import { AddCategoryPage } from './pages/admin/add-category'
import { ProfilePage } from './pages/admin/profile'
import { AdminProductsPage } from './pages/admin/products'
import { AdminProductDetailsPage } from './pages/admin/product-details'
import { AdminOrdersPage } from './pages/admin/orders'
import { AdminCustomersPage } from './pages/admin/customers'
import AuthEntry from './auth/auth-entry'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/protected-route'
import { UserRole } from './types/auth'
import RegisterForm from './components/customer/register-form'
import CustomerDashboard from './pages/customer-dashboard'
import { MyOrdersPage } from './pages/my-orders'
import ProfilePageCustomer from './components/profile/profile-page'
import { useAuth } from './hooks/useAuth'
import {
  Sheet,
  SheetContent,
} from './components/ui/sheet'

function AppContent() {
  const { authSheetOpen, setAuthSheetOpen, authTab } = useAuth()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />
        <Route path="/products/:id"
          element={
            <MainLayout>
              <ProductDetailsPage />
            </MainLayout>
          }
        />
        <Route path='/auth' element={<AuthEntry />} />
        <Route path='/login' element={<RegisterForm initialTab="signin" />} />
        <Route path='/register' element={<RegisterForm initialTab="signup" />} />
        
        {/* Customer Routes */}
        <Route
          path='/customer/dashboard'
          element={
            <ProtectedRoute allowedRoles={[UserRole.CUSTOMER]}>
              <MainLayout>
                <CustomerDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-orders'
          element={
            <ProtectedRoute allowedRoles={[UserRole.CUSTOMER, UserRole.ADMIN]}>
              <MainLayout>
                <MyOrdersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute allowedRoles={[UserRole.CUSTOMER, UserRole.ADMIN]}>
              <MainLayout>
                <ProfilePageCustomer />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path='admin/'
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="add-category" element={<AddCategoryPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/:id" element={<AdminProductDetailsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route
          path="*"
          element={
            <MainLayout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  
                </div>
              </div>
            </MainLayout>
          }
        />
      </Routes>

      {/* Global Auth Sheet */}
      <Sheet open={authSheetOpen} onOpenChange={setAuthSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <RegisterForm initialTab={authTab} />
        </SheetContent>
      </Sheet>
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layout/main-layout'
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
import LoginForm from './auth/login-form'
import AuthEntry from './auth/auth-entry'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/protected-route'
import { UserRole } from './types/auth'
import RegisterForm from './components/customer/register-form'
import CustomerDashboard from './pages/customer-dashboard'

function App() {
  return (
    <Router>
      <AuthProvider>
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
          <Route
            path="/products/:id"
            element={
              <MainLayout>
                <ProductDetailsPage />
              </MainLayout>
            }
          />
          <Route path='/auth' element={<AuthEntry />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          
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
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

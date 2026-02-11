import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layout/main.layout'
import { AdminDashboardPage } from './pages/admin/dashboard'
import { HomePage } from './pages/home/home'
import { ProductsPage } from './pages/products/products'
import { DashboardLayout } from './layout/DashboardLayout'
import { AddProductPage } from './pages/admin/add_product'
import { AddCategoryPage } from './pages/admin/add_category'

function App() {
  return (
    <Router>
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
        <Route path='admin/' element={<DashboardLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="add-category" element={<AddCategoryPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

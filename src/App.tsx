import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layout/main.layout'
import { AdminDashboardPage } from './pages/admin/dashboard'
import { HomePage } from './pages/home/home'
import { ProductsPage } from './pages/products/products'
import { DashboardLayout } from './layout/DashboardLayout'

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
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

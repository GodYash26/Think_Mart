import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layout/main.layout'
import { HomePage } from './pages/home/home'
import { ProductsPage } from './pages/products/products'

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
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BottomNav } from '@/components/BottomNav'
import { CartBar } from '@/components/CartBar'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ProductDetails } from '@/components/ProductDetails'
import { HomePage } from '@/pages/HomePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { CartPage } from '@/pages/CartPage'
import { ProfilePage } from '@/pages/ProfilePage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-background min-h-screen">
        {/* Mobile Container */}
        <div className="max-w-sm mx-auto bg-white shadow-lg relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          {/* Cart Bar - shows when there are items */}
          <CartBar />

          {/* Bottom Navigation */}
          <BottomNav />
        </div>
      </div>
    </Router>
  )
}

export default App

import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export function CartBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, getTotalPrice, getTotalItems } = useCartStore()

  // Hide if no items or already on cart page
  if (items.length === 0 || location.pathname === '/cart') {
    return null
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <div className="fixed bottom-20 left-0 right-0 max-w-sm mx-auto px-4 py-3 z-30">
      <Button
        onClick={() => navigate('/cart')}
        className="w-full bg-accent hover:bg-accent/95 text-accent-foreground font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Корзина ({totalItems}) • ₽{totalPrice.toLocaleString()}</span>
      </Button>
    </div>
  )
}

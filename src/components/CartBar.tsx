import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'

export function CartBar() {
  const navigate = useNavigate()
  const { items, getTotalPrice, getTotalItems } = useCartStore()

  if (items.length === 0) {
    return null
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-primary text-primary-foreground max-w-sm mx-auto px-4 py-3">
      <Button
        onClick={() => navigate('/cart')}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg"
      >
        View Cart ({totalItems}) - ₽{totalPrice.toLocaleString()}
      </Button>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cartStore'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CartPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pb-40">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Корзина пуста</p>
          <Button
            onClick={() => navigate('/catalog')}
            className="bg-primary text-primary-foreground"
          >
            Продолжить покупки
          </Button>
        </div>
      </div>
    )
  }

  const total = getTotalPrice()

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 sticky top-0">
        <h1 className="text-xl font-bold text-foreground">Корзина</h1>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 flex gap-4">
            {/* Image */}
            <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col">
              <h3 className="font-medium text-foreground text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                ₽{item.price.toLocaleString()}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(0, item.quantity - 1))
                  }
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <Minus className="h-4 w-4 text-foreground" />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 0)
                  }
                  className="w-12 text-center border border-border rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <Plus className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-auto p-1 hover:bg-secondary rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-4 space-y-4">
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Итого:</span>
          <span className="text-lg font-bold text-primary">
            ₽{total.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <Button className="w-full bg-primary text-primary-foreground font-medium py-6 rounded-lg">
            Перейти к оплате
          </Button>
          <Button
            variant="outline"
            onClick={() => clearCart()}
            className="w-full text-destructive border-destructive hover:bg-destructive/10"
          >
            Очистить корзину
          </Button>
        </div>
      </div>
    </div>
  )
}

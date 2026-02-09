import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Product } from '@/store/cartStore'
import { useCartStore } from '@/store/cartStore'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-border cursor-pointer transition-transform hover:scale-105"
    >
      {/* Image */}
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-3">
        {/* Title - truncate to 2 lines */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 flex-1">
          {product.title}
        </h3>

        {/* SKU */}
        <p className="text-xs text-muted-foreground mt-2">SKU: {product.sku}</p>

        {/* Price and Button */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-border">
          <div className="flex flex-col">
            <p className="text-sm font-bold text-foreground">
              ₽{product.price.toLocaleString()}
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 rounded-lg hover:bg-secondary"
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { MOCK_PRODUCTS } from '@/data/products'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4)

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Hero Section */}
      <div className="bg-secondary px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-2 logo-montserrat">PETERSEL</h1>
        <p className="text-sm text-muted-foreground">
          Премиальный уход, который работает быстро и эффективно
        </p>
      </div>

      {/* Featured Products */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Featured</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Button
          onClick={() => navigate('/catalog')}
          className="w-full bg-primary text-primary-foreground font-medium rounded-lg py-6"
        >
          View All Products
        </Button>
      </div>

      {/* Features */}
      <div className="px-4 py-6 bg-secondary/30">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Why Choose Us
        </h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>✓ Быстрый и заметный результат</li>
          <li>✓ Передовые технологии</li>
          <li>✓ Рабочие ингридиенты</li>
        </ul>
      </div>
    </div>
  )
}

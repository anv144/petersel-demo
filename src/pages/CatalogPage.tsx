import { ProductCard } from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { MOCK_PRODUCTS } from '@/data/products'
import { useRestoreCatalogScroll } from '@/hooks/useScrollRestoration'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Restore catalog scroll position and save on scroll
  useRestoreCatalogScroll()

  const filteredProducts = MOCK_PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4 z-10">
        <h1 className="text-xl font-bold text-foreground mb-4">Каталог</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск товаров..."
            className="pl-10 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-sm">Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { MOCK_PRODUCTS } from '@/data/products'
import { ImageLightbox } from '@/components/ImageLightbox'

export function ProductDetails() {
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()
  const addItem = useCartStore((state) => state.addItem)

  // Scroll to top when component mounts
  useEffect(() => {
    // Disable browser scroll restoration and scroll to top
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  
  const product = MOCK_PRODUCTS.find((p) => p.id === productId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const pointerStartX = useRef(0)
  const pointerStartY = useRef(0)
  const SWIPE_THRESHOLD = 50 // minimum pixels to detect as swipe

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pb-40">
        <p className="text-muted-foreground mb-4">Товар не найден</p>
        <Button onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
      </div>
    )
  }

  const images = product.images || [product.image]

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
    pointerStartX.current = e.changedTouches[0].screenX
    pointerStartY.current = e.changedTouches[0].screenY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    const pointerEndX = e.changedTouches[0].screenX
    const pointerEndY = e.changedTouches[0].screenY
    const movedX = Math.abs(pointerEndX - pointerStartX.current)
    const movedY = Math.abs(pointerEndY - pointerStartY.current)
    
    // Only trigger swipe if movement exceeds threshold and is horizontal
    if (movedX > 5 && movedX > movedY) {
      handleSwipe()
      return // Exit early - don't open lightbox on swipe
    }
    
    // Only open lightbox on tap with minimal movement in center region
    if (movedX <= 5 && movedY <= 5) {
      const imageRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const clickX = pointerEndX - imageRect.left
      const centerStart = imageRect.width * 0.3
      const centerEnd = imageRect.width * 0.7
      
      // Only trigger lightbox if clicked in center region (not on edges)
      if (clickX >= centerStart && clickX <= centerEnd) {
        e.stopPropagation()
        setIsLightboxOpen(true)
      }
    }
  }

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > SWIPE_THRESHOLD
    const isRightSwipe = distance < -SWIPE_THRESHOLD

    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleEdgeClick = (side: 'left' | 'right') => {
    if (side === 'left' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else if (side === 'right' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const centerStart = rect.width * 0.3
    const centerEnd = rect.width * 0.7
    
    // Only open lightbox if clicked in center region (not on edges)
    if (clickX >= centerStart && clickX <= centerEnd) {
      e.stopPropagation()
      setIsLightboxOpen(true)
    }
  }

  const handleAddToCart = () => {
    addItem(product)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4 z-10 flex items-center gap-3">
        <button
          onClick={() => navigate('/catalog')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1">Детали товара</h1>
      </div>

      {/* Image Carousel */}
      <div className="relative bg-white">
        {/* Main Image Container */}
        <div
          className="w-full aspect-[3/4] bg-muted overflow-hidden relative select-none cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleImageClick}
        >
          <img
            src={images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
            draggable={false}
          />

          {/* Left Edge Click Zone */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEdgeClick('left')
              }}
              className="absolute left-0 top-0 h-full w-1/4 cursor-pointer hover:bg-black/5 transition-colors"
              aria-label="Previous image"
              disabled={currentImageIndex === 0}
            />
          )}

          {/* Right Edge Click Zone */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEdgeClick('right')
              }}
              className="absolute right-0 top-0 h-full w-1/4 cursor-pointer hover:bg-black/5 transition-colors"
              aria-label="Next image"
              disabled={currentImageIndex === images.length - 1}
            />
          )}
        </div>

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors pointer-events-auto ${
                  index === currentImageIndex
                    ? 'bg-primary'
                    : 'bg-muted-foreground/40'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium pointer-events-none">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="bg-white border-b border-border px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-primary scale-105'
                  : 'border-border hover:scale-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="bg-white px-4 py-6 border-b border-border">
        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-3">
          {product.title}
        </h1>

        {/* Price */}
        <div className="mb-4">
          {product.oldPrice && (
            <p className="text-sm text-muted-foreground line-through mb-2">
              {product.oldPrice.toLocaleString()} ₽
            </p>
          )}
          <p className="text-3xl font-bold text-primary">
            {product.price.toLocaleString()} ₽
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            SKU: {product.sku}
          </p>
        </div>

        {/* Description */}
        {product.description && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">
              Описание
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>

      {/* Sticky Footer - Add to Cart */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border max-w-sm mx-auto p-4 z-40">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground font-semibold py-6 rounded-lg"
        >
          В корзину
        </Button>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={images[currentImageIndex]}
        imageAlt={product.title}
      />
    </div>
  )
}

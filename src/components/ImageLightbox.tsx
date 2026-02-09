import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useState } from 'react'

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  imageAlt: string
}

export function ImageLightbox({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1)

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 1))
  }

  const handleReset = () => {
    setScale(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false}
        className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !max-h-none !bg-black !border-0 !p-0 !rounded-none !gap-0 !grid !z-50 flex flex-col items-center justify-center"
      >
        <DialogTitle className="sr-only">Image Viewer</DialogTitle>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Image Container */}
        <div className="absolute inset-0 flex items-center justify-center overflow-auto bg-black">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="transition-transform duration-200 select-none max-w-[90vw] max-h-[90vh] object-contain"
            style={{
              transform: `scale(${scale})`,
              cursor: scale > 1 ? 'grab' : 'pointer',
            }}
            draggable={false}
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            −
          </button>
          <span className="text-white text-sm font-medium min-w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 3}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            +
          </button>
          {scale !== 1 && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Сбросить
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

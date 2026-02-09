import { create } from 'zustand'

export interface Product {
  id: string
  title: string
  price: number
  oldPrice?: number
  image: string
  images?: string[]
  description?: string
  sku: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id)
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    })
  },
  
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId),
    }))
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0),
    }))
  },
  
  clearCart: () => {
    set({ items: [] })
  },
  
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  
  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))

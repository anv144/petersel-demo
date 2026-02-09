import { create } from 'zustand'

interface ScrollPosition {
  [path: string]: number
}

interface ScrollStore {
  positions: ScrollPosition
  saveScrollPosition: (path: string, scrollY: number) => void
  getScrollPosition: (path: string) => number | undefined
  clearScrollPosition: (path: string) => void
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  positions: {},

  saveScrollPosition: (path: string, scrollY: number) => {
    set((state) => ({
      positions: {
        ...state.positions,
        [path]: scrollY,
      },
    }))
  },

  getScrollPosition: (path: string) => {
    return get().positions[path]
  },

  clearScrollPosition: (path: string) => {
    set((state) => {
      const newPositions = { ...state.positions }
      delete newPositions[path]
      return { positions: newPositions }
    })
  },
}))

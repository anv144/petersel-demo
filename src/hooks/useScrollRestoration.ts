import { useEffect } from 'react'

const CATALOG_SCROLL_KEY = 'catalog_scroll_position'

/**
 * Hook to restore catalog scroll position from sessionStorage on mount
 * Call this in the CatalogPage component
 */
export function useRestoreCatalogScroll() {
  useEffect(() => {
    // Disable browser's native scroll restoration
    window.history.scrollRestoration = 'manual'

    // Restore scroll position from sessionStorage
    const savedScrollPosition = sessionStorage.getItem(CATALOG_SCROLL_KEY)
    if (savedScrollPosition) {
      const position = parseInt(savedScrollPosition, 10)
      // Use requestAnimationFrame to ensure DOM is ready
      const frameId = requestAnimationFrame(() => {
        window.scrollTo(0, position)
      })
      return () => cancelAnimationFrame(frameId)
    }
  }, [])

  // Save catalog scroll position on scroll events
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        sessionStorage.setItem(CATALOG_SCROLL_KEY, window.scrollY.toString())
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])
}

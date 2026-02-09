import { useEffect } from 'react'

export function ScrollToTop() {
  useEffect(() => {
    // Disable browser's native scroll restoration globally
    window.history.scrollRestoration = 'manual'
  }, [])

  return null
}

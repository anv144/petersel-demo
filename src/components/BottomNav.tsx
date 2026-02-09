import { Home, Grid, ShoppingCart, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const items = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: Grid, label: 'Каталог', path: '/catalog' },
    { icon: ShoppingCart, label: 'Корзина', path: '/cart' },
    { icon: User, label: 'Профиль', path: '/profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border max-w-sm mx-auto">
      <div className="grid grid-cols-4 gap-0">
        {items.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              isActive(path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

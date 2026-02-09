import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, Phone, Mail } from 'lucide-react'

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 sticky top-0">
        <h1 className="text-xl font-bold text-foreground">Профиль</h1>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6 space-y-6">
        {/* User Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">P</span>
              </div>
             <div>
                 <CardTitle className="text-base">Гость</CardTitle>
                 <CardDescription className="text-xs">Telegram Mini App</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Контакты</h3>
          <div className="space-y-2">
            <a
              href="tel:+79687737731"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">+7 968 773 77 31</span>
            </a>
            <a
              href="mailto:petersel.store@gmail.com"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">petersel.store@gmail.com</span>
            </a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">О PETERSEL</h3>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Премиальный уход, который работает быстро и эффективно. Почувствуй, что значит качественная косметика с видимым результатом в кратчайшие сроки.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Аккаунт</h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-secondary"
            >
              История заказов
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-secondary"
            >
              Сохраненные товары
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-secondary"
            >
              Настройки
            </Button>
          </div>
        </div>

        {/* Logout */}
        <Button
          className="w-full bg-destructive text-white hover:bg-destructive/90 rounded-lg"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Выход
        </Button>
      </div>
    </div>
  )
}

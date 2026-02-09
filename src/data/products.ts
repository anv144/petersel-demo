import type { Product } from '@/store/cartStore'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: '9165',
    title: 'Бессульфатный шампунь Hair Growth 300мл',
    price: 2399,
    oldPrice: 2899,
    image: '/images/shampoo/shampoo1-300.webp',
    images: [
      '/images/shampoo/shampoo1-300.webp',
      '/images/shampoo/shampoo2.webp',
      '/images/shampoo/shampoo3.webp',
      '/images/shampoo/shampoo4.webp',
      '/images/shampoo/shampoo5.webp',
      '/images/shampoo/shampoo6.webp',
      '/images/shampoo/shampoo7.webp'
    ],
    description: 'Наш лечебный безсульфатный шампунь против выпадения волос — это природный активатор роста, который подарит вашим локонам здоровье, силу и естественную красоту. ',
  },
  {
    id: '2',
    sku: '9166',
    title: 'Бессульфатный шампунь Hair Growth 500мл',
    price: 2899,
    oldPrice: 3399,
    image: '/images/shampoo/shampoo1-500.webp',
    images: [
      '/images/shampoo/shampoo1-500.webp',
      '/images/shampoo/shampoo2.webp',
      '/images/shampoo/shampoo3.webp',
      '/images/shampoo/shampoo4.webp',
      '/images/shampoo/shampoo5.webp',
      '/images/shampoo/shampoo6.webp',
      '/images/shampoo/shampoo7.webp'
    ],
    description: 'Наш лечебный безсульфатный шампунь против выпадения волос — это природный активатор роста, который подарит вашим локонам здоровье, силу и естественную красоту. ',
  },
  {
    id: '3',
    sku: '3487',
    title: 'Маска для волос с экстрактом камелии',
    price: 2799,
    oldPrice: 3699,
    image: '/images/mask/mask1.webp',
    images: [
      '/images/mask/mask1.webp',
      '/images/mask/mask2.webp',
      '/images/mask/mask3.webp',
      '/images/mask/mask4.webp',
      '/images/mask/mask5.webp',
      '/images/mask/mask6.webp',
      '/images/mask/mask7.webp',
      '/images/mask/mask8.webp',
    ],
    description: 'Luxurious essence with 24K gold and Persian silk proteins. Boosts collagen production and firms skin. Lightweight texture absorbs quickly without greasy residue.',
  },

  {
    id: '7',
    sku: '6721',
    title: 'Крем Акне Контроль для проблемной кожи',
    price: 2199,
    image: '/images/green-cream.webp',
    images: [
      '/images/green-cream.webp'
    ],
    description: 'Если вы устали от постоянных высыпаний и воспалений, ACNE CONTROL поможет вернуть коже чистоту, здоровье и комфорт — без сухости, покраснений и агрессивного воздействия.',
  },
  {
    id: '8',
    sku: '6722',
    title: 'Антивозрастная персиковая эссенция с 24К золотом',
    price: 2799,
    oldPrice: 3699,
    image: '/images/essence.webp',
    images: [
      '/images/essence.webp'
    ],
    description: 'Роскошная эссенция для сияющей и молодой кожи. Откройте для себя эссенцию, которая объединяет силу природы и современные технологии. Формула сочетает в себе ценные активы — золото, экстракт икры, пептиды и цветочные компоненты — чтобы подарить вашей коже сияние, гладкость и упругость.',
  },
  {
    id: '9',
    sku: '6723',
    title: 'Очищающая маска с фасолью и каолином',
    price: 1999,
    oldPrice: 2499,
    image: '/images/detox.webp',
    images: [
      '/images/detox.webp'
    ],
    description: 'Глубокое очищение и сужение пор. Детокс-маска с экстрактом зеленой фасоли. Ощутите силу природы с маской, созданной для глубокого очищения, сужения пор и интенсивного увлажнения.',
  }
]

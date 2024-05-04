export const PRODUCT_CATEGORIES = [
  {
      label: 'Promocionado',
      value: 'select' as const,
      featured: [
          {
              name: 'Clasicos',
              href: `/products?category=ui_kits`,
              imageSrc: '/nav/picks/img1.jpg',
          },
          {
              name: 'UwU Selection',
              href: '/products?category=ui_kits&sort=desc',
              imageSrc: '/nav/picks/img2.jpg',
          },
      ],
  },

  {
      label: 'Populares',
      value: 'popular' as const,
      featured: [
          {
              name: 'Los mas Vendidos',
              href: '/products?category=ui_kits',
              imageSrc: '/nav/fav/img1.jpg',
          },
          {
              name: 'Aclamados por la Critica',
              href: `/products?category=icons`,
              imageSrc: '/nav/fav/img2.jpg',
          },
      ],
  },
]
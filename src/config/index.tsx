export const PRODUCT_CATEGORIES = [
    {
        label: 'Recomendados',
        value: 'select' as const,
        featured: [
            {
                name: 'Clasicos',
                href: '#',
                imageSrc: '/nav/picks/img1.jpg',
            },
            {
                name: 'UwU Selection',
                href: '#',
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
                href: '#',
                imageSrc: '/nav/fav/img1.jpg',
            },
            {
                name: 'Aclamados por la Critica',
                href: '#',
                imageSrc: '/nav/fav/img2.jpg',
            },
        ],
    },
]

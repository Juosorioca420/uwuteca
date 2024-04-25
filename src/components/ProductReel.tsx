'use client'

import { Product } from '../payload-types'
import { TypeProductQueryValidator } from '../lib/validators/product-query-validator'
import { trpc } from '../trpc/client'
import Link from 'next/link'
import React from 'react'
import ProductListing from './ProductList'

interface Props {
    title: string,
    subtitle?: string,
    href?: string,
    query: TypeProductQueryValidator,
}

const ProductReel = ( props : Props ) => {

    const { title, subtitle, href, query } = props
    const { data : items, isLoading } = trpc.getMainProducts.useInfiniteQuery(
        {
            limit: query.limit ?? 4,
            query,
        },

        { getNextPageParam: (lastPage) => lastPage.nextPage, },
    )

    const products = items?.pages.flatMap((page) => page.items)
    let products_map : (Product | null)[] = []
    
    if (products && products.length > 0){ products_map = products }
    else if (isLoading){
        products_map = new Array<null>(query.limit ?? 4).fill(null)
    }


    return (

        <section className='py-12 lg:mx-24 md:mx-20 sm:mx-4'>

                <div className='md:flex md:items-center md:justify-between mb-4'>
                    <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
                    {title ? (
                        <a className='text-2xl font-bold text-gray-900 sm:text-2xl' href={href}>
                            {title}
                        </a>
                    ) : null}
                    {subtitle ? (
                        <h3 className='mt-2 text-sm text-gray-600'>
                            {subtitle}
                        </h3>
                    ) : null}
                    </div>

                    {href ? (
                    <Link
                        href={href}
                        className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
                            Explorar Catalogo{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                    ) : null}
                </div>

                <div className='relative'>

                    <div className='mt-4 flex items-center w-full'>
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {products_map.map( (product, i) => (
                                    <ProductListing product={product} index={i} />
                                )
                            )
                        }
                    </div>
                    </div>

                </div>
                
            </section>  
    
    )

}

export default ProductReel

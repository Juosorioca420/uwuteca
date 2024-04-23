'use client'

import Link from 'next/link'
import React from 'react'

interface Props {
    title: string,
    subtitle?: string,
    href?: string,
}

const ProductReel = ( props : Props ) => {
    const { title, subtitle, href } = props

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

                {/* <div className='relative'>
                    <div className='mt-6 flex items-center w-full'>
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {map.map((product, i) => (
                        <ProductListing
                            key={`product-${i}`}
                            product={product}
                            index={i}
                        />
                        ))}
                    </div>
                    </div>
                </div> */}
                
            </section>  
    
    )
}

export default ProductReel

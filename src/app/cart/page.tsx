"use client"

import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatPrice } from "@/lib/utils"
import { Button, buttonVariants } from "../../components/ui/button";
import { Check, Loader2, X } from "lucide-react"
import { Category } from "../../payload-types"
import { trpc } from '@/trpc/client'

const Page = () => {

    const { mutate: updateQty } = trpc.auth.updateQty.useMutation({
        onSuccess: () => { }
    })

    const { items, removeItem, clearCart } = useCart()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce((total, { product }) => total + product.price, 0)


    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    Carrito de Compras
                </h1>
                <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                    <div className={cn("lg:col-span-7", {
                        'rounded-lg border-2 border-dashed border-zinc-300 p-12':
                            isMounted && items.length === 0,
                    })}>
                        <h2 className='sr-only'>
                            Mangas en tu carrito
                        </h2>

                        {isMounted && items.length === 0 ? (
                            <div className='flex h-full flex-col items-center justify-center space-y-1'>
                                <div
                                    aria-hidden="true"
                                    className='relative mb-4 h-40 w-40 text-muted-foreground'>
                                    <Image
                                        src='/cart/rimuru2.png'
                                        fill
                                        loading='eager'
                                        alt='Rimuru-triste'
                                    />
                                </div>
                                <h3 className='font-semibold text-2xl'>Rimuru sigue dormido.</h3>
                                <p className='text-muted-foreground text-center'>
                                    Coloca algo aquí para despertar a Rimuru.
                                </p>

                                <Link
                                    href='/products'
                                    className={buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className:
                                            'text-sm text-muted-foreground',
                                    })}>
                                    Añade productos al Carrito
                                </Link>
                            </div>
                        ) : null}

                        {   items.length > 0 ? (
                            <div className="flex-shrink-0 flex justify-normal mr-2">
                                <button
                                    className="text-gray-700 hover:text-red-700 mb-2 inline-flex items-center"
                                    onClick={
                                        () => {
                                            items.forEach(item => {
                                                updateQty({ id: item.product.id.toString(), qty: item.product.qty + (item?.qty ?? 0) - 1 });
                                            })
                                            clearCart()
                                        }
                                    }
                                >
                                    <X className="w-4 h-4 mt-1 mr-1" /> Vaciar
                                </button>
                            </div>
                        ) : null}

                        <ul
                            className={cn({
                                'divide-y divide-gray-300 border-b border-t border-gray-300':
                                    isMounted && items.length > 0,
                            })}>

                            {isMounted &&
                                items.map(({ product }) => {
                                    const [category] = product.category as Category[]
                                    const label = category.name

                                    const { image } = product.images[0]

                                    return (
                                        <li
                                            key={product.id}
                                            className='flex py-6 sm:py-10'>
                                            <div className='flex-shrink-0'>
                                                <div className='relative h-24 w-24'>
                                                    {typeof image !== 'string' &&
                                                        image.url ? (
                                                        <Link href={`/product/${product.id}`}>
                                                            <Image
                                                                fill
                                                                src={image.url}
                                                                alt='product image'
                                                                className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                                                            />
                                                        </Link>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                                <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                                                    <div>
                                                        <div className='flex justify-between'>
                                                            <h3 className='text-sm'>
                                                                <Link
                                                                    href={`/product/${product.id}`}
                                                                    className='font-medium text-gray-900 hover:text-blue-800'>
                                                                    {product.name}
                                                                </Link>
                                                            </h3>
                                                        </div>

                                                        <div className='mt-1 flex text-sm'>
                                                            <p className='text-gray-700'>
                                                                Categoria: {label}
                                                            </p>
                                                        </div>

                                                        <p className='mt-1 text-sm font-medium text-gray-900'>
                                                            {formatPrice(product.price)}
                                                        </p>
                                                    </div>

                                                    <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                                        <div className='absolute right-0 top-0'>
                                                            <Button
                                                                aria-label='remove product'
                                                                onClick={() =>
                                                                    removeItem(product.id)
                                                                }
                                                                variant='ghost'>
                                                                <X
                                                                    className='h-5 w-5 text-gray-700'
                                                                    aria-hidden='true'
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                                                    <Check className='h-5 w-5 flex-shrink-0 text-green-500' />

                                                    <span>
                                                        IVA incluido.
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>

                    </div>


                    <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
                        <h2 className='text-lg font-medium text-gray-900'>Resumen de la Orden</h2>
                        <div className='mt-6 space-y-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm text-gray-600'>Subtotal</p>
                                <p className='text-sm fotn-medium text-gray-900'>
                                    {isMounted ? (
                                        formatPrice(cartTotal)
                                    ) : (
                                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                    )}
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-t border-gray-300 pt-4'>
                                <div className='flex item-center text-muted-foreground text-sm'>
                                    <span>Envio</span>
                                </div>
                                <div className='text-sm font-medium text-gray-900'>
                                    {isMounted ? (
                                        <div className='text-sm font-medium text-gray-900'>Gratis</div>
                                    ) : (
                                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-t border-gray-400 pt-4'>
                                <div className='text-base font-medium text-gray-900'>
                                    Total de la Orden
                                </div>
                                <div className='text-base font-medium text-gray-900'>
                                    {isMounted ? (
                                        formatPrice(cartTotal)
                                    ) : (
                                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <Link href='/#'>
                                <Button className='w-full' size='lg'>Finalizar Compra</Button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Page

'use client'

import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/payload-types"
import { ImageIcon, X } from "lucide-react"
import Image from 'next/image'
import { Category } from "@/payload-types"
import QuantityController from "./QuantityController"
import { useState } from "react"
import {trpc} from '@/trpc/client'


const CartItem = ({product}: {product: Product}) => {

    const {mutate : updateQty} = trpc.auth.updateQty.useMutation({
        onSuccess : () => {
            // console.log('Cantidad actualizada.')
        }
    })

    const { image } = product.images[0]

    const {removeItem, items} = useCart()

    const [category] = product.category as Category[]
    const label = category.name 

   //se maneja el numero de elementos
   const {mutate : updateQty} = trpc.auth.updateQty.useMutation({
    onSuccess : () => {
        console.log('Cantidad actualizada.')
    }
})
    return (
        <div className="space-y-3 py-2">
            <div className="flex items-start justify-between gap-4">

                
                <div className="flex items-center space-x-4">
                    <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                        {typeof image !== "string" && image.url ? (
                            <Image src={image.url} alt={product.name} fill className='absolute object-cover'></Image>
                        ): (
                            <div className="flex h-full items-center justify-center bg-secondary">
                                <ImageIcon
                                aria-hidden='true'
                                className="h-4 w-4 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col self-start">
                        <span className="line-clamp-1 text-sm font-medium mb-1">
                            {product.name}
                        </span>
                        <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                            {label}
                        </span>
                        <div className="mt-4 text-xs text-muted-foreground">
                            {/* Aquí van los botones de incrementar y decrementar */}
                            <QuantityController product={product} updateQty={updateQty} />
                            </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                            <button
                            onClick={
                                () => { 
                                    const item = items.find( (item) => item.product.id === product.id )

                                    if (item){ 
                                        updateQty({ id: product.id.toString(), qty: product.qty + (item?.qty ?? 0) - 1 }); 
                                    }
                                    removeItem(product.id) 
                                }
                            }

                            className="flex items-center gap-0.5 -mt-2">
                                <X className="w-3.5 h-4 text-red-500 hover:text-red-700" /> Remover
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 font-medium">
                    <span className="ml-auto line-clamp-1 text-sm">
                        {formatPrice(product.price)}
                    </span>
                </div>


            </div>
        </div>
    )
}

export default CartItem

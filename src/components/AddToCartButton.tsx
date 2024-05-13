"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"
import { toast } from "sonner"
import {trpc} from '@/trpc/client'


const AddCartButton = ({product}: {product: Product}) => {

    const { addItem, items } = useCart()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {mutate : updateQty} = trpc.auth.updateQty.useMutation({
        onSuccess : () => {
            console.log('Cantidad actualizada.')
        }
    })

    console.log( product.qty, product.id.toString() )

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    return (
        <Button 
            onClick={  () => {

                const in_cart = items.some((item) => item.product.id === product.id)

                if (in_cart){
                    toast.warning('Este producto ya se encuentra en el Carrito.')
                    return
                }
                
                else if (product.qty <= 0){
                    toast.error('No hay unidades disponibles para este producto.')
                    return
                }

                else{
                    //updateQty({ id: product.id.toString(), qty: product.qty - 1});
                    console.log(product.qty)
    
                    addItem(product)
                    setIsSuccess(true)
                    toast.success('Producto añadido al Carrito.')
                }

            }}
            size='lg' 
            className='w-full'>
            {isSuccess ? "¡Añadido!" : "Añadir al carrito"}
        </Button>
    )
}

export default AddCartButton

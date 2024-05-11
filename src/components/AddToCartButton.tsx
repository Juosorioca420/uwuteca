"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"
import { toast } from "sonner"

const AddCartButton = ({product}: {product: Product}) => {

    const { addItem } = useCart()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    return (
        <Button 
            onClick={() => {
                addItem(product)
                setIsSuccess(true)
                toast.success('Producto añadido al carrito.')
            }}
            size='lg' 
            className='w-full'>
            {isSuccess ? "Añadido!" : "Añadir al carrito"}
        </Button>
    )
}

export default AddCartButton

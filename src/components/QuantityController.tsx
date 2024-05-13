// QuantityController.tsx
import React, { FC, useEffect } from 'react';
import { Product } from "@/payload-types"
import {trpc} from '@/trpc/client'
import { useState } from 'react';

import { toast } from "sonner"

interface QuantityControllerProps {
    product: Product;
    updateQty: (args: { id: string; qty: number }) => void;
}

const QuantityController: FC<QuantityControllerProps> = ({ product, updateQty }) => {
    const [quantity, setQuantity] = useState(product.qty);
    const [productQty, setProductQty] = useState(product.qty); // Nuevo estado para la cantidad del producto en la base de datos

    useEffect(() => {
        setQuantity(1);
        setProductQty(product.qty); // Actualiza el estado de la cantidad del producto cuando cambia la prop del producto
    }, [product.qty]);

    const increment = () => {
        if (quantity < product.qty) { // Usa productQty en lugar de product.qty
            setQuantity(prevQuantity => {
                const newQuantity = prevQuantity + 1;
                const newProductQty = productQty - 1; // Decrementa productQty en lugar de product.qty
                updateQty({ id: product.id.toString(), qty: newProductQty });
                setProductQty(newProductQty); // Actualiza el estado de la cantidad del producto
                return newQuantity;
            });
        } else {
            toast.error('No puedes agregar más de este producto.');
        }
    };

    const decrement = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity > 1) {
                const newQuantity = prevQuantity - 1;
                const newProductQty = productQty + 1; // Incrementa productQty en lugar de product.qty
                updateQty({ id: product.id.toString(), qty: newProductQty });
                setProductQty(newProductQty); // Actualiza el estado de la cantidad del producto
                return newQuantity;
            }
            return prevQuantity;
        });
    };
    

    return (
        <div className="mt-4 text-xs text-muted-foreground">
            <button onClick={decrement} style={{ fontSize: '15px', marginRight: '10px' }}>-</button>
            <span style={{ fontSize: '13px', margin: '0 10px' }}>{quantity}</span>
            <button onClick={increment} style={{ fontSize: '15px', marginLeft: '10px' }}>+</button>
        </div>
    );
};

export default QuantityController;

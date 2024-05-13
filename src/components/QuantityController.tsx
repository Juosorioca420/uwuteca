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

    useEffect(() => {
        setQuantity(product.qty);
    }, [product.qty]);

    const increment = () => {
        if (quantity < product.qty) {
            setQuantity(prevQuantity => {
                const newQuantity = prevQuantity + 1;
                updateQty({ id: product.id.toString(), qty: newQuantity});
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
                updateQty({ id: product.id.toString(), qty: newQuantity});
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

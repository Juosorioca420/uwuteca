"use client"
import React, { FC, useState } from 'react';

interface QuantityControllerProps {
    onQuantityChange: (quantity: number) => void;
}

const QuantityController: FC<QuantityControllerProps> = ({ onQuantityChange }) => {
    const [quantity, setQuantity] = useState(1);
    //funcion para incrementar
    const increment = () => {
        setQuantity(quantity + 1);
        onQuantityChange(quantity + 1);
    };
    //para decrementar
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onQuantityChange(quantity - 1);
        }
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

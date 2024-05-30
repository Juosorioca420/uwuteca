"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
    id: string;
    qty: number;
    // Añadir otros atributos según sea necesario
}

interface CartContextType {
    items: Product[];
    addItem: (product: Product) => void;
    qtyAvailable: { [key: string]: number };
    updateQtyAvailable: (id: string, qty: number) => void;
}

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => {},
    qtyAvailable: {},
    updateQtyAvailable: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [qtyAvailable, setQtyAvailable] = useState<{ [key: string]: number }>({});

    const addItem = (product: Product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    const updateQtyAvailable = (id: string, qty: number) => {
        setQtyAvailable(prevQty => ({
            ...prevQty,
            [id]: qty
        }));
    };

    return (
        <CartContext.Provider value={{ items: cartItems, addItem, qtyAvailable, updateQtyAvailable }}>
            {children}
        </CartContext.Provider>
    );
};
export default CartContext
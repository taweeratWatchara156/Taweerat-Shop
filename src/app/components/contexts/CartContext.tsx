"use client";

import { createContext, useContext, useState } from "react";

interface Cart {
    cartLength: number;
    cart: any; // Replace `any` with a specific type if your cart object structure is known
}

interface CartContextType {
    cart: Cart;
    setCart: (cart: Cart) => void;
}

const CartContext = createContext<CartContextType>({
    cart: { cartLength: 0, cart: null },
    setCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart>({ cartLength: 0, cart: null });

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
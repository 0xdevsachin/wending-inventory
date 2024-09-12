import { ICartContextItem } from '@/common/types';
import { createContext, useState, useContext, useEffect, ReactNode, useRef } from 'react';

const CartContext = createContext<{
    cartItems: ICartContextItem[],
    addToCart: (item: ICartContextItem) => void,
    removeFromCart: (id: string, removeAll?: boolean) => void
} | null>(null);


export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("Context must use within its provider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICartContextItem[]>([]);
    const initialRef = useRef(false)

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems') as string);
        if (storedCart) {
            setCartItems(storedCart);
            initialRef.current = true
        } else {
            setCartItems([])
            initialRef.current = true
        }
    }, []);


    const addToCart = (item: ICartContextItem) => {
        let newArray = []
        const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

        if (itemIndex !== -1) {
            const updatedItems = [...cartItems];
            updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                quantity: updatedItems[itemIndex].quantity + 1
            };
            newArray = updatedItems;
        } else {
            newArray = [...cartItems, item];
        }
        localStorage.setItem('cartItems', JSON.stringify(newArray));
        setCartItems(newArray);
    };

    const removeFromCart = (id: string, removeAll?: boolean) => {
        if (removeAll) {
            localStorage.setItem('cartItems', JSON.stringify([]));
            setCartItems([]);
            return;
        }
        const newArray = cartItems.map((item) => {
            if (item._id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null as unknown as ICartContextItem;
                }
            }
            return item;
        }).filter(Boolean);
        localStorage.setItem('cartItems', JSON.stringify(newArray));
        setCartItems(newArray);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

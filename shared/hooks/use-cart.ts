import React from "react";
import { useCartStore } from "../store";
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/get-cart-details';

interface ReturnProps {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (item: CreateCartItemValues) => void;
}

export const useCart = (): ReturnProps => {
    const useStore = useCartStore((state) => state);

    React.useEffect(() => {
        useStore.fetchCartItems();
    }, []);

    return useStore;
}
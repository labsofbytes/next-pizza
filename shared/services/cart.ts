import { Cart } from "@prisma/client";
import { axiosInstance } from "./instance";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>('/cart');

    return data;
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.patch(`/cart/` + id, { quantity });

    return data;
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.delete(`/cart/` + id);

    return data;
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    const { data } = await axiosInstance.post('/cart', values);

    return data;
}
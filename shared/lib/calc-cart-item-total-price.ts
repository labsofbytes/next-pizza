import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsTotalPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsTotalPrice + item.productItem.price) * item.quantity
}
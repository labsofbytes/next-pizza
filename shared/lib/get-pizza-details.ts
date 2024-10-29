import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";


export const getPizzaDetails = (items: ProductItem[], size: PizzaSize, type: PizzaType, ingredients: Ingredient[], selectedIngredients: Set<number>) => {
    const totalPrice = calcTotalPizzaPrice(items, size, type, ingredients, selectedIngredients);
    const textDetails = `${size} sm, ${mapPizzaType[type]} pizza`;

    return {
        totalPrice,
        textDetails
    }
}
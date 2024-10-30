import { Ingredient } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaSize, mapPizzaType, } from '../constants/pizza';


export const getCartItemDetails = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingredients: Ingredient[],
): string => {
    const details = [];

    if (mapPizzaSize && PizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} sm, ${pizzaSize} pizza`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
}
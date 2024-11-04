import { PizzaSize, PizzaType, mapPizzaSize, mapPizzaType, } from '../constants/pizza';
import { CartStateItem } from './get-cart-details';


export const getCartItemDetails = (
    ingredients: CartStateItem['ingredients'],
    pizzaType?: PizzaType,
    pizzaSize?: PizzaSize,
): string => {
    const details = [];

    if (pizzaType && pizzaSize) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} sm, ${pizzaSize} pizza`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
}
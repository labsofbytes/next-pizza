import { ProductItem } from "@prisma/client";
import { pizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType): Variant[] => {
    const filteredPizzaByType = items.filter((item) => item.pizzaType === type);

    const availablePizzaSizes = pizzaSize.map((item) => ({
        text: item.text,
        value: item.value,
        disabled: !filteredPizzaByType.some((pizza) => pizza.size === Number(item.value)),
    }));

    return availablePizzaSizes;
}
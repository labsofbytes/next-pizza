import { useEffect, useState } from "react";

import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface Props {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availablePizzaSizes: Variant[];
    currentItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): Props => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const availablePizzaSizes = getAvailablePizzaSizes(items, type);

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

    useEffect(() => {
        const isAvailable = availablePizzaSizes?.find((item) => item.value === String(size) && !item.disabled);
        const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

        if (!isAvailable && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availablePizzaSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient
    };
}

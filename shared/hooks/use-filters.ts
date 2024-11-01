import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    priceFrom?: PriceProps['priceFrom'];
    priceTo?: PriceProps['priceTo'];
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
    setSizes: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(
        searchParams.get('ingredients')?.split(',')
    ));

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(new Set<string>(searchParams.get('sizes')?.split(',') || []))
    );

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []))
    );

    const [{ priceFrom, priceTo }, setPrises] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrises((prevPrices) => ({ ...prevPrices, [name]: value }));
    };

    return React.useMemo(() => ({
        sizes,
        pizzaTypes,
        selectedIngredients,
        priceFrom,
        priceTo,
        setPrices: updatePrice,
        setSelectedIngredients: toggleIngredients,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes
    }), [sizes, pizzaTypes, selectedIngredients, priceFrom, priceTo]);
}
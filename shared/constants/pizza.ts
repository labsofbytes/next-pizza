export const mapPizzaSize = {
    20: "Small",
    30: "Medium",
    40: "Large"
} as const;

export const mapPizzaType = {
    1: "traditional",
    2: "thin",
} as const;

export const pizzaSize = Object.entries(mapPizzaSize).map(([value, text]) => ({ text, value }));
export const PizzaType = Object.entries(mapPizzaType).map(([value, text]) => ({ text, value }));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
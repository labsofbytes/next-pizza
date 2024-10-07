import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import { useSet } from "react-use";

type IngredientItem = Pick<Ingredient, 'id' | 'name'>

interface ReturnProps {
    ingredients: IngredientItem[];
    isLoading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredient = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<ReturnProps['ingredients']>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedIds, { toggle }] = useSet(new Set<string>([]));

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setIsLoading(true);
                const ingredients = await Api.ingredients.getAll();
                let ingredientsMap = ingredients.map((ingredient) => ({
                    id: ingredient.id,
                    name: ingredient.name
                }));
                setIngredients(ingredientsMap);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchIngredients()

    }, [])

    return { ingredients, isLoading, selectedIds, onAddId: toggle };
}
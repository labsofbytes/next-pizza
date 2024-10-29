import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
type IngredientItem = Pick<Ingredient, 'id' | 'name'>

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);


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

    return { ingredients, isLoading, };
}
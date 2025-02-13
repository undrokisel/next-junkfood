import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useIngredients = () => {
  const [ingredientsLoading, setIngredientsLoading] = useState(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setIngredientsLoading(true);
        const ingredientsRaw = await Api.ingredients.getAll();
        // const ingredientItems = ingredientsRaw.map((item) => {
        //   return {
        //     id: item.id,
        //     name: item.name,

        // text: item.name,
        // value: item.name,

        //   };
        // });
        // setIngredients(ingredientItems);

        setIngredients(ingredientsRaw);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      } finally {
        setIngredientsLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return {
    ingredients,
    ingredientsLoading,
  };
};

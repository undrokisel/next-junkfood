import { Ingredient, ProductVariant } from '@prisma/client';
import { DoughType } from '../constants/shaurma';

/**
 *
 * @param variants - варианты продукта (для шаурмы - размер)
 * @param doughType - тип теста
 * @param ingredients - ингредиенты, доступные к выбору
 * @param selectedIngredients - массив выбранных ингредиентов
 * @returns number - общая стоимость шаурмы в зависимости от типа теста и выбранных ингредиентов
 */

export const calcTotalShaurmaPrice = (
  variants: ProductVariant[],
  doughType: DoughType,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const shaurmaPrice =
    variants.find((item) => item.doughType === doughType)?.price || 0;

  const ingredientsPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, item) => {
      // eslint-disable-next-line no-param-reassign
      acc += item.price;
      return acc;
    }, 0);
  const totalPrice = shaurmaPrice + ingredientsPrice;
  return totalPrice;
};

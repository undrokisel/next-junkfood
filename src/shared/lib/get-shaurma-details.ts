import { Ingredient, ProductVariant } from '@prisma/client';
import { calcTotalShaurmaPrice } from './calc-total-shaurma-price';
import {
  // ShaurmaSize,
  DoughType,
  mapDoughType,
} from '../constants/shaurma';

export const getShaurmaDetails = (
  doughType: DoughType,
  // size: ShaurmaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalShaurmaPrice(
    variants,
    doughType,
    // size,
    ingredients,
    selectedIngredients
  );
  const textDetails = `${mapDoughType[doughType]} тесто`;

  return { totalPrice, textDetails };
};

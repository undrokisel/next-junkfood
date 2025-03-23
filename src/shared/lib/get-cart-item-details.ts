import { ShaurmaSize, DoughType, mapDoughType } from '../constants/shaurma';
import { CartStateItem } from './get-cart-details';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  doughType?: DoughType,
  shaurmaSize?: ShaurmaSize
): string => {
  const details = [];

  if (shaurmaSize && doughType) {
    const typeName = mapDoughType[doughType];
    details.push(`${typeName} тесто`);
  }

  if (ingredients)
    details.push(...ingredients.map((ingredient) => ingredient.name));

  return details.join(', ');
};

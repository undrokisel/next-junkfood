import { ingredients } from './ingredients';

export const shaurmasData = [
  {
    name: 'Шаурма мини',
    imageUrl: 'images/products/mini.png',
    categoryId: 1,
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
  {
    name: 'Шаурма стандарт',
    imageUrl: 'images/products/standart.png',
    categoryId: 1,
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
  {
    name: 'Шаурма богатырь',
    imageUrl: 'images/products/big.png',
    categoryId: 1,
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
];

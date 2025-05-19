import { ingredients } from './ingredients';

export const shaurmasData = [
  {
    name: 'Шаурма мини',
    imageUrl: 'images/products/mini.png',
    categoryId: 1,
    description:
      'Шаурма мини — компактный вариант шаурмы с основными ингредиентами в удобном формате.',
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
  {
    name: 'Шаурма стандарт',
    imageUrl: 'images/products/standart.png',
    categoryId: 1,
    description:
      'Шаурма стандарт — классическая шаурма с мясом, свежими овощами и пикантным соусом в лаваше.',
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
  {
    name: 'Шаурма богатырь',
    imageUrl: 'images/products/big.png',
    categoryId: 1,
    description:
      'Шаурма богатырь — большая порция с мясом, овощами, соусом и лавашом для сытного перекуса.',
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
];

import { prisma } from '../../../prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  doughTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findShaurma = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const doughTypes = params.doughTypes?.split(',').map(Number);
  const ingredientsIdArr = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              doughType: {
                in: doughTypes,
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};

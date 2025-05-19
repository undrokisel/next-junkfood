import { Ingredient, Product, ProductVariant } from '@prisma/client';

export type ProductWithRelations = Product & {
  variants: ProductVariant[];
  ingredients: Ingredient[];
};
export type ProductVariantWithRelations = ProductVariant & {
  product: Product;
};

export type OrderWithRelations = {
  productVariant: ProductVariantWithRelations;
  quantity: number;
  ingredients: Ingredient[];
};

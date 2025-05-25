import {
  ArticleType,
  Ingredient,
  Product,
  ProductVariant,
} from '@prisma/client';

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

export type Paragraph = {
  title: string;
  text: string;
  link?: string;
};
export interface Article {
  id: number;
  slug: string;
  imgSrc: string;
  title: string;
  description: string;
  type: ArticleType;

  createdAt: Date;
  updatedAt: Date;
  readingTime: string | null;
  paragraphs: Paragraph[];
}

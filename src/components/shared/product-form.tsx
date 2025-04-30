'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store';
import { ProductWithRelations } from '../../../@types/prisma';
import { ChooseProductForm } from './choose-product-form';
import { ChooseShaurmaForm } from './choose-shaurma-form';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;

  // product: {
  //   imageUrl: string;
  //   name: string;
  // price: string
  // };
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItem = product.variants[0];
  const isShaurmaForm = Boolean(firstItem.doughType);

  const onSubmit = async (
    productVariantId?: number,
    ingredients?: number[]
  ) => {
    try {
      const itemId = productVariantId ?? firstItem.id;

      await addCartItem({
        productVariantId: itemId,
        ingredients,
      });

      // eslint-disable-next-line
      toast.success('Товар ' + product.name + ' добавлен в корзину');

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      // eslint-disable-next-line
      console.error(err);
    }
  };

  if (isShaurmaForm)
    return (
      <ChooseShaurmaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    );

  return (
    <ChooseProductForm
      productId={product.id}
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};

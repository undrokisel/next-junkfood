'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { DoughType, doughTypes } from '@/shared/constants/shaurma';
import { Ingredient, ProductVariant } from '@prisma/client';
import { getShaurmaDetails } from '@/shared/lib';
import { useShaurmaOptions } from '@/hooks';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientBadge } from './ingredient-badge';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];

  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;

  className?: string;
}

/**
 * Форма выбора ШАУРМЫ
 */
export const ChooseShaurmaForm: React.FC<Props> = ({
  name,
  variants,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    // size,
    type,
    selectedIngredients,
    // availableSizes,
    currentItemId,
    // setSize,
    setType,
    addIngredient,
  } = useShaurmaOptions(variants);

  const { totalPrice, textDetails } = getShaurmaDetails(
    type,
    variants,
    // size,
    ingredients,
    selectedIngredients
  );

  const handleClickAddToCart = () => {
    if (currentItemId) onSubmit(currentItemId, Array.from(selectedIngredients));
  };

  return (
    <div className={cn(className, 'flex flex-1 flex-wrap gap-4')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <Image
          src={`/${imageUrl}`}
          width={350}
          height={350}
          alt={name}
          className='
              object-contain
              relative left-2 top-2 transition-all z-10 duration-300 min-w-[270px] w-[350px] h-[350px]'
        />
      </div>

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title
          text={name}
          // size='md'
          size='lg'
          className='font-extrabold mb-1 flex-grow'
        />

        <p className='text-gray-600'>{textDetails}</p>

        {/* <p className='text-gray-400 mt-8'>Размер</p>
        <GroupVariants
          variants={shaurmaSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as ShaurmaSize)}
        /> */}

        <p className='text-gray-600 mt-2'>Тип теста</p>
        <GroupVariants
          variants={doughTypes}
          value={String(type)}
          onClick={(value) => setType(Number(value) as DoughType)}
        />

        <p className='text-gray-600 mt-2'>Добавить по вкусу</p>

        <div className='bg-gray-50 p-5 rounded-md max-h-[200px] overflow-auto scrollbar scroolbar'>
          <div className='grid grid-cols-3 gap-3 mt-1'>
            {ingredients.map(
              ({
                name: ingredientName,
                imageUrl: ingredientImageUrl,
                price,
                id,
              }) => (
                <IngredientBadge
                  key={id}
                  name={ingredientName}
                  imageUrl={ingredientImageUrl}
                  price={price}
                  onClick={() => addIngredient(id)}
                  active={selectedIngredients.has(id)}
                />
              )
            )}
          </div>
        </div>

        <Button
          onClick={handleClickAddToCart}
          loading={loading}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

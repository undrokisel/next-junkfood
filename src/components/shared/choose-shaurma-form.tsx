'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { DoughType, doughTypes } from '@/shared/constants/shaurma';
import { Ingredient, ProductVariant } from '@prisma/client';
import { getShaurmaDetails } from '@/shared/lib';
import { useShaurmaOptions } from '@/hooks';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientBadge } from './ingredient-badge';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  description: string;
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
  description,
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
    <div className={cn(className, 'flex flex-1 flex-col md:flex-row gap-4')}>
      {/* image */}
      <div
        className={`
          flex flex-1
          items-center justify-center relative 
          w-full flex-[100%] lg:flex-[50%]
          _invisible _sm:visible
        `}
      >
        <Image
          src={arrangeImgUrl(imageUrl)}
          width={300}
          height={300}
          alt={name}
          className='
              object-contain
              relative left-2 top-2 transition-all 
              z-10 duration-300 
              min-w-[270px] 
              py-6
              w-[200px] h-[200px]
              sm:w-[250px] sm:h-[250px]
              md:w-[300px] md:h-[300px]
              lg:w-[350px] lg:h-[350px]
              hover:scale-110
              '
        />
      </div>

      <div
        className={`
        flex flex-col flex-grow _md:flex-grow-0
        w-full lg:w-[490px] _bg-[#f7f6f5] bg-green-50
        p-4 sm:p-7 
        `}
      >
        <Title
          text={name}
          // size='md'
          size='lg'
          className='font-extrabold mb-1 flex-grow'
        />

        <p className='text-gray-600'>{description}</p>
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
          className='bg-green-100 mt-2'
        />

        <p className='text-gray-600 mt-2'>Добавить по вкусу</p>

        {/* мини блок с ингедиентами */}
        <div
          className={`
          _bg-gray-50 bg-green-100 mt-2
          p-2 rounded-md max-h-[200px] overflow-auto scrollbar scroolbar
          `}
        >
          <div
            className={`
            flex flex-wrap
              _grid 
            _grid-cols-1 _sm:grid-cols-2 _md:grid-cols-3
            _grid-cols-3 
            gap-1`}
          >
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
          className={`
            h-[55px] 
            px-1 sm:px-10 
            text-base rounded-[18px] w-full 
            mt-2 md:mt-4 lg:mt-4
            `}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
